module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  devServer: {
    proxy: {
      [process.env.VUE_APP_API]: {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_API]: ''
        }
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};
