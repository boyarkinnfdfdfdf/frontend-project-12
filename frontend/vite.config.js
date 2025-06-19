import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5002,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
      },
      '/socket.io': {
        target: 'ws://localhost:5002',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
})
