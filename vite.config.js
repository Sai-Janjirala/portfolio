import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1000, // Combine into fewer chunks for faster mobile loading
    rollupOptions: {
      output: {
        // Less chunking removes waterfall requests (reduces HTTP overhead which is lethal to LCP on 3G)
        manualChunks: {
          'vendor': ['react', 'react-dom', 'framer-motion', 'lucide-react'],
        },
      },
    },
    minify: 'esbuild',
    assetsInlineLimit: 8192,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
