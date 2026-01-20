import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages safe default: relative base paths.
export default defineConfig({
  base: './',
  plugins: [react()],
})

