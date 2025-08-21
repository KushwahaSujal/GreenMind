const { defineConfig } = require('vite')

module.exports = defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    cors: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined
      }
    }
  }
})
