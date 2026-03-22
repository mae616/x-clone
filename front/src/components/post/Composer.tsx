/**
 * 投稿コンポーザーコンポーネント
 * アバター＋テキスト入力（上段）＋文字数カウント＋投稿ボタン（下段）
 * Firestoreのpostsコレクションに投稿を保存する
 * @see doc/input/design/components.json Composer
 */
import { useState, useCallback } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { VIEWER_ID } from '../../lib/constants'
import { Button } from '../ui/Button'

/** 投稿本文の最大文字数 */
const MAX_LENGTH = 140

/**
 * 投稿作成フォーム
 * - テキスト入力のリアルタイム文字数カウント（0/140）
 * - 空投稿・140文字超過時はボタン無効化
 * - Firestore postsコレクションへの保存とloading状態管理
 */
export function Composer() {
  /** 投稿本文の入力値 */
  const [content, setContent] = useState('')
  /** Firestore書き込み中のローディングフラグ */
  const [isSubmitting, setIsSubmitting] = useState(false)
  /** 投稿成功時の微光フィードバック表示フラグ */
  const [showSuccess, setShowSuccess] = useState(false)

  /**
   * 投稿成功時に200msだけ微光（グロウ）を表示するフィードバック
   * ユーザーに視覚的な完了感を与える
   */
  const flashSuccess = useCallback(() => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 600)
  }, [])

  const charCount = content.length
  const isEmpty = content.trim() === ''
  const isOverLimit = charCount > MAX_LENGTH
  /** 投稿ボタンの無効条件: 空文字・文字数超過・送信中 */
  const isDisabled = isEmpty || isOverLimit || isSubmitting

  /**
   * Ctrl+Enter（Win）/ Cmd+Enter（Mac）で投稿を送信するキーハンドラ
   * @param e キーボードイベント
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  /**
   * 投稿をFirestoreに保存する
   * postsコレクションにドキュメントを追加し、成功時に入力をクリアする
   */
  const handleSubmit = async () => {
    if (isDisabled) return

    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'posts'), {
        authorId: VIEWER_ID,
        content: content.trim(),
        createdAt: serverTimestamp(),
      })
      // 投稿成功後に入力をクリアし、微光フィードバックを表示
      setContent('')
      flashSuccess()
    } catch (error) {
      // エラー時はコンソールに出力（UIへのエラー表示は今後のスプリントで対応）
      console.error('投稿の保存に失敗しました:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      role="form"
      aria-label="投稿を作成"
      className={`flex flex-col gap-4 rounded-lg border bg-glass-card p-5 backdrop-blur-md transition-all duration-700 ease-out ${showSuccess ? 'border-sage-300/30 ring-2 ring-sage-300/30' : 'border-glass-border'} focus-within:border-stone-500`}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      {/* 上段: avatar + input, gap 12px */}
      <div className="flex gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-sage-muted" />
        <textarea
          aria-label="投稿内容"
          placeholder="いまどうしてる？"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSubmitting}
          className="min-h-[60px] flex-1 resize-none bg-transparent text-base leading-relaxed text-stone-50 placeholder:text-stone-400 focus:outline-none disabled:opacity-50"
        />
      </div>
      {/* 下段: charCount + button（右寄せ）, gap 12px */}
      <div className="flex items-center justify-end gap-3">
        <span
          className={`text-xs ${isOverLimit ? 'text-red-400' : 'text-stone-400'}`}
        >
          {charCount}/{MAX_LENGTH}
        </span>
        <Button
          tone="primary"
          size="md"
          type="submit"
          disabled={isDisabled}
        >
          {isSubmitting ? '投稿中...' : '投稿する'}
        </Button>
      </div>
    </form>
  )
}
