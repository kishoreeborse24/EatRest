import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProd ? '/EatRest/' : './',
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5174
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  }
});
