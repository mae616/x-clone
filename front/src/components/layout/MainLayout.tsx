/**
 * メインレイアウトコンポーネント
 * Sidebar + メインコンテンツ領域（Outlet）の共通レイアウト
 * ページ背景のウォームグロー（radial-gradient）もここで一元管理
 */
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function MainLayout() {
  const location = useLocation()

  return (
    <div
      className="flex min-h-svh bg-stone-900"
      style={{
        background:
          '#1C1917 radial-gradient(ellipse at 55% 30%, rgba(212,165,116,0.06) 0%, transparent 100%)',
      }}
    >
      <Sidebar activePath={location.pathname} />

      {/* メインコンテンツ: padding 32px 48px, gap 24px, clip */}
      <main className="flex flex-1 flex-col gap-6 overflow-hidden px-12 py-8">
        <Outlet />
      </main>
    </div>
  )
}
