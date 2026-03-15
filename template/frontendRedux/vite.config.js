import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({

  plugins: [react(), tailwindcss()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'Components': path.resolve(__dirname, './src/components'),
      'Pages': path.resolve(__dirname, './src/pages'),
      'Dashboard': path.resolve(__dirname, './src/Dashboard'),
      'Redux': path.resolve(__dirname, './src/Redux'),
      'utils': path.resolve(__dirname, './src/utils'),
      'axiosConfig': path.resolve(__dirname, './src/axios/axios.js'),
    },
  }
})
