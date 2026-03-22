/**
 * 投稿カードコンポーネント
 * アバター（ellipse）＋投稿本文（ヘッダー＋コンテンツ）を横並び
 * authorIdが指定されている場合、著者名がプロフィールページへのリンクになる
 * @see doc/input/design/components.json PostCard
 */
import { Link } from 'react-router-dom'

export interface PostCardProps {
  /** 著者のユーザーID（プロフィール遷移リンク用） */
  authorId?: string
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

/**
 * 投稿カードを描画する
 * authorIdが存在する場合、著者名をプロフィールページへのリンクとして表示する
 * @param props - 投稿情報（著者名、ハンドル、内容、タイムスタンプ）
 */
export function PostCard({
  authorId,
  authorName,
  handle,
  content,
  timestamp,
  avatarColor = 'bg-stone-700',
}: PostCardProps) {
  /** 著者名の表示要素。authorIdがある場合はプロフィールへのリンクにする */
  const authorNameElement = authorId ? (
    <Link
      to={`/profile/${authorId}`}
      aria-label={`${authorName}のプロフィールを表示`}
      className="text-base font-semibold text-stone-50 transition-colors hover:text-sage-400 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
    >
      {authorName}
    </Link>
  ) : (
    <span className="text-base font-semibold text-stone-50">
      {authorName}
    </span>
  )

  return (
    <article className="flex gap-3 rounded-lg border border-glass-border bg-glass-card p-5 backdrop-blur-[12px]">
      <div
        className={`h-10 w-10 shrink-0 rounded-full ${avatarColor}`}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {authorNameElement}
          <span className="text-sm text-stone-400">{handle}</span>
          <span className="text-sm text-stone-400">· {timestamp}</span>
        </div>
        <p className="text-base leading-relaxed text-stone-50">{content}</p>
      </div>
    </article>
  )
}
