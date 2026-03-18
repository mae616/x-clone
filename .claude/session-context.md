# セッションコンテキスト

## 前回の作業
- **日時**: 2026-03-18
- **ブランチ**: main
- **最後のコミット**: 227af52e - Sprint 1: 基盤構築 + デザインコード化 + レスポンシブ対応 (#20)

## 進捗

### 完了（Sprint 1 + レスポンシブ）
1. ✅ #1 FEプロジェクト初期化（Vite + React + TS + Tailwind + ESLint + Prettier）
2. ✅ #2 Firebase Emulator Suite 初期設定
3. ✅ #3 デザインSSOT → 静的UI骨格生成（Pencilデザイン照合済み）
4. ✅ #4 UI骨格 → コンポーネント分割（7コンポーネント）
5. ✅ #5 コンポーネント結合 + react-router-dom ルーティング設定
6. ✅ #18 レスポンシブ対応（Desktop/Tablet/Mobile）
7. ✅ basic-review + deep-review 全指摘修正（3回レビュー → 指摘0件でApprove）
8. ✅ Sprint 1 → main マージ（PR #20）

### 未完了（Sprint 2: コア機能実装）
- ⏸️ #6 Firestoreデータモデル設計 + シードデータ投入
- ⏸️ #7 ユーザー一覧表示
- ⏸️ #8 フォロー/アンフォロー（トグル）
- ⏸️ #9 文章投稿（Firestore保存 + 即時表示）
- ⏸️ #10 タイムライン表示（フォロー中 + 自分、createdAt降順）
- ⏸️ #11 プロフィール画面（ユーザー情報 + 投稿一覧 + フォロー数/フォロワー数）
- ⏸️ #12 ユーザー名→プロフィール遷移
- ⏸️ #13 E2Eテスト（Playwright）

## 再開用プロンプト

Sprint 2（コア機能実装）を開始する。まず sprint/2026-03-core-features ブランチを main から作成し、/task-detail で #6〜#13 を詳細化してから /task-run で実装を開始する。

```
/session-start Sprint 2（コア機能実装）を開始。#6〜#13を実装して動作するSNSにする。
```

## 次にやること
1. `sprint/2026-03-core-features` ブランチを main から作成
2. `/task-detail` で Sprint 2 の #6〜#13 を詳細化
3. `/task-run` で #6（Firestoreデータモデル + シードデータ）から実装開始
4. #6 と #7 は並行可能（データモデル設計 + ユーザー一覧UI接続）
5. #8〜#12 は順次実装（フォロー → 投稿 → タイムライン → プロフィール → 遷移）
6. #13 E2Eテスト（全機能完了後）

## 適用したスキル判断軸
- ui-designer / usability-psychologist / accessibility-engineer
- frontend-implementation / creative-coder / developer-specialist
- keyboard-shortcuts / testing
- design-ssot / design-ui / design-components / design-assemble（レスポンシブ対応時）

## レビューバックログ（優先度低）
- N6: `NavDef.icon` の型を `keyof typeof ICON_MAP` に絞る
- N7: タブレットサイドバー幅 `72px` のマジックナンバーをトークン参照に
