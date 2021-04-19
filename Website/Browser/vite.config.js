import { defineConfig } from 'vite'
export default defineConfig({
  server: { port: 80 },
  build: {
    rollupOptions: {
      external: []
    }
  },
})
