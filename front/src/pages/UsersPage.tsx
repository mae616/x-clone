/**
 * ユーザー一覧画面
 * 全ユーザーを表示し、フォロー/アンフォローのトグルが可能。
 * このファイルは静的UI骨格（ロジックなし）。#4でコンポーネント分割する。
 */

/** ダミーユーザーデータ（Sprint 2でFirestore接続に差し替え） */
const DUMMY_USERS = [
  { id: '2', name: 'ひなた', handle: '@hinata', isFollowing: true },
  { id: '3', name: 'そら', handle: '@sora', isFollowing: false },
  { id: '4', name: 'あおい', handle: '@aoi', isFollowing: true },
  { id: '5', name: 'れん', handle: '@ren', isFollowing: false },
  { id: '6', name: 'みお', handle: '@mio', isFollowing: false },
]

export default function UsersPage() {
  return (
    <div className="flex min-h-svh">
      {/* サイドバー */}
      <nav
        role="navigation"
        className="sticky top-0 flex h-svh w-[280px] shrink-0 flex-col border-r border-stone-800 bg-stone-800/50 p-8 backdrop-blur-[16px]"
      >
        <div className="mb-8 text-xl font-bold text-stone-50">ほっとSNS</div>

        <ul className="flex flex-col gap-1">
          <li>
            <a
              href="/"
              className="flex items-center gap-3 rounded-md px-4 py-3 text-base text-stone-400 hover:bg-stone-800"
            >
              <span>🏠</span>
              タイムライン
            </a>
          </li>
          <li>
            <a
              href="/users"
              className="flex items-center gap-3 rounded-md bg-stone-800 px-4 py-3 text-base font-medium text-stone-50"
            >
              <span className="text-sage-300">👥</span>
              ユーザー一覧
            </a>
          </li>
          <li>
            <a
              href="/profile/1"
              className="flex items-center gap-3 rounded-md px-4 py-3 text-base text-stone-400 hover:bg-stone-800"
            >
              <span>👤</span>
              プロフィール
            </a>
          </li>
        </ul>

        <div className="mt-auto flex items-center gap-3 rounded-lg border border-stone-700 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-300 text-sm font-bold text-stone-900">
            さ
          </div>
          <div>
            <div className="text-sm font-medium text-stone-50">さくら</div>
            <div className="text-xs text-stone-400">@sakura</div>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="flex flex-1 flex-col gap-6 p-8">
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 55% 30%, rgba(212,165,116,0.06) 0%, transparent 100%)',
          }}
        />

        <h1 className="relative text-3xl font-bold text-stone-50">
          ユーザー一覧
        </h1>

        {/* ユーザーリスト */}
        <div className="relative flex flex-col gap-3">
          {DUMMY_USERS.map((user) => (
            <article
              key={user.id}
              className="flex items-center gap-4 rounded-lg border border-stone-800 bg-white/5 p-5 shadow-card backdrop-blur-[12px]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-stone-700 text-base font-medium text-stone-50">
                {user.name[0]}
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-semibold text-stone-50">
                  {user.name}
                </span>
                <span className="text-sm text-stone-500">{user.handle}</span>
              </div>
              {/* フォローボタン（viewerId=1の自分は含まれていない） */}
              <button
                type="button"
                className={
                  user.isFollowing
                    ? 'rounded-full border border-sage-300 px-4 py-1.5 text-sm text-sage-300 transition-colors hover:border-danger-300 hover:text-danger-300'
                    : 'rounded-full bg-gradient-to-br from-sage-300 to-sage-500 px-4 py-1.5 text-sm font-semibold text-stone-900 shadow-glow-accent-subtle'
                }
              >
                {user.isFollowing ? 'フォロー中' : 'フォロー'}
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
