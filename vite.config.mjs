import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        blog01: resolve(__dirname, 'blog.html'),
        blog02: resolve(__dirname+'blog/', '202507021222.html'),
        blog03: resolve(__dirname+'blog/', '202506030937.html'),
        blog04: resolve(__dirname+'blog/', '202506271422.html'),
        blog05: resolve(__dirname+'blog/', '202506231717.html'),
        blog06: resolve(__dirname+'blog/', '202506200645.html'),
        blog07: resolve(__dirname+'blog/', '202506181535.html'),
        blog08: resolve(__dirname+'blog/', '202506161208.html'),
        blog09: resolve(__dirname+'blog/', '202506130711.html'),
        blog10: resolve(__dirname+'blog/', '202506111829.html'),
        blog11: resolve(__dirname+'blog/', '202506090617.html'),
        blog12: resolve(__dirname+'blog/', '202506051936.html'),
        blog13: resolve(__dirname+'blog/', '202506031412.html'),
        blog14: resolve(__dirname+'blog/', '202505311111.html'),
        blog15: resolve(__dirname+'blog/', '202505292056.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: './src/html', // путь к частям шаблонов
    }),
  ],
});