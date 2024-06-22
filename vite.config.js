import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({ 
  plugins: [
    react()
    
  ],
  //base: './', // added
  /*
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        format: 'esm',
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash]'
      }
    }

  },
  */
  }) 
