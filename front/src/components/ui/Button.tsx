/**
 * 汎用ボタンコンポーネント
 * tone: primary（gradient fill）/ outline（gradient stroke）
 * size: sm / md
 * @see doc/input/design/components.json Button
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** ボタンの見た目 */
  tone?: 'primary' | 'outline'
  /** サイズ */
  size?: 'sm' | 'md'
  /** ボタンテキスト */
  children: ReactNode
}

export function Button({
  tone = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  type = 'button',
  ...rest
}: ButtonProps) {
  const sizeClass =
    size === 'sm' ? 'px-5 py-2 text-sm' : 'px-6 py-2.5 text-md'

  if (tone === 'outline') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`rounded-full bg-transparent font-semibold text-sage-300 shadow-glow-accent-subtle transition-all duration-500 ease-out focus-visible:ring-2 focus-visible:ring-sage-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClass}`}
        style={{
          border: '1px solid transparent',
          backgroundImage:
            'linear-gradient(#1C1917, #1C1917), linear-gradient(135deg, #8BAA7F 0%, #A8D4A0 100%)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
        {...rest}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full font-semibold text-stone-900 shadow-glow-accent transition-all duration-500 ease-out focus-visible:ring-2 focus-visible:ring-sage-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClass}`}
      style={{
        background: 'linear-gradient(135deg, #8BAA7F 0%, #A8D4A0 100%)',
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
