import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        'lib': 'src/index.ts',
        'styles/mk-style': 'src/styles/index.ts'
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
})
