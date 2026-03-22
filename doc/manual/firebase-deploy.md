# Firebase本番設定 + GitHub Pagesデプロイ

最終更新: 2026-03-22 / 対象: Firebase + GitHub Pages / 想定読者: 開発者（プロジェクトオーナー）

## 変更履歴
- 2026-03-22: 初版作成（Issue #37）

## 1. 概要
- **目的**: ほっとSNSをFirebase本番プロジェクトに接続し、GitHub Pagesで公開する
- **成果物**: 本番Firestore + GitHub Pagesで動作するSNSアプリ
- **失敗時の影響**: ローカルEmulator環境は影響なし（本番設定は分離）

## 2. 前提条件
- OS/シェル: macOS / zsh
- 必要ツール:
  - Node.js LTS（.mise.tomlで管理）
  - pnpm
  - Firebase CLI（`firebase-tools`）— back/node_modulesにインストール済み
  - GitHub CLI（`gh`）
- 権限:
  - Googleアカウント（Firebase Console操作用）
  - GitHubリポジトリのAdmin権限（Pages設定用）
- 参照: doc/input/rdd.md §技術スタック, §非機能要件

---

## 3. 詳細手順

### [S-01] Firebaseにログイン
- **目的**: Firebase CLIでGoogleアカウントを認証する
- **実行コマンド**:
  ```bash
  cd back
  npx firebase login
  ```
  ブラウザが開くのでGoogleアカウントでログインする。
- **検証**:
  ```bash
  npx firebase projects:list
  ```
  **期待結果**: Googleアカウントに紐づくプロジェクト一覧が表示される
- **注意**: 既にログイン済みなら `Already logged in` と表示される

### [S-02] Firebase本番プロジェクト作成
- **目的**: Firebase Consoleで本番用プロジェクトを作成する
- **手順（Firebase Console）**:
  1. https://console.firebase.google.com/ にアクセス
  2. 「プロジェクトを追加」をクリック
  3. プロジェクト名: `hot-sns`（任意、ただし以降の手順ではこの名前を使用）
  4. Google Analyticsは**無効**にする（学習用プロジェクトのため）
  5. 「プロジェクトを作成」をクリック
- **検証**:
  ```bash
  npx firebase projects:list
  ```
  **期待結果**: `hot-sns` が一覧に表示される
- **注意**: プロジェクトIDは自動生成される場合がある（例: `hot-sns-12345`）。実際のIDを控えておく

### [S-03] Firestoreデータベースを有効化
- **目的**: Firebase Consoleで Cloud Firestore を有効にする
- **手順（Firebase Console）**:
  1. 作成したプロジェクト → 左メニュー「Firestore Database」
  2. 「データベースを作成」をクリック
  3. ロケーション: `asia-northeast1`（東京）を選択
  4. セキュリティルール: 「テストモードで開始」を選択（後でルールを設定する）
  5. 「作成」をクリック
- **検証**: Firebase Console でFirestoreの空のデータベースが表示される

### [S-04] Webアプリを登録してfirebaseConfigを取得
- **目的**: フロントエンドから接続するための設定情報を取得する
- **手順（Firebase Console）**:
  1. プロジェクト設定（歯車アイコン）→「全般」タブ
  2. 「アプリを追加」→ Webアイコン（`</>`）をクリック
  3. アプリのニックネーム: `hot-sns-web`
  4. Firebase Hosting は**チェックしない**（GitHub Pagesを使うため）
  5. 「アプリを登録」をクリック
  6. 表示される `firebaseConfig` オブジェクトを**コピーして控える**:
     ```javascript
     const firebaseConfig = {
       apiKey: "<YOUR_API_KEY>",
       authDomain: "<PROJECT_ID>.firebaseapp.com",
       projectId: "<PROJECT_ID>",
       storageBucket: "<PROJECT_ID>.firebasestorage.app",
       messagingSenderId: "<SENDER_ID>",
       appId: "<APP_ID>"
     };
     ```
- **注意**: `apiKey` はFirebaseの仕様上フロントに公開される値で、セキュリティはFirestoreルールで担保する

### [S-05] .firebaserc に本番プロジェクトを登録
- **目的**: Firebase CLIで本番プロジェクトを使えるようにする
- **実行コマンド**:
  ```bash
  cd back
  npx firebase use --add
  ```
  - プロジェクト選択: `<PROJECT_ID>`（S-02で作成したもの）
  - エイリアス: `production`
- **検証**:
  ```bash
  cat .firebaserc
  ```
  **期待結果**:
  ```json
  {
    "projects": {
      "default": "x-clone-local",
      "production": "<PROJECT_ID>"
    }
  }
  ```
- **ロールバック**: `.firebaserc` から `production` エントリを削除

### [S-06] Firestoreセキュリティルールをデプロイ
- **目的**: 本番Firestoreに適切なセキュリティルールを適用する
- **前提**: この手順の前に、AIがセキュリティルールファイルを作成する（後述）
- **実行コマンド**:
  ```bash
  cd back
  npx firebase use production
  npx firebase deploy --only firestore:rules
  ```
- **検証**: Firebase Console → Firestoreルールタブでルールが反映されていることを確認
- **ロールバック**:
  ```bash
  npx firebase use default
  ```
  （ローカル開発に戻す）

