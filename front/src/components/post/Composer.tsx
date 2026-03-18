/**
 * 投稿コンポーザーコンポーネント
 * アバター＋テキスト入力（上段）＋文字数カウント＋投稿ボタン（下段）
 * @see doc/input/design/components.json Composer
 */
import { Button } from '../ui/Button'

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
          aria-label="投稿内容"
          placeholder="いまどうしてる？"
          className="min-h-[60px] flex-1 resize-none bg-transparent text-base leading-relaxed text-stone-50 placeholder:text-stone-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
        />
      </div>
      {/* 下段: charCount + button（右寄せ）, gap 12px */}
      <div className="flex items-center justify-end gap-3">
        <span className="text-xs text-stone-400">0/140</span>
        <Button tone="primary" size="md">
          投稿する
        </Button>
      </div>
    </form>
  )
}
