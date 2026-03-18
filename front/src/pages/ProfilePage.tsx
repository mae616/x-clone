/**
 * プロフィール画面
 * ユーザー情報＋フォロー数/フォロワー数＋投稿一覧を表示。
 * @see doc/input/design/design_context.json ProfilePage
 */
import { Sidebar } from '../components/layout/Sidebar'
import { ProfileHeader } from '../components/user/ProfileHeader'
import { PostCard } from '../components/post/PostCard'

/** ダミープロフィールデータ（Sprint 2でFirestore接続に差し替え） */
const DUMMY_PROFILE = {
  name: 'さくら',
  handle: '@sakura',
  bio: 'お茶と読書が好き。静かな夜のひとときを大切にしています。',
  followingCount: 12,
  followersCount: 8,
  isFollowing: true,
  avatarColor: 'bg-honey-muted',
}

const DUMMY_POSTS = [
  {
    id: '1',
    authorName: 'さくら',
    handle: '@sakura',
    content:
      '今日も一日お疲れさまでした。夜風が気持ちいい季節になりましたね。窓を開けて深呼吸すると、少しだけ心が軽くなる気がします。',
    timestamp: '2時間前',
    avatarColor: 'bg-honey-muted',
  },
  {
    id: '2',
    authorName: 'さくら',
    handle: '@sakura',
    content:
      '雨上がりの空がきれいだった。虹は見えなかったけど、雲の隙間から差す光がとても穏やかで。',
    timestamp: '1日前',
    avatarColor: 'bg-honey-muted',
  },
]

export default function ProfilePage() {
  return (
    <div
      className="flex min-h-svh bg-stone-900"
      style={{
        background:
          '#1C1917 radial-gradient(ellipse at 55% 30%, rgba(212,165,116,0.06) 0%, transparent 100%)',
      }}
    >
      <Sidebar activePath="/profile/1" />

      <main className="flex flex-1 flex-col gap-6 overflow-hidden px-12 py-8">
        <ProfileHeader {...DUMMY_PROFILE} />
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-stone-400">投稿</h2>
          {DUMMY_POSTS.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  )
}
