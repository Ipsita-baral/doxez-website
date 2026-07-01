import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://doxez-frontend-alb-1475539815.ap-south-1.elb.amazonaws.com', // Your backend URL
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
