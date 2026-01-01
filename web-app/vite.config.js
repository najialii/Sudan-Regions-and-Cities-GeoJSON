import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist'
  }
})