const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      '^/apis/': {
        target: 'http://localhost:9000',
        changeOrigin: true
      }
    }
  }
}
