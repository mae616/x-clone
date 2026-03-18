/**
 * ナビゲーション定義の共通モジュール
 * Sidebar / BottomNavBar / NavItem から共有する
 */
import { Newspaper, Users, User, type LucideIcon } from 'lucide-react'
import { VIEWER_ID } from './constants'

/** lucideアイコン名 → コンポーネントのマッピング */
export const ICON_MAP: Record<string, LucideIcon> = {
  newspaper: Newspaper,
  users: Users,
  user: User,
}

/** ナビゲーション項目の型定義 */
export interface NavDef {
  /** lucideアイコン名 */
  icon: string
  /** サイドバー用ラベル（フル表示） */
  label: string
  /** モバイルボトムナビ用ラベル（短縮） */
  mobileLabel: string
  /** 遷移先パス */
  href: string
}

/** ナビゲーション項目の定義（全デバイス共通） */
export const NAV_ITEMS: NavDef[] = [
  {
    icon: 'newspaper',
    label: 'タイムライン',
    mobileLabel: 'タイムライン',
    href: '/',
  },
  {
    icon: 'users',
    label: 'ユーザー一覧',
    mobileLabel: 'ユーザー',
    href: '/users',
  },
  {
    icon: 'user',
    label: 'プロフィール',
    mobileLabel: 'プロフィール',
    href: `/profile/${VIEWER_ID}`,
  },
]
