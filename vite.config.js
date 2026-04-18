import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Increase chunk warning limit slightly
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunking: split heavy deps into separate cached chunks
        manualChunks: {
          // React core — rarely changes, gets cached aggressively
          'vendor-react': ['react', 'react-dom'],
          // Framer Motion is large — isolate it
          'vendor-framer': ['framer-motion'],
          // Lucide icons
          'vendor-icons': ['lucide-react', 'react-icons'],
        },
      },
    },
    // Enable minification
    minify: 'esbuild',
    // Inline small assets instead of separate requests
    assetsInlineLimit: 8192,
  },
  // Optimize deps pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
