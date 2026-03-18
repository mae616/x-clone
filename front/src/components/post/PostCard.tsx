/**
 * 投稿カードコンポーネント
 * アバター（ellipse）＋投稿本文（ヘッダー＋コンテンツ）を横並び
 * @see doc/input/design/components.json PostCard
 */

export interface PostCardProps {
  /** 著者名 */
  authorName: string
  /** ハンドル（@xxx） */
  handle: string
  /** 投稿内容 */
  content: string
  /** タイムスタンプ表示 */
  timestamp: string
  /** アバター背景色のTailwindクラス */
  avatarColor?: string
}

export function PostCard({
  authorName,
  handle,
  content,
  timestamp,
  avatarColor = 'bg-stone-700',
}: PostCardProps) {
  return (
    <article className="flex gap-3 rounded-lg border border-glass-border bg-glass-card p-5 backdrop-blur-[12px]">
      <div
        className={`h-10 w-10 shrink-0 rounded-full ${avatarColor}`}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-stone-50">
            {authorName}
          </span>
          <span className="text-sm text-stone-400">{handle}</span>
          <span className="text-sm text-stone-400">· {timestamp}</span>
        </div>
        <p className="text-base leading-relaxed text-stone-50">{content}</p>
      </div>
    </article>
  )
}
