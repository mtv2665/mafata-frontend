import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// تأكد أن التصدير هو default ويرجع كائن الإعدادات عبر defineConfig
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // المجلد اللي Vercel بيتوقع يلقى فيه الملفات الجاهزة
  }
})