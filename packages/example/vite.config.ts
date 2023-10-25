import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/trpc': {
        target: 'http://127.0.0.1:3721',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/trpc/, '')
      }
    }
  }
})
