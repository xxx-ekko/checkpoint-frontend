import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
    // Removed basicSsl() to disable forced HTTPS
  ],
  server: {
    // Removed host: true so it defaults to strict localhost
    proxy: {
      // Proxy all /api requests to your Node.js HTTP backend
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})