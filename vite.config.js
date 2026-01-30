import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    host: true, // Permette l'accesso dalla rete locale
    port: 5173, // Porta di default di Vite
    proxy: {
      // Proxy per i modelli R2 per bypassare CORS durante lo sviluppo
      '/api/models': {
        target: 'https://pub-6ad83165a4034b38b22e7ac5d0bbe544.r2.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/models/, '/models'),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Aggiungi header per evitare problemi CORS
            proxyReq.setHeader('Origin', 'https://pub-6ad83165a4034b38b22e7ac5d0bbe544.r2.dev');
          });
        },
      },
    },
  },
})

