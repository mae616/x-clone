/**
 * タイムライン画面
 * フォロー中＋自分の投稿をcreatedAt降順で表示。投稿の作成が可能。
 * onSnapshotでリアルタイム更新し、新規投稿を即時反映する。
 * @see doc/input/design/design-context.json TimelinePage
 */
import { useEffect, useMemo, useState } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { VIEWER_ID } from '../lib/constants'
import type { User, Post } from '../lib/types'
import { formatRelativeTime } from '../lib/utils'
import { Composer } from '../components/post/Composer'
import { PostCard } from '../components/post/PostCard'

export default function TimelinePage() {
  /** 投稿のrawデータ（ユーザー情報未結合） */
  const [rawPosts, setRawPosts] = useState<Post[]>([])
  /** ユーザー情報のマップ（authorId → User） */
  const [usersMap, setUsersMap] = useState<Map<string, User>>(new Map())
  /** データ読み込み中フラグ */
  const [loading, setLoading] = useState(true)
  /** エラーメッセージ */
  const [error, setError] = useState<string | null>(null)

  /** usersコレクション全体をリアルタイム監視してマップ化 */
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        const map = new Map<string, User>()
        snapshot.docs.forEach((doc) => {
          const data = doc.data() as Omit<User, 'id'>
          map.set(doc.id, { ...data, id: doc.id })
        })
        setUsersMap(map)
      },
      (err) => {
        console.error('ユーザー情報の取得に失敗しました:', err)
      },
    )
    return unsubscribe
  }, [])

  /**
   * フォロー中IDを取得し、投稿をリアルタイム購読する
   * フォローリストは初回のみ静的取得（getDocs）。
   * タイムライン表示中のフォロー変更は反映されない（ページ再訪問で更新）。
   */
  useEffect(() => {
    let unsubscribePosts: (() => void) | null = null
    let cancelled = false

    const setup = async () => {
      try {
        // viewerがフォロー中のユーザーIDリストを取得
        const followsSnapshot = await getDocs(
          query(
            collection(db, 'follows'),
            where('followerId', '==', VIEWER_ID),
          ),
        )
        const followingIds = followsSnapshot.docs.map(
          (doc) => doc.data().followeeId as string,
        )

        // フォロー中ID + 自分自身でクエリ対象を構築
        const targetIds = [...new Set([...followingIds, VIEWER_ID])]

        // Firestoreの `in` は最大30要素。超過時は自分の投稿のみにフォールバック
        const queryTargetIds =
          targetIds.length > 30 ? [VIEWER_ID] : targetIds

        const postsQuery = query(
          collection(db, 'posts'),
          where('authorId', 'in', queryTargetIds),
          orderBy('createdAt', 'desc'),
        )

        unsubscribePosts = onSnapshot(
          postsQuery,
          (snapshot) => {
            if (cancelled) return
            const fetchedPosts = snapshot.docs.map((doc) => ({
              ...(doc.data() as Omit<Post, 'id'>),
              id: doc.id,
            })) as Post[]
            setRawPosts(fetchedPosts)
            setLoading(false)
          },
          (err) => {
            console.error('投稿の取得に失敗しました:', err)
            if (!cancelled) {
              setError(
                '投稿の読み込みに失敗しました。再読み込みしてください。',
              )
              setLoading(false)
            }
          },
        )
      } catch (err) {
        console.error('タイムラインの初期化に失敗しました:', err)
        if (!cancelled) {
          setError(
            'タイムラインの読み込みに失敗しました。再読み込みしてください。',
          )
          setLoading(false)
        }
      }
    }

    setup()

    return () => {
      cancelled = true
      unsubscribePosts?.()
    }
  }, [])

  /**
   * rawPostsとusersMapを結合してタイムライン表示用データを生成する
   * usersMap変更時もrawPosts変更時もUIが更新される（再購読ループなし）
   */
  const timelinePosts = useMemo(
    () =>
      rawPosts.map((post) => {
        const user = usersMap.get(post.authorId)
        return {
          id: post.id,
          authorId: post.authorId,
          authorName: user?.name ?? '不明なユーザー',
          handle: user?.handle ?? '@unknown',
          content: post.content,
          timestamp: formatRelativeTime(post.createdAt),
          avatarColor: user?.avatarColor ?? 'bg-stone-700',
        }
      }),
    [rawPosts, usersMap],
  )

  return (
    <>
      <h1 className="text-3xl font-bold text-stone-50">タイムライン</h1>
      <Composer />

      {loading && (
        <p className="py-8 text-center text-stone-400" role="status">
          読み込み中...
        </p>
      )}

      {error && (
        <p className="py-8 text-center text-red-400" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && timelinePosts.length === 0 && (
        <p className="py-8 text-center text-stone-400" role="status">
          まだ投稿がありません。最初の投稿をしてみましょう！
        </p>
      )}

      {!loading && !error && timelinePosts.length > 0 && (
        <div className="flex flex-col gap-3">
          {timelinePosts.map((post) => (
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
      )}
    </>
  )
}