### [S-07] フロントにfirebaseConfigを設定
- **目的**: フロントエンドを本番Firestoreに接続する
- **前提**: この手順の前に、AIが `firebase.ts` を環境分岐対応に修正する（後述）
- **実行コマンド**:
  ```bash
  cd front
  cp .env.example .env.production
  ```
  `.env.production` にS-04で取得した値を記入:
  ```
  VITE_FIREBASE_API_KEY=<YOUR_API_KEY>
  VITE_FIREBASE_AUTH_DOMAIN=<PROJECT_ID>.firebaseapp.com
  VITE_FIREBASE_PROJECT_ID=<PROJECT_ID>
  VITE_FIREBASE_STORAGE_BUCKET=<PROJECT_ID>.firebasestorage.app
  VITE_FIREBASE_MESSAGING_SENDER_ID=<SENDER_ID>
  VITE_FIREBASE_APP_ID=<APP_ID>
  ```
- **注意**: `.env.production` は `.gitignore` に追加済みであること

### [S-08] 本番用ビルド + 動作確認
- **目的**: 本番設定でビルドし、ローカルでプレビュー確認する
- **実行コマンド**:
  ```bash
  cd front
  pnpm build
  pnpm preview
  ```
- **検証**: ブラウザで http://localhost:4173 を開き、本番Firestoreのデータが表示されることを確認
- **注意**: 本番Firestoreにはまだデータがないため、空の画面が表示される。シードデータを投入する場合:
  ```bash
  cd back
  npx firebase use production
  # seed.tsのEmulator接続部分を本番用に一時変更して実行
  ```

### [S-09] GitHub Pagesの設定
- **目的**: GitHub Pagesでの静的サイトホスティングを有効にする
- **手順（GitHub）**:
  1. リポジトリ → Settings → Pages
  2. Source: 「GitHub Actions」を選択
- **前提**: この手順の前に、AIがGitHub Actionsワークフローを作成する（後述）

### [S-10] GitHub Actionsでデプロイ
- **目的**: mainブランチへのpush時に自動デプロイする
- **前提**: AIが `.github/workflows/deploy.yml` を作成済み
- **実行コマンド**:
  ```bash
  git add -A
  git commit -m "feat: GitHub Pages デプロイ設定"
  git push origin main
  ```
- **検証**:
  ```bash
  gh run list --limit 1
  ```
  **期待結果**: ワークフローが成功（✓）
- **確認URL**: `https://<USERNAME>.github.io/<REPO_NAME>/`

### [S-11] GitHub SecretsにFirebase設定を登録（オプション）
- **目的**: ビルド時に環境変数を注入する（.env.productionをリポジトリに含めない場合）
- **実行コマンド**:
  ```bash
  gh secret set VITE_FIREBASE_API_KEY --body "<YOUR_API_KEY>"
  gh secret set VITE_FIREBASE_AUTH_DOMAIN --body "<PROJECT_ID>.firebaseapp.com"
  gh secret set VITE_FIREBASE_PROJECT_ID --body "<PROJECT_ID>"
  gh secret set VITE_FIREBASE_STORAGE_BUCKET --body "<PROJECT_ID>.firebasestorage.app"
  gh secret set VITE_FIREBASE_MESSAGING_SENDER_ID --body "<SENDER_ID>"
  gh secret set VITE_FIREBASE_APP_ID --body "<APP_ID>"
  ```
- **検証**: GitHub → Settings → Secrets → 6件のシークレットが登録されている

---

## 4. 確認方法（総合）
- **本番URL**: `https://<USERNAME>.github.io/<REPO_NAME>/`
- **期待動作**:
  - タイムライン画面が表示される
  - 投稿が可能（Firestoreに保存される）
  - ユーザー一覧/プロフィール/フォローが動作する
- **Firebase Console**: Firestoreにデータが保存されていることを確認

---

## 5. トラブルシューティング
- **[TS-01]** `firebase login` でブラウザが開かない
  → `npx firebase login --no-localhost` を試す
- **[TS-02]** `Permission denied` でデプロイ失敗
  → `npx firebase use production` で正しいプロジェクトが選択されているか確認
- **[TS-03]** GitHub Pages が404
  → vite.config.ts の `base` が正しいか確認（`/リポジトリ名/` が必要）
- **[TS-04]** 本番でFirestoreに接続できない
  → `.env.production` の値が正しいか確認。Firebase ConsoleでWebアプリの設定を再確認
- **[TS-05]** CORS エラー
  → Firebase Consoleで承認済みドメインに `<USERNAME>.github.io` を追加

---

## 6. 完了後の効果
- 本番環境でSNSアプリが公開され、URLを共有可能
- Firestoreセキュリティルールで不正アクセスを防止
- GitHub Actionsで自動デプロイが機能

---

## 7. 付録

### AI側で実装が必要なファイル（手順書実行前に完了させる）
| ファイル | 内容 |
|---------|------|
| `back/firestore.rules` | 本番用セキュリティルール（読み取り許可、書き込み制限） |
| `front/src/lib/firebase.ts` | 環境分岐（Emulator / 本番）対応 |
| `front/.env.example` | 環境変数テンプレート |
| `front/vite.config.ts` | `base` 設定追加（GitHub Pages用） |
| `.github/workflows/deploy.yml` | GitHub Actions デプロイワークフロー |
| `front/.gitignore` | `.env.production` 追加 |

### 環境変数一覧
| 変数名 | 説明 | 例 |
|--------|------|-----|
| `VITE_FIREBASE_API_KEY` | Firebase APIキー | `AIzaSy...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | 認証ドメイン | `hot-sns.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | プロジェクトID | `hot-sns` |
| `VITE_FIREBASE_STORAGE_BUCKET` | ストレージバケット | `hot-sns.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | メッセージング送信者ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | アプリID | `1:123:web:abc` |
