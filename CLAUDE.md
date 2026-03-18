# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

X（旧Twitter）風SNSプロトタイプ「ほっとSNS」。Firebase Emulator Suiteでローカル完結する学習・検証用アプリケーション。
認証なし（`VIEWER_ID` 固定）、デプロイなし。

## 技術スタック

- **フロント**: React (latest) + Vite + TypeScript + Tailwind CSS
- **ルーティング**: react-router-dom
- **状態管理**: useState / useEffect のみ（Redux等のグローバル状態管理は使わない）
- **バックエンド**: Cloud Firestore（Firebase Emulator Suite）
- **テスト**: Playwright（E2E / 結合テスト）
- **静的解析**: ESLint + Prettier
- **パッケージ管理**: pnpm
- **ランタイム**: Node.js LTS（.mise.toml で管理）

## 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 静的解析・整形
pnpm lint
pnpm format

# テスト（Playwright E2E）
pnpm test
pnpm test -- --grep "テスト名"    # 単一テスト実行

# Firebase Emulator起動（別ターミナル）
pnpm emulators:start
```

> **注意**: `pnpm dev` の前に Firebase Emulator が起動していること。

## アーキテクチャ

### 設計原則
SOLID原則に準拠（`doc/input/architecture.md`）。逸脱時はADR-liteで記録。

### ページ構成（3画面）
- **TimelinePage**: フォロー中＋自分の投稿フィード、投稿コンポーザー
- **UsersPage**: 全ユーザー一覧、フォロー/アンフォロートグル
- **ProfilePage**: ユーザー情報＋フォロー数＋投稿一覧

### コンポーネント（7種）
Sidebar / NavItem / PostCard / UserCard / Button / Composer / ProfileHeader
定義: `doc/input/design/components.json`

### 重要な制約
- `viewerId` はログイン代替の固定値。自分自身にはフォローボタンを非表示
- APIレスポンスをそのまま state に格納。派生計算はバックエンド側に寄せる
- グローバル状態管理は導入しない

## デザインシステム

### コンセプト: 「日常に溶け込む安心感」
暖かみのあるダークモード基調。Quiet Luxury + グラスモーフィズム。

### SSOT（Single Source of Truth）
| ファイル | 内容 |
|---------|------|
| `doc/input/design/design-tokens.json` | カラー/スペーシング/タイポグラフィ/シャドウ |
| `doc/input/design/components.json` | コンポーネント定義・バリアント |
| `doc/input/design/design-context.json` | ページレイアウト・レスポンシブ制約 |
| `doc/input/design/copy.json` | 日本語UIテキスト（i18n） |
| `doc/input/design/x-clone-mvp.pen` | Pencilデザインファイル（3画面） |

### デザイントークン要点
- **カラー**: Stone系ダーク背景 / Sage系アクセント(`#8BAA7F`) / Honey系ハイライト(`#D4A574`)
- **フォント**: Noto Sans JP（400-700）、サイズ12-24px
- **ブレークポイント**: sm(640) / md(768) / lg(1024) / xl(1440)
- **コントラスト比**: 4.5:1以上を確保
- **アニメーション**: `prefers-reduced-motion` 対応必須

## 自動適用スキル（判断軸）

以下のスキルはタスク内容に応じて**自動的に適用**すること。明示的な `/スキル名` 呼び出しなしでも、該当する判断が必要な場面で参照・適用する。

### デザイン系
| スキル | 適用タイミング |
|--------|---------------|
| `ui-designer` | UI設計（情報設計＋インタラクション＋ビジュアル） |
| `usability-psychologist` | 認知負荷・エラー防止・学習コスト評価 |
| `sensory-design` | サウンド・ハプティクス・空間知覚の設計 |
| `animation-principles` | アニメーション/モーション/トランジション設計 |

### フロントエンド実装系
| スキル | 適用タイミング |
|--------|---------------|
| `frontend-implementation` | デザイン→実装の翻訳（比率・構造・制約優先） |
| `creative-coder` | 体験品質（動き/触感/視線誘導）の実装 |
| `developer-specialist` | 差分思考での設計→実装、責務不明/重複の防止 |
| `accessibility-engineer` | セマンティックHTML、WAI-ARIA、キーボード操作、コントラスト |

### インタラクション・品質系
| スキル | 適用タイミング |
|--------|---------------|
| `keyboard-shortcuts` | キーボードショートカット設計（W3C APG / WCAG準拠） |
| `testing` | テスト戦略・設計（ピラミッド比率、行動ベース） |

### プロジェクトスキル（技術固有）
| スキル | 適用タイミング |
|--------|---------------|
| `react` | Reactコンポーネント実装時 |
| `tailwind` | Tailwind CSSスタイリング時 |
| `playwright` | E2E/結合テスト作成時 |

## 参照ドキュメント

- **要件定義**: `doc/input/rdd.md`
- **アーキテクチャ**: `doc/input/architecture.md`
- **デザインSSOT**: `doc/input/design/*.json`
- **セッション状態**: `.claude/session-context.md`
