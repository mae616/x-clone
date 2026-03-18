/**
 * アプリケーションルートコンポーネント
 * #5でreact-router-domによるルーティングに差し替え予定
 * 暫定: URLパスで表示ページを切り替え
 */
import TimelinePage from './pages/TimelinePage'
import UsersPage from './pages/UsersPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const path = window.location.pathname

  if (path.startsWith('/users')) return <UsersPage />
  if (path.startsWith('/profile')) return <ProfilePage />
  return <TimelinePage />
}

export default App
