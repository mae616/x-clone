/**
 * Firestoreデータモデルの型定義
 * コレクション: users / posts / follows（すべてトップレベル）
 * @see doc/input/rdd.md §機能要件
 */
import { Timestamp } from 'firebase/firestore'

/** usersコレクションのドキュメント */
export interface User {
  /** ドキュメントID（Firestoreのauto-IDではなく手動設定） */
  id: string
  /** 表示名 */
  name: string
  /** ハンドル（@付き、例: @sakura） */
  handle: string
  /** 自己紹介文 */
  bio: string
  /** アバターの背景色（Tailwind CSSクラス名） */
  avatarColor: string
  /** 作成日時 */
  createdAt: Timestamp
}

/** postsコレクションのドキュメント */
export interface Post {
  /** ドキュメントID（auto-ID） */
  id: string
  /** 投稿者のユーザーID（users.id への参照） */
  authorId: string
  /** 投稿本文（最大140文字） */
  content: string
  /** 投稿日時 */
  createdAt: Timestamp
}

/**
 * followsコレクションのドキュメント
 * ドキュメントID: `${followerId}_${followeeId}`（一意性保証）
 * トップレベルコレクションにする理由:
 *   - 「AがBをフォローしているか」のクエリが単純（ドキュメント存在チェック）
 *   - フォロワー数の集計クエリが容易（where followeeId == X）
 */
export interface Follow {
  /** フォローする側のユーザーID */
  followerId: string
  /** フォローされる側のユーザーID */
  followeeId: string
  /** フォロー日時 */
  createdAt: Timestamp
}
