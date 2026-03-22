/**
 * ユーザー一覧画面
 * FirestoreのusersコレクションとfollowsコレクションをonSnapshotでリアルタイム取得し、
 * 全ユーザーのフォロー状態付きで表示する。
 * viewerId（さくら）のカードではフォローボタンを非表示にする。
 * @see doc/input/design/design-context.json UsersPage
 */
import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { VIEWER_ID } from '../lib/constants'
import type { User } from '../lib/types'
import { UserCard } from '../components/user/UserCard'

/** Firestoreの接続状態を表す型 */
type LoadState = 'loading' | 'ready' | 'error'

/**
 * ユーザー一覧ページコンポーネント
 * Firestoreからユーザーとフォロー状態をリアルタイム取得し、
 * loading / empty / error の各状態をハンドリングする
 */
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loadState, setLoadState] = useState<LoadState>('loading')
  /** viewerがフォロー中のユーザーIDセット（onSnapshotで自動同期） */
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    /** usersコレクションをリアルタイム監視し、変更を即座にUIに反映する */
    const unsubUsers = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        const fetchedUsers = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        })) as User[]
        setUsers(fetchedUsers)
        setLoadState('ready')
      },
      (err) => {
        console.error('ユーザー一覧の取得に失敗しました:', err)
        setLoadState('error')
      },
    )

    /** followsコレクションからviewerのフォロー一覧をリアルタイム監視する */
    const followsQuery = query(
      collection(db, 'follows'),
      where('followerId', '==', VIEWER_ID),
    )
    const unsubFollows = onSnapshot(
      followsQuery,
      (snapshot) => {
        const ids = new Set<string>()
        snapshot.docs.forEach((d) => {
          const data = d.data()
          ids.add(data.followeeId as string)
        })
        setFollowingIds(ids)
      },
      (err) => {
        console.error('フォロー状態の取得に失敗しました:', err)
      },
    )

    return () => {
      unsubUsers()
      unsubFollows()
    }
  }, [])

  /**
   * フォロー/アンフォローをトグルする
   * onSnapshotがFirestoreの変更を検知してUIを自動更新するため、明示的な楽観的更新は不要
   * @param userId - 対象ユーザーID
   * @param isCurrentlyFollowing - 現在フォロー中かどうか
   */
  const handleToggleFollow = async (
    userId: string,
    isCurrentlyFollowing: boolean,
  ) => {
    const docId = `${VIEWER_ID}_${userId}`
    const docRef = doc(db, 'follows', docId)

    if (isCurrentlyFollowing) {
      await deleteDoc(docRef)
    } else {
      await setDoc(docRef, {
        followerId: VIEWER_ID,
        followeeId: userId,
        createdAt: serverTimestamp(),
      })
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-stone-50">ユーザー一覧</h1>

      {/* ローディング状態 */}
      {loadState === 'loading' && (
        <p className="text-center text-stone-400" role="status">
          読み込み中...
        </p>
      )}

      {/* エラー状態 */}
      {loadState === 'error' && (
        <p className="text-center text-red-400" role="alert">
          ユーザーの読み込みに失敗しました。Firebase
          Emulatorが起動しているか確認してください。
        </p>
      )}

      {/* データ取得済み・空の場合 */}
      {loadState === 'ready' && users.length === 0 && (
        <p className="text-center text-stone-400" role="status">
          ユーザーが見つかりませんでした。
        </p>
      )}

      {/* ユーザー一覧 */}
      {loadState === 'ready' && users.length > 0 && (
        <div className="flex flex-col gap-3">
          {users.map((user) => {
            const isFollowing = followingIds.has(user.id)
            return (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                handle={user.handle}
                isFollowing={isFollowing}
                avatarColor={user.avatarColor}
                onToggleFollow={(uid) => handleToggleFollow(uid, isFollowing)}
              />
            )
          })}
        </div>
      )}
    </>
  )
}
