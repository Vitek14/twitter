import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      // Настройки SVGR (опционально)
      exportAsDefault: false, // Включает поддержку `ReactComponent`
    }),
  ],
});
