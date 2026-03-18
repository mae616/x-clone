/**
 * ナビゲーション項目コンポーネント
 * Lucideアイコン＋ラベル。state: default/active
 * @see doc/input/design/components.json NavItem
 */
import { Link } from 'react-router-dom'
import { Newspaper, Users, User, type LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  newspaper: Newspaper,
  users: Users,
  user: User,
}

export interface NavItemProps {
  /** lucideアイコン名 */
  icon: string
  /** ラベルテキスト */
  label: string
  /** 遷移先パス */
  href: string
  /** 表示状態 */
  state?: 'default' | 'active'
}

export function NavItem({
  icon,
  label,
  href,
  state = 'default',
}: NavItemProps) {
  const Icon = ICON_MAP[icon]
  const isActive = state === 'active'

  return (
    <Link
      to={href}
      className={`flex items-center gap-3 rounded-md px-4 py-3 text-base ${
        isActive
          ? 'bg-nav-active font-semibold text-stone-50'
          : 'font-medium text-stone-400'
      }`}
    >
      {Icon && (
        <Icon
          className={`h-5 w-5 ${isActive ? 'text-sage-300' : 'text-stone-400'}`}
        />
      )}
      {label}
    </Link>
  )
}
