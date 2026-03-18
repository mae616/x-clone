/**
 * モバイル用ボトムナビゲーション
 * pill型タブバーで3タブ切り替え。<768px（md未満）で表示
 * @see doc/input/design/components.json BottomNavBar
 */
import { Link } from 'react-router-dom'
import { ICON_MAP, NAV_ITEMS } from '../../lib/navigation'

interface BottomNavBarProps {
  /** 現在のアクティブなパス */
  activePath: string
}

export function BottomNavBar({ activePath }: BottomNavBarProps) {
  return (
    <nav
      role="navigation"
      aria-label="モバイルナビゲーション"
      className="block md:hidden"
    >
      {/* コンテナ: padding 12px 21px 21px 21px */}
      <div className="px-[21px] pb-[21px] pt-3">
        {/* pill: height 62px, cornerRadius 36px, padding 4px */}
        <div className="flex h-[62px] items-stretch rounded-[36px] border border-glass-border bg-stone-800 p-1 backdrop-blur-[12px]">
          {NAV_ITEMS.map((tab) => {
            const Icon = ICON_MAP[tab.icon]
            const isActive = activePath === tab.href

            return (
              <Link
                key={tab.href}
                to={tab.href}
                className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-[26px] focus-visible:ring-2 focus-visible:ring-sage-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 ${
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
                  {tab.mobileLabel}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
