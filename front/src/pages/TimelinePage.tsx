/**
 * タイムライン画面
 * フォロー中＋自分の投稿をcreatedAt降順でリアルタイム表示。投稿の作成が可能。
 * onSnapshotによるリアルタイム更新で、投稿後即時反映される。
 * @see doc/input/design/design-context.json TimelinePage
 */
import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { VIEWER_ID } from '../lib/constants'
import type { User, Post } from '../lib/types'
import { formatRelativeTime } from '../lib/utils'
import { Composer } from '../components/post/Composer'
import { PostCard } from '../components/post/PostCard'

/** PostCardに渡すための表示用投稿データ */
interface TimelinePost {
  /** ドキュメントID */
  id: string
  /** 著者のユーザーID */
  authorId: string
  /** 著者名 */
  authorName: string
  /** ハンドル（@xxx） */
  handle: string
  /** 投稿内容 */
  content: string
  /** 相対時刻文字列 */
  timestamp: string
  /** アバター背景色のTailwindクラス */
  avatarColor: string
}

export default function TimelinePage() {
  /** タイムラインに表示する投稿一覧 */
  const [posts, setPosts] = useState<TimelinePost[]>([])
  /** データ読み込み中フラグ */
  const [loading, setLoading] = useState(true)
  /** エラーメッセージ */
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let unsubscribePosts: (() => void) | null = null

    /**
     * タイムラインデータを初期化する
     * 1. followsコレクションからフォロー中ユーザーIDを取得
     * 2. フォロー中ID + 自分のIDで投稿をクエリ
     * 3. onSnapshotでリアルタイム更新を購読
     */
    const initTimeline = async () => {
      try {
        // フォロー中ユーザーIDを取得
        const followsQuery = query(
          collection(db, 'follows'),
          where('followerId', '==', VIEWER_ID),
        )
        const followsSnapshot = await getDocs(followsQuery)
        const followingIds = followsSnapshot.docs.map(
          (doc) => doc.data().followeeId as string,
        )

        // フォロー中ID + 自分のIDでクエリ対象を構築
        // Firestoreの `in` クエリは最大30件制限あり（5人程度なら問題なし）
        const targetIds = [...new Set([...followingIds, VIEWER_ID])]

        // ユーザー情報を事前にキャッシュ（投稿にauthorName等を結合するため）
        const usersMap = new Map<string, User>()
        await Promise.all(
          targetIds.map(async (userId) => {
            const userDoc = await getDoc(doc(db, 'users', userId))
            if (userDoc.exists()) {
              usersMap.set(userId, { id: userDoc.id, ...userDoc.data() } as User)
            }
          }),
        )

        // onSnapshotでリアルタイム更新を購読
        const postsQuery = query(
          collection(db, 'posts'),
          where('authorId', 'in', targetIds),
          orderBy('createdAt', 'desc'),
        )

        unsubscribePosts = onSnapshot(
          postsQuery,
          (snapshot) => {
            const timelinePosts: TimelinePost[] = snapshot.docs
              .map((docSnap) => {
                const data = docSnap.data() as Omit<Post, 'id'>
                const author = usersMap.get(data.authorId)

                // createdAtがnull（serverTimestamp未解決）の場合はスキップ
                if (!data.createdAt) return null

                return {
                  id: docSnap.id,
                  authorId: data.authorId,
                  authorName: author?.name ?? '不明なユーザー',
                  handle: author?.handle ?? '@unknown',
                  content: data.content,
                  timestamp: formatRelativeTime(data.createdAt),
                  avatarColor: author?.avatarColor ?? 'bg-stone-700',
                }
              })
              .filter((post): post is TimelinePost => post !== null)

            setPosts(timelinePosts)
            setLoading(false)
          },
          (err) => {
            console.error('タイムラインの取得に失敗しました:', err)
            setError('タイムラインの読み込みに失敗しました。再読み込みしてください。')
            setLoading(false)
          },
        )
      } catch (err) {
        console.error('タイムラインの初期化に失敗しました:', err)
        setError('タイムラインの読み込みに失敗しました。再読み込みしてください。')
        setLoading(false)
      }
    }

    initTimeline()

    // クリーンアップ: onSnapshotの購読を解除
    return () => {
      if (unsubscribePosts) {
        unsubscribePosts()
      }
    }
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold text-stone-50">タイムライン</h1>
      <Composer />
      <div className="flex flex-col gap-3">
        {loading && (
          <p className="text-center text-stone-400">読み込み中...</p>
        )}
        {error && (
          <p className="text-center text-red-400">{error}</p>
        )}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-stone-400">
            まだ投稿がありません。最初の投稿をしてみましょう！
          </p>
        )}
        {posts.map((post) => (
          <PostCard
            key={post.id}
            authorId={post.authorId}
            authorName={post.authorName}
            handle={post.handle}
            content={post.content}
            timestamp={post.timestamp}
            avatarColor={post.avatarColor}
          />
        ))}
      </div>
    </>
  )
}
