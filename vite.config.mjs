import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        blog: resolve(__dirname, 'blog.html'),
        blog1: resolve(__dirname+'blog/', '202507021222.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: './src/html', // путь к частям шаблонов
    }),
  ],
});