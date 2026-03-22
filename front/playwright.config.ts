/**
 * Playwright E2Eテスト設定
 * Vite devサーバーを自動起動し、Chromiumでヘッドレステストを実行する。
 * Firebase Emulatorは事前に起動しておく必要がある。
 * @see https://playwright.dev/docs/test-configuration
 */
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    /** テスト失敗時のみスクリーンショットを取得する */
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    /** devサーバー起動待ちのタイムアウト（30秒） */
    timeout: 30000,
  },
})
