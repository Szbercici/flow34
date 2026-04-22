import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://16.171.9.47:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
