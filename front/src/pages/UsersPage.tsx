/**
 * ユーザー一覧画面
 * 全ユーザーを表示し、フォロー/アンフォローのトグルが可能。
 * @see doc/input/design/design_context.json UsersPage
 */
import { Sidebar } from '../components/layout/Sidebar'
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
    <div
      className="flex min-h-svh bg-stone-900"
      style={{
        background:
          '#1C1917 radial-gradient(ellipse at 55% 30%, rgba(212,165,116,0.06) 0%, transparent 100%)',
      }}
    >
      <Sidebar activePath="/users" />

      <main className="flex flex-1 flex-col gap-6 overflow-hidden px-12 py-8">
        <h1 className="text-3xl font-bold text-stone-50">ユーザー一覧</h1>
        <div className="flex flex-col gap-3">
          {DUMMY_USERS.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>
      </main>
    </div>
  )
}
