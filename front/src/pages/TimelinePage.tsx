/**
 * タイムライン画面
 * フォロー中＋自分の投稿をcreatedAt降順で表示。投稿の作成が可能。
 * このファイルは静的UI骨格（ロジックなし）。#4でコンポーネント分割する。
 */

/** ダミー投稿データ（Sprint 2でFirestore接続に差し替え） */
const DUMMY_POSTS = [
  {
    id: '1',
    authorName: 'ひなた',
    handle: '@hinata',
    content: '今日は早めに帰れたので、お気に入りのカフェでゆっくり読書中。窓の外の雨音が心地いい。',
    timestamp: '2時間前',
  },
  {
    id: '2',
    authorName: 'さくら',
    handle: '@sakura',
    content: '新しいお茶を見つけました。ほうじ茶ラテ、寒い夜にぴったり。',
    timestamp: '4時間前',
  },
  {
    id: '3',
    authorName: 'そら',
    handle: '@sora',
    content: '夕焼けがきれいだったので思わず立ち止まってしまった。こういう瞬間を大切にしたい。',
    timestamp: '6時間前',
  },
]

export default function TimelinePage() {
  return (
    <div className="flex min-h-svh">
      {/* サイドバー */}
      <nav
        role="navigation"
        className="sticky top-0 flex h-svh w-[280px] shrink-0 flex-col border-r border-stone-800 bg-stone-800/50 p-8 backdrop-blur-[16px]"
      >
        {/* ロゴ */}
        <div className="mb-8 text-xl font-bold text-stone-50">ほっとSNS</div>

        {/* ナビゲーション */}
        <ul className="flex flex-col gap-1">
          <li>
            <a
              href="/"
              className="flex items-center gap-3 rounded-md bg-stone-800 px-4 py-3 text-base font-medium text-stone-50"
            >
              <span className="text-sage-300">🏠</span>
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
              className="flex items-center gap-3 rounded-md px-4 py-3 text-base text-stone-400 hover:bg-stone-800"
            >
              <span>👤</span>
              プロフィール
            </a>
          </li>
        </ul>

        {/* 現在のユーザー */}
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
        {/* ページ背景のウォームグロー */}
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 55% 30%, rgba(212,165,116,0.06) 0%, transparent 100%)',
          }}
        />

        <h1 className="relative text-3xl font-bold text-stone-50">
          タイムライン
        </h1>

        {/* コンポーザー */}
        <form
          role="form"
          aria-label="投稿を作成"
          className="relative flex gap-4 rounded-lg border border-stone-800 bg-white/5 p-5 shadow-card backdrop-blur-[12px]"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-300 text-sm font-bold text-stone-900">
            さ
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <textarea
              placeholder="いまどうしてる？"
              className="min-h-[80px] resize-none bg-transparent text-base text-stone-50 placeholder:text-stone-500 focus:outline-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500">0/140</span>
              <button
                type="button"
                className="rounded-full bg-gradient-to-br from-sage-300 to-sage-500 px-5 py-2 text-sm font-semibold text-stone-900 shadow-glow-accent transition-shadow hover:shadow-glow-accent"
              >
                投稿する
              </button>
            </div>
          </div>
        </form>

        {/* 投稿フィード */}
        <div className="relative flex flex-col gap-3">
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
