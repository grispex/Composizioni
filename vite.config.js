import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Composizioni/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    host: true, // Permette l'accesso dalla rete locale
    port: 5173, // Porta di default di Vite
  },
})

