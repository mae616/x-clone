/**
 * サイドバーコンポーネント
 * ロゴ・ナビゲーション・現在ユーザー情報を含む共通コンポーネント
 * @see doc/input/design/components.json Sidebar
 */
import { Leaf } from 'lucide-react'
import { NavItem, type NavItemProps } from '../navigation/NavItem'

/** ナビゲーション定義 */
const NAV_ITEMS: NavItemProps[] = [
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
      className="sticky top-0 flex h-svh w-[280px] shrink-0 flex-col border-r border-glass-border backdrop-blur-[16px]"
      style={{
        background:
          '#FFFFFF08 linear-gradient(180deg, rgba(212,165,116,0.03) 0%, #1C1917 100%)',
      }}
    >
      <div className="flex flex-1 flex-col px-6 py-8">
        {/* ロゴ: lucide leaf + テキスト, gap 12px, paddingBottom 24px */}
        <div className="flex items-center gap-3 pb-6">
          <Leaf className="h-7 w-7 text-sage-300" />
          <span className="text-xl font-bold text-stone-50">ほっとSNS</span>
        </div>

        {/* ナビゲーション: gap 4px */}
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <NavItem
                {...item}
                state={activePath === item.href ? 'active' : 'default'}
              />
            </li>
          ))}
        </ul>

        {/* スペーサー */}
        <div className="flex-1" />

        {/* 現在のユーザー: border-top #2E2A25, gap 12px, paddingTop 16px */}
        <div className="flex items-center gap-3 border-t border-border-subtle pt-4">
          <div className="h-10 w-10 rounded-full bg-sage-muted" />
          <div className="flex flex-col gap-0.5">
            <span className="text-md font-semibold text-stone-50">さくら</span>
            <span className="text-xs text-stone-500">@sakura</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
