import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Handles __dirname resolution in Vite ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

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
  // Sets base path to match your exact GitHub repository name
  base: '/ehr-poc-ai/', 
})
