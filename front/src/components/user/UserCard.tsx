/**
 * ユーザーカードコンポーネント
 * アバター（48px ellipse）＋名前＋ハンドル＋フォローボタン
 * viewerIdと一致するユーザーにはフォローボタンを表示しない（自分自身のフォロー防止）
 * @see doc/input/design/components.json UserCard
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
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
  /** フォロートグル時のコールバック */
  onToggleFollow?: (userId: string) => Promise<void> | void
}

/**
 * ユーザーカードを描画する
 * フォローボタン押下時は連打防止のためdisabled状態にし、処理完了後に解除する
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
  /** フォロートグル処理中フラグ（連打防止） */
  const [isToggling, setIsToggling] = useState(false)

  /**
   * フォローボタン押下ハンドラ
   * 処理中はボタンをdisabledにして連打を防止する
   */
  const handleClick = async () => {
    if (!onToggleFollow || isToggling) return
    setIsToggling(true)
    try {
      await onToggleFollow(id)
    } catch (err) {
      console.error('フォロー操作に失敗しました:', err)
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <article className="flex items-center gap-4 rounded-lg border border-glass-border bg-glass-card p-5 backdrop-blur-[12px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-accent-subtle">
      {/* アバター: 48px ellipse */}
      <div className={`h-12 w-12 shrink-0 rounded-full ${avatarColor}`} />
      {/* ユーザー情報: gap 4px */}
      <div className="flex flex-1 flex-col gap-1">
        {/* ユーザー名: プロフィールページへのリンク */}
        <Link
          to={`/profile/${id}`}
          aria-label={`${name}のプロフィールを表示`}
          className="text-base font-semibold text-stone-50 transition-colors hover:text-sage-400 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
        >
          {name}
        </Link>
        <span className="text-sm text-stone-400">{handle}</span>
      </div>
      {!isSelf && (
        <Button
          tone={isFollowing ? 'outline' : 'primary'}
          size="sm"
          onClick={handleClick}
          disabled={isToggling}
          aria-label={isFollowing ? `${name}のフォローを解除` : `${name}をフォロー`}
          aria-busy={isToggling}
        >
          {isFollowing ? 'フォロー中' : 'フォロー'}
        </Button>
      )}
    </article>
  )
}
