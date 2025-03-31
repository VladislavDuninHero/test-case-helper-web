import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Для Render оставьте '/'
  build: {
    outDir: 'dist',  // Папка сборки
  },
})
