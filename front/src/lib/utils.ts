/**
 * 汎用ユーティリティ関数
 * Firestoreの値をUI表示用に変換するヘルパーを提供
 */
import { Timestamp } from 'firebase/firestore'

/**
 * FirestoreのTimestampを相対時刻文字列に変換する
 * 「たった今」「○分前」「○時間前」「○日前」の形式で返す
 * @param timestamp - FirestoreのTimestampオブジェクト
 * @returns 相対時刻を表す日本語文字列
 */
export function formatRelativeTime(timestamp: Timestamp): string {
  const now = Date.now()
  const then = timestamp.toMillis()
  const diffSeconds = Math.floor((now - then) / 1000)

  if (diffSeconds < 60) {
    return 'たった今'
  }

  const diffMinutes = Math.floor(diffSeconds / 60)
  if (diffMinutes < 60) {
    return `${diffMinutes}分前`
  }

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) {
    return `${diffHours}時間前`
  }

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 30) {
    return `${diffDays}日前`
  }

  // 30日以上前は日付表示
  const date = timestamp.toDate()
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}
