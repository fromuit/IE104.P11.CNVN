import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // Modern SCSS compiler options
        api: 'modern-compiler',
        additionalData: `@use "sass:map";`
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()]
})
