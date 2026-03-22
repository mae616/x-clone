/**
 * 汎用ユーティリティ関数
 * UIで共通利用するフォーマッタや変換処理を集約する
 */
import { Timestamp } from 'firebase/firestore'

/**
 * Firestore TimestampまたはDateを相対時刻文字列に変換する
 * 「たった今」「○分前」「○時間前」「○日前」「YYYY/M/D」の形式で返す
 * @param timestamp - Firestoreのタイムスタンプ（serverTimestamp未確定時はnull）
 * @returns 相対時刻の日本語文字列
 */
export function formatRelativeTime(timestamp: Timestamp | null): string {
  if (!timestamp) return ''

  const now = Date.now()
  const target = timestamp.toMillis()
  const diffMs = now - target

  // 未来のタイムスタンプ（クロックスキュー対策）
  if (diffMs < 0) return 'たった今'

  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSeconds < 60) return 'たった今'
  if (diffMinutes < 60) return `${diffMinutes}分前`
  if (diffHours < 24) return `${diffHours}時間前`
  if (diffDays < 7) return `${diffDays}日前`

  // 7日以上前は絶対日付で表示
  const date = timestamp.toDate()
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}
