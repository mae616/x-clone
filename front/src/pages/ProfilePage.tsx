/**
 * プロフィール画面
 * ユーザー情報＋フォロー数/フォロワー数＋投稿一覧を表示。
 * このファイルは静的UI骨格（ロジックなし）。#4でコンポーネント分割する。
 */

/** ダミープロフィールデータ（Sprint 2でFirestore接続に差し替え） */
const DUMMY_PROFILE = {
  id: '2',
  name: 'ひなた',
  handle: '@hinata',
  bio: 'カフェ巡りと写真が好き。日々の小さな幸せを見つけるのが得意。',
  followingCount: 12,
  followersCount: 8,
  isFollowing: true,
}

const DUMMY_POSTS = [
  {
    id: '1',
    authorName: 'ひなた',
    handle: '@hinata',
    content: '今日は早めに帰れたので、お気に入りのカフェでゆっくり読書中。窓の外の雨音が心地いい。',
    timestamp: '2時間前',
  },
  {
    id: '4',
    authorName: 'ひなた',
    handle: '@hinata',
    content: '朝の散歩で見つけた花がとてもきれいだった。春はもうすぐそこ。',
    timestamp: '1日前',
  },
]

export default function ProfilePage() {
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
              className="flex items-center gap-3 rounded-md px-4 py-3 text-base text-stone-400 hover:bg-stone-800"
            >
              <span>👥</span>
              ユーザー一覧
            </a>
          </li>
          <li>
            <a
              href="/profile/1"
              className="flex items-center gap-3 rounded-md bg-stone-800 px-4 py-3 text-base font-medium text-stone-50"
            >
              <span className="text-sage-300">👤</span>
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

        {/* プロフィールヘッダー */}
        <header
          role="banner"
          className="relative flex flex-col gap-5 rounded-lg border border-stone-800 bg-white/5 p-6 shadow-card backdrop-blur-[12px]"
        >
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-stone-700 text-xl font-bold text-stone-50">
              {DUMMY_PROFILE.name[0]}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <h1 className="text-2xl font-bold text-stone-50">
                {DUMMY_PROFILE.name}
              </h1>
              <span className="text-sm text-stone-500">
                {DUMMY_PROFILE.handle}
              </span>
              <p className="mt-2 text-base leading-relaxed text-stone-400">
                {DUMMY_PROFILE.bio}
              </p>
            </div>
            <button
              type="button"
              className="rounded-full border border-sage-300 px-4 py-1.5 text-sm text-sage-300 transition-colors hover:border-danger-300 hover:text-danger-300"
            >
              フォロー中
            </button>
          </div>

          {/* フォロー数/フォロワー数 */}
          <div className="flex gap-6">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-stone-50">
                {DUMMY_PROFILE.followingCount}
              </span>
              <span className="text-sm text-stone-500">フォロー中</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-stone-50">
                {DUMMY_PROFILE.followersCount}
              </span>
              <span className="text-sm text-stone-500">フォロワー</span>
            </div>
          </div>
        </header>

        {/* 投稿セクション */}
        <div className="relative flex flex-col gap-3">
          <h2 className="text-lg text-stone-400">投稿</h2>
          {DUMMY_POSTS.map((post) => (
            <article
              key={post.id}
              className="flex gap-3 rounded-lg border border-stone-800 bg-white/5 p-5 shadow-card backdrop-blur-[12px]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-700 text-sm font-medium text-stone-50">
                {post.authorName[0]}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-stone-50">
                    {post.authorName}
                  </span>
                  <span className="text-sm text-stone-500">{post.handle}</span>
                  <span className="text-xs text-stone-500">
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
