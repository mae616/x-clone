/**
 * サイドバーコンポーネント（レスポンシブ対応）
 * - Desktop (≥1024px/lg): フルサイドバー 280px（ラベル付き）
 * - Tablet (768-1023px/md): アイコンのみサイドバー 72px
 * - Mobile (<768px): 非表示（BottomNavBarに委譲）
 * @see doc/input/design/components.json Sidebar, TabletSidebar
 */
import { Link } from 'react-router-dom'
import { Leaf, Newspaper, Users, User, type LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  newspaper: Newspaper,
  users: Users,
  user: User,
}

interface NavDef {
  icon: string
  label: string
  href: string
}

const NAV_ITEMS: NavDef[] = [
  { icon: 'newspaper', label: 'タイムライン', href: '/' },
  { icon: 'users', label: 'ユーザー一覧', href: '/users' },
  { icon: 'user', label: 'プロフィール', href: '/profile/1' },
]

interface SidebarProps {
  /** 現在のアクティブなパス */
  activePath: string
}

export function Sidebar({ activePath }: SidebarProps) {
  return (
    <nav
      role="navigation"
      aria-label="メインナビゲーション"
      className="sticky top-0 hidden h-svh shrink-0 flex-col border-r border-glass-border backdrop-blur-[16px] md:flex md:w-[72px] lg:w-[280px]"
      style={{
        background:
          '#FFFFFF08 linear-gradient(180deg, rgba(212,165,116,0.03) 0%, #1C1917 100%)',
      }}
    >
      <div className="flex flex-1 flex-col items-center px-0 py-6 lg:items-stretch lg:px-6 lg:py-8">
        {/* ロゴ: タブレット=アイコンのみ、デスクトップ=アイコン+テキスト */}
        <div className="flex items-center justify-center gap-3 pb-6 lg:justify-start">
          <Leaf className="h-7 w-7 text-sage-300" />
          <span className="hidden text-xl font-bold text-stone-50 lg:inline">
            ほっとSNS
          </span>
        </div>

        {/* ナビゲーション */}
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon]
            const isActive = activePath === item.href

            return (
              <li key={item.href}>
                {/* タブレット: アイコンのみ 48x48 */}
                <Link
                  to={item.href}
                  className={`flex items-center justify-center gap-3 rounded-md lg:justify-start lg:px-4 lg:py-3 ${
                    isActive
                      ? 'bg-nav-active font-semibold text-stone-50'
                      : 'font-medium text-stone-400'
                  }`}
                >
                  {/* タブレット: 48x48ボタン、デスクトップ: インラインアイコン */}
                  <span className="flex h-12 w-12 items-center justify-center rounded-md lg:h-auto lg:w-auto">
                    {Icon && (
                      <Icon
                        className={`h-[22px] w-[22px] lg:h-5 lg:w-5 ${
                          isActive ? 'text-sage-300' : 'text-stone-400'
                        }`}
                      />
                    )}
                  </span>
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* スペーサー */}
        <div className="flex-1" />

        {/* 現在のユーザー */}
        <div className="flex items-center justify-center gap-3 border-t border-border-subtle pt-4 lg:justify-start">
          <div className="h-9 w-9 rounded-full bg-sage-muted lg:h-10 lg:w-10" />
          <div className="hidden flex-col gap-0.5 lg:flex">
            <span className="text-md font-semibold text-stone-50">さくら</span>
            <span className="text-xs text-stone-500">@sakura</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
