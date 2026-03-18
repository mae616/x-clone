/**
 * プロフィールヘッダーコンポーネント
 * アバター＋名前＋ハンドル＋bio＋フォローボタン＋フォロー数/フォロワー数
 * @see doc/input/design/components.json ProfileHeader
 */
import { Button } from '../ui/Button'

export interface ProfileHeaderProps {
  /** ユーザー名 */
  name: string
  /** ハンドル（@xxx） */
  handle: string
  /** 自己紹介文 */
  bio: string
  /** フォロー中の数 */
  followingCount: number
  /** フォロワー数 */
  followersCount: number
  /** フォロー中かどうか */
  isFollowing: boolean
  /** アバター背景色のTailwindクラス */
  avatarColor?: string
}

export function ProfileHeader({
  name,
  handle,
  bio,
  followingCount,
  followersCount,
  isFollowing,
  avatarColor = 'bg-stone-700',
}: ProfileHeaderProps) {
  return (
    <header
      role="banner"
      className="flex flex-col gap-4 rounded-lg border border-glass-border bg-glass-card pb-5 pl-6 pr-6 pt-6 backdrop-blur-[12px]"
    >
      {/* 上段: avatar(64px) + info + followButton, gap 16px */}
      <div className="flex items-center gap-4">
        <div className={`h-16 w-16 shrink-0 rounded-full ${avatarColor}`} />
        <div className="flex flex-1 flex-col gap-0.5">
          <h1 className="text-xl font-bold text-stone-50">{name}</h1>
          <span className="text-sm text-stone-400">{handle}</span>
        </div>
        <Button tone={isFollowing ? 'outline' : 'primary'} size="md">
          {isFollowing ? 'フォロー中' : 'フォロー'}
        </Button>
      </div>

      {/* bio */}
      <p className="text-md leading-relaxed text-stone-400">{bio}</p>

      {/* フォロー数/フォロワー数: border-top #2E2A25, gap 32px */}
      <div className="flex gap-8 border-t border-border-subtle pt-3">
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-bold text-stone-50">
            {followingCount}
          </span>
          <span className="text-md text-stone-400">フォロー中</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-bold text-stone-50">
            {followersCount}
          </span>
          <span className="text-md text-stone-400">フォロワー</span>
        </div>
      </div>
    </header>
  )
}
