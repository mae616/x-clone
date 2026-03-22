import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  /**
   * GitHub Pages用のベースパス設定
   * 環境変数 VITE_BASE_PATH が設定されていればそれを使用、なければ '/'
   * GitHub Actionsで '/リポジトリ名/' を注入する
   */
  base: process.env.VITE_BASE_PATH || '/',
})
