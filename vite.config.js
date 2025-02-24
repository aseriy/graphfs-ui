import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

module.exports = defineConfig({
  plugins: [vue()],
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
      "/^apis/": {
        target: 'http://127.0.0.1:9000',
        changeOrigin: true,
        secure: false,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0"
        }
      }
    }
  }

  // devServer: {
  //   proxy: {
  //     '^/apis/': {
  //       target: 'http://127.0.0.1:9000',
  //       changeOrigin: true
  //     }
  //   }
  // },

});
