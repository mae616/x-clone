/**
 * ナビゲーション項目コンポーネント
 * Lucideアイコン＋ラベル。state: default/active
 * Desktop: アイコン+ラベル、Tablet: アイコンのみ
 * @see doc/input/design/components.json NavItem
 */
import { Link } from 'react-router-dom'
import { ICON_MAP } from '../../lib/navigation'

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
      className={`flex items-center justify-center gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-sage-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 lg:justify-start lg:px-4 lg:py-3 ${
        isActive
          ? 'bg-nav-active font-semibold text-stone-50'
          : 'font-medium text-stone-400'
      }`}
    >
      {/* タブレット: 48x48、デスクトップ: インラインアイコン */}
      <span className="flex h-12 w-12 items-center justify-center rounded-md lg:h-auto lg:w-auto">
        {Icon && (
          <Icon
            className={`h-[22px] w-[22px] lg:h-5 lg:w-5 ${
              isActive ? 'text-sage-300' : 'text-stone-400'
            }`}
          />
        )}
      </span>
      <span className="hidden lg:inline">{label}</span>
    </Link>
  )
}
