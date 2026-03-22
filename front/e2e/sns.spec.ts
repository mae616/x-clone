/**
 * ほっとSNS E2Eテスト
 * RDDのDoDに基づく7シナリオを検証する。
 * 前提: Firebase Emulatorが起動済み・シードデータが投入済みであること。
 * @see doc/input/rdd.md 完了定義（DoD）
 */
import { test, expect } from '@playwright/test'

test.describe('ユーザー一覧画面', () => {
  test('ユーザー一覧が5人以上表示される', async ({ page }) => {
    await page.goto('/users')

    // ローディングが完了し、UserCard（article要素）が表示されるまで待機
    const userCards = page.locator('article')
    await expect(userCards.first()).toBeVisible({ timeout: 10000 })

    // シードデータに5人以上のユーザーが存在することを検証
    const count = await userCards.count()
    expect(count).toBeGreaterThanOrEqual(5)
  })

  test('自分（さくら）にはフォローボタンが表示されない', async ({ page }) => {
    await page.goto('/users')

    // ユーザー一覧が表示されるまで待機
    const userCards = page.locator('article')
    await expect(userCards.first()).toBeVisible({ timeout: 10000 })

    // さくらのカードを特定（VIEWER_ID = '1' → /profile/1 へのリンクを持つカード）
    const sakuraCard = page.locator('article', {
      has: page.locator('a[href="/profile/1"]'),
    })
    await expect(sakuraCard).toBeVisible()

    // さくらのカード内にフォローボタンが存在しないことを検証
    const followButton = sakuraCard.locator('button')
    await expect(followButton).toHaveCount(0)
  })

  test('フォロー/アンフォローのトグルが動作する', async ({ page }) => {
    await page.goto('/users')

    const userCards = page.locator('article')
    await expect(userCards.first()).toBeVisible({ timeout: 10000 })

    // さくら以外のユーザーカードでフォローボタンを取得
    // VIEWER_ID='1'なので、/profile/1 リンクを持たないカードのボタンを対象にする
    const otherUserCard = page.locator('article', {
      hasNot: page.locator('a[href="/profile/1"]'),
    }).first()
    const followButton = otherUserCard.locator('button')
    await expect(followButton).toBeVisible()

    // 現在のボタンテキストを取得して、トグル後のテキストを検証
    const initialText = await followButton.textContent()

    await followButton.click()

    if (initialText === 'フォロー') {
      // フォロー → フォロー中 に変化
      await expect(followButton).toHaveText('フォロー中')
    } else {
      // フォロー中 → フォロー に変化
      await expect(followButton).toHaveText('フォロー')
    }

    // 元に戻す（テストの副作用をクリーンアップ）
    await followButton.click()
    await expect(followButton).toHaveText(initialText!)
  })

  test('ユーザー名クリックでプロフィール画面に遷移できる', async ({
    page,
  }) => {
    await page.goto('/users')

    const userCards = page.locator('article')
    await expect(userCards.first()).toBeVisible({ timeout: 10000 })

    // 最初のユーザーカードの名前リンクをクリック
    const firstUserLink = userCards.first().locator('a').first()
    await expect(firstUserLink).toBeVisible()

    await firstUserLink.click()

    // /profile/:userId に遷移していることを検証
    await expect(page).toHaveURL(/\/profile\/\d+/)
  })
})

test.describe('タイムライン画面', () => {
  test('文章を投稿するとFirestore保存され即時表示される', async ({
    page,
  }) => {
    await page.goto('/')

    // Composerが表示されるまで待機
    const composer = page.locator('form[aria-label="投稿を作成"]')
    await expect(composer).toBeVisible({ timeout: 10000 })

    // ユニークなテスト投稿内容を生成（テスト間の衝突回避）
    const testContent = `E2Eテスト投稿 ${Date.now()}`

    // テキスト入力
    const textarea = composer.locator('textarea[aria-label="投稿内容"]')
    await textarea.fill(testContent)

    // 投稿ボタンをクリック
    const submitButton = composer.locator('button[type="submit"]')
    await expect(submitButton).toBeEnabled()
    await submitButton.click()

    // 投稿がタイムラインに表示されることを検証
    const postedContent = page.locator('article', {
      hasText: testContent,
    })
    await expect(postedContent).toBeVisible({ timeout: 10000 })

    // テキストエリアがクリアされていることを検証
    await expect(textarea).toHaveValue('')
  })

  test('タイムラインに投稿が表示される', async ({
    page,
  }) => {
    await page.goto('/')

    // 投稿カードが表示されるまで待機（シードデータに投稿が存在する前提）
    const postCards = page.locator('article')
    await expect(postCards.first()).toBeVisible({ timeout: 10000 })

    // 投稿が1件以上表示されていることを検証
    const count = await postCards.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })
})

test.describe('プロフィール画面', () => {
  test('プロフィール画面にユーザー情報+投稿一覧が表示される', async ({
    page,
  }) => {
    // さくら（VIEWER_ID = '1'）のプロフィールページにアクセス
    await page.goto('/profile/1')

    // ProfileHeaderが表示されるまで待機
    const profileHeader = page.locator('header[role="banner"]')
    await expect(profileHeader).toBeVisible({ timeout: 10000 })

    // ユーザー名が表示されていることを検証
    await expect(profileHeader.locator('h1')).toContainText('さくら')

    // ハンドルが表示されていることを検証
    await expect(profileHeader).toContainText('@sakura')

    // bioが表示されていることを検証（ProfileHeaderのp要素）
    const bio = profileHeader.locator('p')
    await expect(bio).toBeVisible()

    // フォロー数・フォロワー数が表示されていることを検証
    await expect(profileHeader).toContainText('フォロー中')
    await expect(profileHeader).toContainText('フォロワー')

    // 投稿セクションが存在することを検証
    await expect(page.locator('h2', { hasText: '投稿' })).toBeVisible()
  })
})
