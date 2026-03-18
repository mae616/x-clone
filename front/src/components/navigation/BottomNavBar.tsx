/**
 * モバイル用ボトムナビゲーション
 * pill型タブバーで3タブ切り替え。<768px（md未満）で表示
 * @see doc/input/design/components.json BottomNavBar
 */
import { Link } from 'react-router-dom'
import { Newspaper, Users, User, type LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  newspaper: Newspaper,
  users: Users,
  user: User,
}

interface TabItem {
  icon: string
  label: string
  href: string
}

const TABS: TabItem[] = [
  { icon: 'newspaper', label: 'タイムライン', href: '/' },
  { icon: 'users', label: 'ユーザー', href: '/users' },
  { icon: 'user', label: 'プロフィール', href: '/profile/1' },
]

interface BottomNavBarProps {
  /** 現在のアクティブなパス */
  activePath: string
}

export function BottomNavBar({ activePath }: BottomNavBarProps) {
  return (
    <nav
      role="navigation"
      aria-label="メインナビゲーション"
      className="block md:hidden"
    >
      {/* コンテナ: padding 12px 21px 21px 21px */}
      <div className="px-[21px] pb-[21px] pt-3">
        {/* pill: height 62px, cornerRadius 36px, padding 4px */}
        <div className="flex h-[62px] items-stretch rounded-[36px] border border-glass-border bg-stone-800 p-1 backdrop-blur-[12px]">
          {TABS.map((tab) => {
            const Icon = ICON_MAP[tab.icon]
            const isActive = activePath === tab.href

            return (
              <Link
                key={tab.href}
                to={tab.href}
                className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-[26px] ${
                  isActive ? 'bg-sage-300' : ''
                }`}
              >
                {Icon && (
                  <Icon
                    className={`h-[18px] w-[18px] ${
                      isActive ? 'text-stone-900' : 'text-stone-400'
                    }`}
                  />
                )}
                <span
                  className={`text-[9px] tracking-[0.5px] ${
                    isActive
                      ? 'font-semibold text-stone-900'
                      : 'font-medium text-stone-400'
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
