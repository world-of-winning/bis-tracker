import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from "@cloudflare/vite-plugin";
import seoPlugin from './vite-plugin-seo.js';

export default defineConfig({
  plugins: [react(), cloudflare(), seoPlugin()],
  server: { host: true, port: 5355 },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
