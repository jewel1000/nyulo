import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The panel is served from https://nyulo.com/admin/, so every asset URL
// and route is prefixed with /admin/.
export default defineConfig({
  base: '/admin/',
  plugins: [react(), tailwindcss()],
  server: { port: 5174, strictPort: true },
});
