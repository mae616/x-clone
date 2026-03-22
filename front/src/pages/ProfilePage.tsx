/**
 * プロフィール画面
 * URLパラメータのuserIdに基づき、Firestoreからユーザー情報・投稿・フォロー数を取得して表示する。
 * viewerが自分自身のプロフィールを閲覧中はフォローボタンを非表示にする。
 * @see doc/input/design/design-context.json ProfilePage
 */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { VIEWER_ID } from '../lib/constants'
import type { User, Post } from '../lib/types'
import { formatRelativeTime } from '../lib/utils'
import { ProfileHeader } from '../components/user/ProfileHeader'
import { PostCard } from '../components/post/PostCard'

/** 画面の読み込み状態を表す型 */
type LoadState = 'loading' | 'ready' | 'error'

/**
 * プロフィールページコンポーネント
 * useParamsでuserIdを取得し、Firestoreからユーザー情報・投稿一覧・フォロー数を取得する。
 * フォロートグル機能を提供し、viewerId === userIdの場合はフォローボタンを非表示にする。
 */
export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [followingCount, setFollowingCount] = useState(0)
  const [followersCount, setFollowersCount] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)
  const [loadState, setLoadState] = useState<LoadState>('loading')

  /** 自分自身のプロフィールかどうか */
  const isSelf = userId === VIEWER_ID

  useEffect(() => {
    if (!userId) return

    let cancelled = false

    /**
     * ユーザー情報をFirestoreから取得する
     * ドキュメントが存在しない場合はnullをセットしエラー状態にする
     */
    const fetchUser = async () => {
      const userDoc = await getDoc(doc(db, 'users', userId))
      if (cancelled) return
      if (!userDoc.exists()) {
        setLoadState('error')
        return
      }
      setUser({ ...userDoc.data(), id: userDoc.id } as User)
    }

    /**
     * フォロー数（このユーザーがフォローしている人数）をカウントする
     * followsコレクションでfollowerIdがuserIdのドキュメント数を集計
     */
    const fetchFollowingCount = async () => {
      const q = query(
        collection(db, 'follows'),
        where('followerId', '==', userId),
      )
      const snapshot = await getDocs(q)
      if (!cancelled) setFollowingCount(snapshot.size)
    }

    /**
     * フォロワー数（このユーザーをフォローしている人数）をカウントする
     * followsコレクションでfolloweeIdがuserIdのドキュメント数を集計
     */
    const fetchFollowersCount = async () => {
      const q = query(
        collection(db, 'follows'),
        where('followeeId', '==', userId),
      )
      const snapshot = await getDocs(q)
      if (!cancelled) setFollowersCount(snapshot.size)
    }

    /**
     * viewerがこのユーザーをフォローしているかチェックする
     * followsドキュメント `${VIEWER_ID}_${userId}` の存在で判定
     */
    const fetchIsFollowing = async () => {
      if (isSelf) return
      const followDocId = `${VIEWER_ID}_${userId}`
      const followDoc = await getDoc(doc(db, 'follows', followDocId))
      if (!cancelled) setIsFollowing(followDoc.exists())
    }

    /** すべてのデータを並列取得する */
    const fetchAll = async () => {
      try {
        await Promise.all([
          fetchUser(),
          fetchFollowingCount(),
          fetchFollowersCount(),
          fetchIsFollowing(),
        ])
        if (!cancelled) setLoadState('ready')
      } catch (err) {
        console.error('プロフィール情報の取得に失敗しました:', err)
        if (!cancelled) setLoadState('error')
      }
    }

    fetchAll()

    /** 投稿一覧をリアルタイム監視する（新規投稿を即座に反映するため） */
    const postsQuery = query(
      collection(db, 'posts'),
      where('authorId', '==', userId),
      orderBy('createdAt', 'desc'),
    )
    const unsubPosts = onSnapshot(
      postsQuery,
      (snapshot) => {
        const fetchedPosts = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        })) as Post[]
        setPosts(fetchedPosts)
      },
      (err) => {
        console.error('投稿の取得に失敗しました:', err)
      },
    )

    return () => {
      cancelled = true
      unsubPosts()
    }
  }, [userId, isSelf])

  /**
   * フォロー/アンフォローをトグルする
   * Firestoreへの書き込み後、ローカルstateも即座に更新する
   */
  const handleToggleFollow = async () => {
    if (!userId || isSelf) return

    const followDocId = `${VIEWER_ID}_${userId}`
    const followDocRef = doc(db, 'follows', followDocId)

    try {
      if (isFollowing) {
        await deleteDoc(followDocRef)
        setIsFollowing(false)
        setFollowersCount((prev) => Math.max(0, prev - 1))
      } else {
        await setDoc(followDocRef, {
          followerId: VIEWER_ID,
          followeeId: userId,
          createdAt: serverTimestamp(),
        })
        setIsFollowing(true)
        setFollowersCount((prev) => prev + 1)
      }
    } catch (err) {
      console.error('フォロー状態の更新に失敗しました:', err)
    }
  }

  /* ローディング状態 */
  if (loadState === 'loading') {
    return (
      <p className="text-center text-stone-400" role="status">
        読み込み中...
      </p>
    )
  }

  /* エラー状態 */
  if (loadState === 'error' || !user) {
    return (
      <p className="text-center text-red-400" role="alert">
        プロフィールの読み込みに失敗しました。Firebase
        Emulatorが起動しているか確認してください。
      </p>
    )
  }

  return (
    <>
      <ProfileHeader
        name={user.name}
        handle={user.handle}
        bio={user.bio}
        followingCount={followingCount}
        followersCount={followersCount}
        isFollowing={isFollowing}
        avatarColor={user.avatarColor}
        isSelf={isSelf}
        onToggleFollow={handleToggleFollow}
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-stone-400">投稿</h2>
        {posts.length === 0 && (
          <p className="text-center text-stone-400" role="status">
            まだ投稿がありません。
          </p>
        )}
        {posts.map((post) => (
          <PostCard
            key={post.id}
            authorName={user.name}
            handle={user.handle}
            content={post.content}
            timestamp={formatRelativeTime(post.createdAt)}
            avatarColor={user.avatarColor}
          />
        ))}
      </div>
    </>
  )
}
