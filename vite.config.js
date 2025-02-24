import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgr from "vite-plugin-svgr";
import svgSprite from 'vite-plugin-svg-sprite';

module.exports = defineConfig({
  plugins: [
    vue(),
    svgr(),
    svgSprite({
      symbolId: 'icon-[name]', // Generates IDs like "icon-home"
      include: 'images/*.svg', // Where your SVGs are stored
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  server: {
    port: 5173,  // Change to your preferred port
    strictPort: true,  // Ensures Vite doesn't switch ports automatically
    open: false,  // Opens the browser on start
    proxy: {
      "^/apis/": {
        target: 'http://127.0.0.1:9000',
        changeOrigin: true,
        secure: false
      }
    }
  }

});
