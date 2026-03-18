/**
 * ユーザーカードコンポーネント
 * アバター（48px ellipse）＋名前＋ハンドル＋フォローボタン
 * @see doc/input/design/components.json UserCard
 */
import { Button } from '../ui/Button'

export interface UserCardProps {
  /** ユーザー名 */
  name: string
  /** ハンドル（@xxx） */
  handle: string
  /** フォロー中かどうか */
  isFollowing: boolean
  /** アバター背景色のTailwindクラス */
  avatarColor?: string
}

export function UserCard({
  name,
  handle,
  isFollowing,
  avatarColor = 'bg-stone-700',
}: UserCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-lg border border-glass-border bg-glass-card p-5 backdrop-blur-[12px]">
      {/* アバター: 48px ellipse */}
      <div className={`h-12 w-12 shrink-0 rounded-full ${avatarColor}`} />
      {/* ユーザー情報: gap 4px */}
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-base font-semibold text-stone-50">{name}</span>
        <span className="text-sm text-stone-500">{handle}</span>
      </div>
      <Button tone={isFollowing ? 'outline' : 'primary'} size="sm">
        {isFollowing ? 'フォロー中' : 'フォロー'}
      </Button>
    </article>
  )
}
