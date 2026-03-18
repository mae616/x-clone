/**
 * Firebase初期化 + Emulator接続設定
 * ローカル環境専用 — 本番Firebaseプロジェクトには接続しない
 */
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const app = initializeApp({ projectId: 'x-clone-local' })
const db = getFirestore(app)

// Firestore Emulatorに接続（ポート8080）
connectFirestoreEmulator(db, 'localhost', 8080)

export { db }
