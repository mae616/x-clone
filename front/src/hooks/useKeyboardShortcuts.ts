/**
 * グローバルキーボードショートカットのカスタムフック
 * ページナビゲーション（1/2/3）とヘルプモーダル表示（?）を提供する
 * WCAG 2.1.4 準拠: 単独文字キーは入力フィールド外でのみ有効
 */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NAV_ITEMS } from '../lib/navigation'

/**
 * 入力フィールドにフォーカスがあるか判定する
 * input/textarea/[contenteditable]にフォーカスがある場合はグローバルショートカットを無効化
 * @returns 入力フィールドにフォーカスがあればtrue
 */
function isInputFocused(): boolean {
  const el = document.activeElement
  if (!el) return false
  const tagName = el.tagName.toLowerCase()
  return (
    tagName === 'input' ||
    tagName === 'textarea' ||
    el.hasAttribute('contenteditable')
  )
}

/**
 * グローバルキーボードショートカットを登録するフック
 * - 1: タイムラインへ遷移
 * - 2: ユーザー一覧へ遷移
 * - 3: プロフィールへ遷移
 * - ?: ショートカットヘルプモーダルの表示切替
 * @param onToggleHelp ヘルプモーダルの表示/非表示を切り替えるコールバック
 */
export function useKeyboardShortcuts(onToggleHelp: () => void) {
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // 入力フィールド内ではグローバルショートカット無効
      if (isInputFocused()) return

      switch (e.key) {
        case '1':
          navigate(NAV_ITEMS[0].href) // タイムライン
          break
        case '2':
          navigate(NAV_ITEMS[1].href) // ユーザー一覧
          break
        case '3':
          navigate(NAV_ITEMS[2].href) // プロフィール
          break
        case '?':
          e.preventDefault()
          onToggleHelp()
          break
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [navigate, onToggleHelp])
}
