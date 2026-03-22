/**
 * ショートカットヘルプモーダルコンポーネント
 * キーボードショートカットの一覧を表示するダイアログ
 * - ?キーで開き、Escapeキーで閉じる
 * - WAI-ARIA準拠: role="dialog", aria-modal, aria-label
 * - フォーカストラップ: 開いた時に閉じるボタンへフォーカス
 * - オーバーレイクリックで閉じる
 */
import { useEffect, useRef } from 'react'

/** macOS判定: Cmd/Ctrlの表示切替に使用 */
const isMac =
  typeof navigator !== 'undefined' && navigator.userAgent.includes('Mac')

/** ショートカット定義 */
const SHORTCUTS = [
  { keys: `${isMac ? 'Cmd' : 'Ctrl'} + Enter`, description: '投稿を送信' },
  { keys: '1', description: 'タイムライン' },
  { keys: '2', description: 'ユーザー一覧' },
  { keys: '3', description: 'プロフィール' },
  { keys: '?', description: 'このヘルプを表示' },
  { keys: 'Escape', description: '閉じる' },
] as const

/**
 * ショートカットヘルプモーダルのProps
 */
interface ShortcutHelpModalProps {
  /** モーダルの表示状態 */
  isOpen: boolean
  /** モーダルを閉じるコールバック */
  onClose: () => void
}

/**
 * キーボードショートカットの一覧を表示するモーダルダイアログ
 * グラスモーフィズムスタイルでデザインシステムに準拠
 * @param props モーダルの表示制御プロパティ
 */
export function ShortcutHelpModal({ isOpen, onClose }: ShortcutHelpModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // モーダル表示時にフォーカストラップ: 閉じるボタンへフォーカス
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    }
  }, [isOpen])

  // Escapeキーでモーダルを閉じる
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="キーボードショートカット"
        className="mx-4 w-full max-w-md rounded-xl border border-glass-border bg-glass-card p-6 shadow-xl backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー: タイトル + 閉じるボタン */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-stone-50">
            キーボードショートカット
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="rounded-md p-1 text-stone-400 transition-colors hover:text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-300"
            aria-label="閉じる"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ショートカット一覧テーブル */}
        <table className="w-full">
          <tbody>
            {SHORTCUTS.map((shortcut) => (
              <tr
                key={shortcut.keys}
                className="border-t border-stone-700/50"
              >
                <td className="py-2.5 pr-4">
                  <kbd className="rounded bg-stone-700 px-2 py-0.5 font-mono text-sm text-stone-300">
                    {shortcut.keys}
                  </kbd>
                </td>
                <td className="py-2.5 text-sm text-stone-300">
                  {shortcut.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
