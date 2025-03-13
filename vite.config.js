import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/todoList/', // 替换为你的仓库名
  build: {
    outDir: 'dist'
  }
}) 