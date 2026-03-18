/**
 * ユーザー一覧画面
 * 全ユーザーを表示し、フォロー/アンフォローのトグルが可能。
 * @see doc/input/design/design-context.json UsersPage
 */
import { UserCard } from '../components/user/UserCard'

/** ダミーユーザーデータ（Sprint 2でFirestore接続に差し替え） */
const DUMMY_USERS = [
  { id: '1', name: 'さくら', handle: '@sakura', isFollowing: true, avatarColor: 'bg-honey-muted' },
  { id: '2', name: 'はると', handle: '@haruto', isFollowing: false, avatarColor: 'bg-sage-muted' },
  { id: '3', name: 'ゆき', handle: '@yuki', isFollowing: true, avatarColor: 'bg-danger-muted' },
  { id: '4', name: 'りく', handle: '@riku', isFollowing: false, avatarColor: 'bg-honey-muted' },
  { id: '5', name: 'あおい', handle: '@aoi', isFollowing: false, avatarColor: 'bg-blue-muted' },
]

export default function UsersPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-stone-50">ユーザー一覧</h1>
      <div className="flex flex-col gap-3">
        {DUMMY_USERS.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
    </>
  )
}
