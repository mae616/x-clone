/**
 * Firestoreシードデータ投入スクリプト
 * Firebase Emulator起動後に実行し、開発用の初期データを投入する
 *
 * 使い方: npx tsx seed.ts
 *
 * @see doc/input/rdd.md §DoD「ユーザー一覧表示 → 5人以上表示される」
 */
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  setDoc,
  Timestamp,
} from 'firebase/firestore'

const app = initializeApp({ projectId: 'x-clone-local' })
const db = getFirestore(app)
connectFirestoreEmulator(db, 'localhost', 8080)

// ── ユーザーデータ（5人） ──
// viewerId = '1' = さくら（CLAUDE.md / constants.ts で固定）
const users = [
  {
    id: '1',
    name: 'さくら',
    handle: '@sakura',
    bio: 'お花とお茶が好きです。毎日のんびり過ごしてます🌸',
    avatarColor: 'bg-honey',
  },
  {
    id: '2',
    name: 'あおい',
    handle: '@aoi',
    bio: '写真を撮るのが趣味。空の色が好き。',
    avatarColor: 'bg-blue-400',
  },
  {
    id: '3',
    name: 'ひなた',
    handle: '@hinata',
    bio: '料理と読書の日々。おすすめレシピ共有します！',
    avatarColor: 'bg-sage-300',
  },
  {
    id: '4',
    name: 'そら',
    handle: '@sora',
    bio: 'プログラミング勉強中。TypeScriptが楽しい。',
    avatarColor: 'bg-sage-400',
  },
  {
    id: '5',
    name: 'りく',
    handle: '@riku',
    bio: '音楽とギターが生きがい。ライブ情報発信中🎸',
    avatarColor: 'bg-blue-400',
  },
]

// ── 投稿データ（10件、createdAt降順で並ぶように時刻をずらす） ──
const now = Date.now()
const minutesAgo = (min: number) => Timestamp.fromMillis(now - min * 60 * 1000)

const posts = [
  {
    id: 'post-1',
    authorId: '1',
    content: '今日はいい天気ですね。お散歩日和🌸',
    createdAt: minutesAgo(5),
  },
  {
    id: 'post-2',
    authorId: '2',
    content: '朝焼けがきれいだったので写真撮りました📷',
    createdAt: minutesAgo(30),
  },
  {
    id: 'post-3',
    authorId: '3',
    content: '新しいパスタレシピ試してみた！トマトバジルが最高🍝',
    createdAt: minutesAgo(60),
  },
  {
    id: 'post-4',
    authorId: '1',
    content: 'カフェで読書中。この本おすすめです📚',
    createdAt: minutesAgo(120),
  },
  {
    id: 'post-5',
    authorId: '4',
    content: 'TypeScriptの型パズル、解けた時の達成感がすごい💪',
    createdAt: minutesAgo(180),
  },
  {
    id: 'post-6',
    authorId: '5',
    content: '今週末ライブやります！よかったら来てください🎸',
    createdAt: minutesAgo(240),
  },
  {
    id: 'post-7',
    authorId: '2',
    content: '夕焼けも最高でした。今日は一日中いい空だった☀️',
    createdAt: minutesAgo(300),
  },
  {
    id: 'post-8',
    authorId: '3',
    content: '最近読んだ本のレビュー書きました。よかったら見てね。',
    createdAt: minutesAgo(360),
  },
  {
    id: 'post-9',
    authorId: '4',
    content: 'React + Viteの開発体験が快適すぎる⚡',
    createdAt: minutesAgo(420),
  },
  {
    id: 'post-10',
    authorId: '5',
    content: '新曲できました！録音がんばる🎵',
    createdAt: minutesAgo(480),
  },
]

// ── フォロー関係 ──
// さくら(1)がフォロー: あおい(2), ひなた(3)
// あおい(2)がフォロー: さくら(1), ひなた(3)
// ひなた(3)がフォロー: さくら(1)
// そら(4)がフォロー: さくら(1), あおい(2)
// りく(5)がフォロー: さくら(1)
const follows = [
  { followerId: '1', followeeId: '2' },
  { followerId: '1', followeeId: '3' },
  { followerId: '2', followeeId: '1' },
  { followerId: '2', followeeId: '3' },
  { followerId: '3', followeeId: '1' },
  { followerId: '4', followeeId: '1' },
  { followerId: '4', followeeId: '2' },
  { followerId: '5', followeeId: '1' },
]

async function seed() {
  console.log('🌱 シードデータ投入開始...')

  // ユーザー投入
  for (const user of users) {
    await setDoc(doc(db, 'users', user.id), {
      ...user,
      createdAt: Timestamp.now(),
    })
  }
  console.log(`  ✅ users: ${users.length}件`)

  // 投稿投入
  for (const post of posts) {
    await setDoc(doc(db, 'posts', post.id), post)
  }
  console.log(`  ✅ posts: ${posts.length}件`)

  // フォロー関係投入
  for (const follow of follows) {
    const followId = `${follow.followerId}_${follow.followeeId}`
    await setDoc(doc(db, 'follows', followId), {
      ...follow,
      createdAt: Timestamp.now(),
    })
  }
  console.log(`  ✅ follows: ${follows.length}件`)

  console.log('🎉 シードデータ投入完了！')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ シードデータ投入失敗:', err)
  process.exit(1)
})
