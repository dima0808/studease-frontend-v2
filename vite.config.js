import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/helpers' as *;`,
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  server: {
    host: true,
  },
  preview: {
    allowedHosts: ['frontend', 'localhost', '127.0.0.1', 'studease.tech', 'www.studease.tech'],
    host: true,
    port: 3000
  }
});
