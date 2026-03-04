import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ESLint } from 'eslint'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), new ESLint(), tailwindcss()],
})
