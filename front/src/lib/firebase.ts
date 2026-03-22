/**
 * Firebase初期化 + 環境分岐設定
 * ローカル開発時はEmulatorに接続、本番時はFirebase本番プロジェクトに接続する
 * @see doc/manual/firebase-deploy.md
 */
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

/**
 * Firebase設定
 * 本番: 環境変数（VITE_FIREBASE_*）から取得
 * ローカル: projectIdのみ指定（Emulator接続）
 */
const firebaseConfig = import.meta.env.VITE_FIREBASE_PROJECT_ID
  ? {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    }
  : { projectId: 'x-clone-local' }

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

/**
 * ローカル開発時のみEmulatorに接続する
 * 環境変数が未設定（= ローカル開発）の場合にEmulator接続を試みる
 * HMR時の二重接続を防止するガード付き
 */
if (!import.meta.env.VITE_FIREBASE_PROJECT_ID && location.hostname === 'localhost') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080)
  } catch {
    // HMRによる再接続時は既に接続済みのためエラーを無視
  }
}

export { db }
