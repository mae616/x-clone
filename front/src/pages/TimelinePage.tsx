/**
 * タイムライン画面
 * フォロー中＋自分の投稿をcreatedAt降順で表示。投稿の作成が可能。
 * @see doc/input/design/design-context.json TimelinePage
 */
import { Composer } from '../components/post/Composer'
import { PostCard } from '../components/post/PostCard'

/** ダミー投稿データ（Sprint 2でFirestore接続に差し替え） */
const DUMMY_POSTS = [
  {
    id: '1',
    authorName: 'さくら',
    handle: '@sakura',
    content:
      '今日も一日お疲れさまでした。夜風が気持ちいい季節になりましたね。窓を開けて深呼吸すると、少しだけ心が軽くなる気がします。',
    timestamp: '2時間前',
    avatarColor: 'bg-honey-muted',
  },
  {
    id: '2',
    authorName: 'はると',
    handle: '@haruto',
    content:
      '近所のカフェで見つけた新しいブレンド、すごく美味しかった。明日も行こうかな。',
    timestamp: '4時間前',
    avatarColor: 'bg-sage-muted',
  },
  {
    id: '3',
    authorName: 'ゆき',
    handle: '@yuki',
    content:
      '読みかけの本をやっと読み終えた。静かな夜に読書するのが最高の贅沢。',
    timestamp: '6時間前',
    avatarColor: 'bg-danger-muted',
  },
]

export default function TimelinePage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-stone-50">タイムライン</h1>
      <Composer />
      <div className="flex flex-col gap-3">
        {DUMMY_POSTS.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  )
}
