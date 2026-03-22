/**
 * ユーザーカードコンポーネント
 * アバター（48px ellipse）＋名前＋ハンドル＋フォローボタン
 * viewerIdと一致するユーザーにはフォローボタンを表示しない（自分自身のフォロー防止）
 * @see doc/input/design/components.json UserCard
 */
import { Button } from '../ui/Button'
import { VIEWER_ID } from '../../lib/constants'

export interface UserCardProps {
  /** ユーザーID（viewerId判定に使用） */
  id: string
  /** ユーザー名 */
  name: string
  /** ハンドル（@xxx） */
  handle: string
  /** フォロー中かどうか */
  isFollowing: boolean
  /** アバター背景色のTailwindクラス */
  avatarColor?: string
  /** フォロートグル時のコールバック（#8で実装予定） */
  onToggleFollow?: (userId: string) => void
}

/**
 * ユーザーカードを描画する
 * @param props - ユーザー情報とフォロー状態
 */
export function UserCard({
  id,
  name,
  handle,
  isFollowing,
  avatarColor = 'bg-stone-700',
  onToggleFollow,
}: UserCardProps) {
  /** 自分自身にはフォローボタンを表示しない */
  const isSelf = id === VIEWER_ID

  return (
    <article className="flex items-center gap-4 rounded-lg border border-glass-border bg-glass-card p-5 backdrop-blur-[12px]">
      {/* アバター: 48px ellipse */}
      <div className={`h-12 w-12 shrink-0 rounded-full ${avatarColor}`} />
      {/* ユーザー情報: gap 4px */}
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-base font-semibold text-stone-50">{name}</span>
        <span className="text-sm text-stone-400">{handle}</span>
      </div>
      {!isSelf && (
        <Button
          tone={isFollowing ? 'outline' : 'primary'}
          size="sm"
          onClick={() => onToggleFollow?.(id)}
        >
          {isFollowing ? 'フォロー中' : 'フォロー'}
        </Button>
      )}
    </article>
  )
}
