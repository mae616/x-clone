/**
 * アプリケーション全体の定数定義
 * viewerIdはログインの代替。UIにユーザー切替を入れるならstate管理にする
 * @see doc/input/rdd.md §注意事項
 */

/** 現在のログインユーザーID（認証なしの固定値） */
export const VIEWER_ID = '1'

/**
 * アバター用カラークラスのセーフリスト
 * Firestoreから動的に取得されるTailwindクラスはソースコードに明記しないとCSSに含まれない。
 * seed.tsで使用するavatarColorクラスをここに列挙し、Tailwind v4のスキャンに検出させる。
 * @see back/seed.ts ユーザーシードデータのavatarColor
 */
export const AVATAR_COLORS = [
  'bg-honey',
  'bg-blue-400',
  'bg-sage-300',
  'bg-sage-400',
  'bg-danger-300',
  'bg-stone-700',
] as const
