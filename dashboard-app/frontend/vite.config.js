import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 12000,
    host: '0.0.0.0',
    allowedHosts: true,
    cors: true
  }
})
