/**
 * ユーザー一覧画面
 * FirestoreのusersコレクションをonSnapshotでリアルタイム取得し、全ユーザーを表示する。
 * viewerId（さくら）のカードではフォローボタンを非表示にする。
 * @see doc/input/design/design-context.json UsersPage
 */
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { User } from '../lib/types'
import { UserCard } from '../components/user/UserCard'

/** Firestoreの接続状態を表す型 */
type LoadState = 'loading' | 'ready' | 'error'

/**
 * ユーザー一覧ページコンポーネント
 * Firestoreからユーザーをリアルタイム取得し、loading / empty / error の各状態をハンドリングする
 */
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loadState, setLoadState] = useState<LoadState>('loading')

  useEffect(() => {
    /** usersコレクションをリアルタイム監視し、変更を即座にUIに反映する */
    const unsubscribe = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        const fetchedUsers = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as User[]
        setUsers(fetchedUsers)
        setLoadState('ready')
      },
      (err) => {
        console.error('ユーザー一覧の取得に失敗しました:', err)
        setLoadState('error')
      },
    )

    return unsubscribe
  }, [])

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
          ユーザーの読み込みに失敗しました。Firebase Emulatorが起動しているか確認してください。
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
          {users.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              handle={user.handle}
              isFollowing={false} /* TODO: #8 フォロー状態はfollowsコレクションから取得する */
              avatarColor={user.avatarColor}
            />
          ))}
        </div>
      )}
    </>
  )
}
