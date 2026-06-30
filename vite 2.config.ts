import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Points '@/' directly to your 'src/app' directory
      '@': path.resolve(__dirname, './src/app'),
    },
  },
 // base: '/ehr-poc/', // 👈 Updated to match your exact folder name for GitHub Pages
base: './', // 👈 CHANGE THIS FROM '/ehr-poc/' TO './' 
})
