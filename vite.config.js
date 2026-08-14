import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from "@cloudflare/vite-plugin";
import seoPlugin from './vite-plugin-seo.js';

// Ports sit above 15000 on purpose. Under WSL2 mirrored networking every bind
// goes through the Windows stack, and a Windows box whose ephemeral range has
// been widened down to 1024 refuses to listen on anything inside it. Vite and
// the Cloudflare plugin both react by walking upward one port at a time, which
// turned startup into a ~160s scan. strictPort makes a future collision fail
// loudly instead of silently scanning again.
export default defineConfig({
  plugins: [react(), cloudflare({ inspectorPort: 15356 }), seoPlugin()],
  server: { host: true, port: 15355, strictPort: true },
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
