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
  plugins: [react()]
})
