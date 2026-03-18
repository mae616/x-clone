/**
 * 投稿コンポーザーコンポーネント
 * アバター＋テキスト入力（上段）＋文字数カウント＋投稿ボタン（下段）
 * @see doc/input/design/components.json Composer
 */

export function Composer() {
  return (
    <form
      role="form"
      aria-label="投稿を作成"
      className="flex flex-col gap-4 rounded-lg border border-glass-border bg-glass-card p-5 backdrop-blur-[12px]"
    >
      {/* 上段: avatar + input, gap 12px */}
      <div className="flex gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-sage-muted" />
        <textarea
          placeholder="いまどうしてる？"
          className="min-h-[60px] flex-1 resize-none bg-transparent text-base leading-relaxed text-stone-50 placeholder:text-stone-500 focus:outline-none"
        />
      </div>
      {/* 下段: charCount + button（右寄せ）, gap 12px */}
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
  )
}
