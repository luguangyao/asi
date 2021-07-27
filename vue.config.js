module.exports = {
  devServer: {
    proxy: {
      '/loginnet': {
       //  target: 'http://139.159.153.12',
        target: 'http://139.159.153.12',
        changeOrigin: true,
        pathRewrite: {
          '^/loginnet': ''
        }
      }
    }
  }
}