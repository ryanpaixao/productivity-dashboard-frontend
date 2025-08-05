import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: "bundle-report.html"
    }),
  ],
  server: {
    host: true, // or host: "0.0.0.0"
    port: 5173, // or any other port
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/jsx-runtime')) {
              return 'vendor-react';
            }
            if (id.includes('@chakra-ui') || id.includes('@emotion')) {
              return 'vendor-chakra';
            }
            if (id.includes('chart.js')) {
              return 'vendor-charts';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            if (id.includes('date-fns')) {
              return 'vendor-dates';
            }

            return 'vendor-other';
          }
        },
      },
    },
  },
})
