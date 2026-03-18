/**
 * プロフィール画面
 * ユーザー情報＋フォロー数/フォロワー数＋投稿一覧を表示。
 * 静的UI骨格（ロジックなし）。#4でコンポーネント分割する。
 * @see doc/input/design/design_context.json ProfilePage
 */
import { Leaf, Newspaper, Users, User } from 'lucide-react'

/** ダミープロフィールデータ（Sprint 2でFirestore接続に差し替え） */
const DUMMY_PROFILE = {
  name: 'さくら',
  handle: '@sakura',
  bio: 'お茶と読書が好き。静かな夜のひとときを大切にしています。',
  followingCount: 12,
  followersCount: 8,
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
      {/* サイドバー */}
      <nav
        role="navigation"
        className="sticky top-0 flex h-svh w-[280px] shrink-0 flex-col border-r border-glass-border backdrop-blur-[16px]"
        style={{
          background:
            '#FFFFFF08 linear-gradient(180deg, rgba(212,165,116,0.03) 0%, #1C1917 100%)',
        }}
      >
        <div className="flex flex-1 flex-col px-6 py-8">
          <div className="flex items-center gap-3 pb-6">
            <Leaf className="h-7 w-7 text-sage-300" />
            <span className="text-xl font-bold text-stone-50">ほっとSNS</span>
          </div>

          <ul className="flex flex-col gap-1">
            <li>
              <a
                href="/"
                className="flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium text-stone-400"
              >
                <Newspaper className="h-5 w-5 text-stone-400" />
                タイムライン
              </a>
            </li>
            <li>
              <a
                href="/users"
                className="flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium text-stone-400"
              >
                <Users className="h-5 w-5 text-stone-400" />
                ユーザー一覧
              </a>
            </li>
            <li>
              <a
                href="/profile/1"
                className="flex items-center gap-3 rounded-md bg-nav-active px-4 py-3 text-base font-semibold text-stone-50"
              >
                <User className="h-5 w-5 text-sage-300" />
                プロフィール
              </a>
            </li>
          </ul>

          <div className="flex-1" />

          <div className="flex items-center gap-3 border-t border-border-subtle pt-4">
            <div className="h-10 w-10 rounded-full bg-sage-muted" />
            <div className="flex flex-col gap-0.5">
              <span className="text-md font-semibold text-stone-50">
                さくら
              </span>
              <span className="text-xs text-stone-500">@sakura</span>
            </div>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ: padding 32px 48px, gap 24px */}
      <main className="flex flex-1 flex-col gap-6 overflow-hidden px-12 py-8">
        {/* プロフィールヘッダー: padding 24px 24px 20px 24px, gap 16px */}
        <header
          role="banner"
          className="flex flex-col gap-4 rounded-lg border border-glass-border bg-glass-card pb-5 pl-6 pr-6 pt-6 backdrop-blur-[12px]"
        >
          {/* 上段: avatar + info + followButton */}
          <div className="flex items-center gap-4">
            <div
              className={`h-16 w-16 shrink-0 rounded-full ${DUMMY_PROFILE.avatarColor}`}
            />
            <div className="flex flex-1 flex-col gap-0.5">
              <h1 className="text-xl font-bold text-stone-50">
                {DUMMY_PROFILE.name}
              </h1>
              <span className="text-sm text-stone-500">
                {DUMMY_PROFILE.handle}
              </span>
            </div>
            {/* フォローボタン: outline, gradient stroke */}
            <button
              type="button"
              className="rounded-full px-6 py-2.5 text-md font-semibold text-sage-300 shadow-glow-accent-subtle"
              style={{
                border: '1px solid transparent',
                backgroundImage:
                  'linear-gradient(#1C1917, #1C1917), linear-gradient(135deg, #8BAA7F 0%, #A8D4A0 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              フォロー中
            </button>
          </div>

          {/* bio */}
          <p className="text-md leading-relaxed text-stone-400">
            {DUMMY_PROFILE.bio}
          </p>

          {/* フォロー数/フォロワー数: border-top #2E2A25, gap 32px */}
          <div className="flex gap-8 border-t border-border-subtle pt-3">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-stone-50">
                {DUMMY_PROFILE.followingCount}
              </span>
              <span className="text-md text-stone-400">フォロー中</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-stone-50">
                {DUMMY_PROFILE.followersCount}
              </span>
              <span className="text-md text-stone-400">フォロワー</span>
            </div>
          </div>
        </header>

        {/* 投稿セクション: gap 12px */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-stone-400">投稿</h2>
          {DUMMY_POSTS.map((post) => (
            <article
              key={post.id}
              className="flex gap-3 rounded-lg border border-glass-border bg-glass-card p-5 backdrop-blur-[12px]"
            >
              <div
                className={`h-10 w-10 shrink-0 rounded-full ${post.avatarColor}`}
              />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-stone-50">
                    {post.authorName}
                  </span>
                  <span className="text-sm text-stone-500">{post.handle}</span>
                  <span className="text-sm text-stone-500">
                    · {post.timestamp}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-stone-50">
                  {post.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
