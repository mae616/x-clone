/**
 * タイムライン画面
 * フォロー中＋自分の投稿をcreatedAt降順で表示。投稿の作成が可能。
 * 静的UI骨格（ロジックなし）。#4でコンポーネント分割する。
 * @see doc/input/design/design_context.json TimelinePage
 */
import { Leaf, Newspaper, Users, User } from 'lucide-react'

/** ダミー投稿データ（Sprint 2でFirestore接続に差し替え） */
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
    authorName: 'はると',
    handle: '@haruto',
    content:
      '近所のカフェで見つけた新しいブレンド、すごく美味しかった。明日も行こうかな。',
    timestamp: '4時間前',
    avatarColor: 'bg-sage-muted',
  },
  {
    id: '3',
    authorName: 'ゆき',
    handle: '@yuki',
    content:
      '読みかけの本をやっと読み終えた。静かな夜に読書するのが最高の贅沢。',
    timestamp: '6時間前',
    avatarColor: 'bg-danger-muted',
  },
]

export default function TimelinePage() {
  return (
    <div
      className="flex min-h-svh bg-stone-900"
      style={{
        background:
          '#1C1917 radial-gradient(ellipse at 55% 30%, rgba(212,165,116,0.06) 0%, transparent 100%)',
      }}
    >
      {/* サイドバー: glass.sidebar + gradient overlay + backdrop-blur 16px */}
      <nav
        role="navigation"
        className="sticky top-0 flex h-svh w-[280px] shrink-0 flex-col border-r border-glass-border backdrop-blur-[16px]"
        style={{
          background:
            '#FFFFFF08 linear-gradient(180deg, rgba(212,165,116,0.03) 0%, #1C1917 100%)',
        }}
      >
        <div className="flex flex-1 flex-col px-6 py-8">
          {/* ロゴ: lucide leaf + テキスト */}
          <div className="flex items-center gap-3 pb-6">
            <Leaf className="h-7 w-7 text-sage-300" />
            <span className="text-xl font-bold text-stone-50">ほっとSNS</span>
          </div>

          {/* ナビゲーション: gap 4px, cornerRadius 12px, padding 12px 16px */}
          <ul className="flex flex-col gap-1">
            <li>
              <a
                href="/"
                className="flex items-center gap-3 rounded-md bg-nav-active px-4 py-3 text-base font-semibold text-stone-50"
              >
                <Newspaper className="h-5 w-5 text-sage-300" />
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
                className="flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium text-stone-400"
              >
                <User className="h-5 w-5 text-stone-400" />
                プロフィール
              </a>
            </li>
          </ul>

          {/* スペーサー */}
          <div className="flex-1" />

          {/* 現在のユーザー: border-top #2E2A25, gap 12px */}
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

      {/* メインコンテンツ: padding 32px 48px, gap 24px, clip */}
      <main className="flex flex-1 flex-col gap-6 overflow-hidden px-12 py-8">
        <h1 className="text-3xl font-bold text-stone-50">タイムライン</h1>

        {/* コンポーザー: vertical, gap 16px, padding 20px, cornerRadius 16px */}
        <form
          role="form"
          aria-label="投稿を作成"
          className="flex flex-col gap-4 rounded-lg border border-glass-border bg-glass-card p-5 backdrop-blur-[12px]"
        >
          {/* 上段: avatar + input */}
          <div className="flex gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-sage-muted" />
            <textarea
              placeholder="いまどうしてる？"
              className="min-h-[60px] flex-1 resize-none bg-transparent text-base leading-relaxed text-stone-50 placeholder:text-stone-500 focus:outline-none"
            />
          </div>
          {/* 下段: charCount + button（右寄せ） */}
          <div className="flex items-center justify-end gap-3">
            <span className="text-xs text-stone-500">0/140</span>
            <button
              type="button"
              className="rounded-full px-6 py-2.5 text-md font-semibold text-stone-900 shadow-glow-accent"
              style={{
                background: 'linear-gradient(135deg, #8BAA7F 0%, #A8D4A0 100%)',
              }}
            >
              投稿する
            </button>
          </div>
        </form>

        {/* 投稿フィード: gap 12px */}
        <div className="flex flex-col gap-3">
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
