import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  build: {
    outDir: path.resolve(__dirname, '../out/react-webview'), // <-- build into extension/out
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',            // deterministic file names
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
})
