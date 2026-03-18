/**
 * ユーザー一覧画面
 * 全ユーザーを表示し、フォロー/アンフォローのトグルが可能。
 * 静的UI骨格（ロジックなし）。#4でコンポーネント分割する。
 * @see doc/input/design/design_context.json UsersPage
 */
import { Leaf, Newspaper, Users, User } from 'lucide-react'

/** ダミーユーザーデータ（Sprint 2でFirestore接続に差し替え） */
const DUMMY_USERS = [
  {
    id: '1',
    name: 'さくら',
    handle: '@sakura',
    isFollowing: true,
    avatarColor: 'bg-honey-muted',
  },
  {
    id: '2',
    name: 'はると',
    handle: '@haruto',
    isFollowing: false,
    avatarColor: 'bg-sage-muted',
  },
  {
    id: '3',
    name: 'ゆき',
    handle: '@yuki',
    isFollowing: true,
    avatarColor: 'bg-danger-muted',
  },
  {
    id: '4',
    name: 'りく',
    handle: '@riku',
    isFollowing: false,
    avatarColor: 'bg-honey-muted',
  },
  {
    id: '5',
    name: 'あおい',
    handle: '@aoi',
    isFollowing: false,
    avatarColor: 'bg-blue-muted',
  },
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
                className="flex items-center gap-3 rounded-md bg-nav-active px-4 py-3 text-base font-semibold text-stone-50"
              >
                <Users className="h-5 w-5 text-sage-300" />
                ユーザー一覧
              </a>
            </li>
            <li>
              <a
                href="/profile/1"
                className="flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium text-stone-400"
              >
                <User className="h-5 w-5 text-stone-400" />
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
        <h1 className="text-3xl font-bold text-stone-50">ユーザー一覧</h1>

        {/* ユーザーリスト: gap 12px */}
        <div className="flex flex-col gap-3">
          {DUMMY_USERS.map((user) => (
            <article
              key={user.id}
              className="flex items-center gap-4 rounded-lg border border-glass-border bg-glass-card p-5 backdrop-blur-[12px]"
            >
              {/* アバター: 48px ellipse */}
              <div
                className={`h-12 w-12 shrink-0 rounded-full ${user.avatarColor}`}
              />
              {/* ユーザー情報: gap 4px */}
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-base font-semibold text-stone-50">
                  {user.name}
                </span>
                <span className="text-sm text-stone-500">{user.handle}</span>
              </div>
              {/* フォローボタン: outline=gradient stroke, primary=gradient fill */}
              {user.isFollowing ? (
                <button
                  type="button"
                  className="rounded-full bg-transparent px-5 py-2 text-sm font-semibold text-sage-300 shadow-glow-accent-subtle"
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
              ) : (
                <button
                  type="button"
                  className="rounded-full px-5 py-2 text-sm font-semibold text-stone-900 shadow-glow-accent"
                  style={{
                    background:
                      'linear-gradient(135deg, #8BAA7F 0%, #A8D4A0 100%)',
                  }}
                >
                  フォロー
                </button>
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
