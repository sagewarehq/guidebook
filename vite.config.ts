import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Dev: `npm run dev`, then open http://localhost:8766/.
// Build: `npm run build` writes dist/index.html, one self-contained file (scripts and styles inlined)
// that opens from file:// too; routes live in the hash.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  server: { port: 8766 },
  build: { outDir: 'dist', emptyOutDir: true },
});
