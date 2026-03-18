/**
 * メインレイアウトコンポーネント（レスポンシブ対応）
 * - Desktop: Sidebar(280px) + MainContent
 * - Tablet: Sidebar(72px) + MainContent
 * - Mobile: MainContent + BottomNavBar
 * ページ背景のウォームグロー（radial-gradient）もここで一元管理
 * @see doc/input/design/design-context.json responsive
 */
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { BottomNavBar } from '../navigation/BottomNavBar'

export function MainLayout() {
  const location = useLocation()

  return (
    <div
      className="flex min-h-svh flex-col bg-stone-900 md:flex-row"
      style={{
        background:
          '#1C1917 radial-gradient(ellipse at 55% 30%, rgba(212,165,116,0.06) 0%, transparent 100%)',
      }}
    >
      {/* Desktop/Tablet: サイドバー（モバイルでは非表示） */}
      <Sidebar activePath={location.pathname} />

      {/* メインコンテンツ: レスポンシブpadding
          Mobile: 20px 16px, gap 16px
          Tablet: 32px, gap 24px
          Desktop: 32px 48px, gap 24px */}
      <main className="flex flex-1 flex-col gap-4 overflow-hidden px-4 py-5 md:gap-6 md:p-8 lg:px-12 lg:py-8">
        <Outlet />
      </main>

      {/* Mobile: ボトムナビバー（md以上で非表示） */}
      <BottomNavBar activePath={location.pathname} />
    </div>
  )
}
