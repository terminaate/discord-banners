import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: 'terser',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '!': path.resolve(__dirname, './src/assets/img'),
      '#': path.resolve(__dirname, './src/assets'),
    },
  },
  base: '',
});
