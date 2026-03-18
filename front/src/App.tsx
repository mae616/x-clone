/**
 * アプリケーションルートコンポーネント
 * react-router-dom v7 によるルーティング設定
 * @see doc/input/design/design_context.json pages定義
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import TimelinePage from './pages/TimelinePage'
import UsersPage from './pages/UsersPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<TimelinePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
