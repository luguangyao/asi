module.exports = {
  devServer: {
    proxy: {
      '/loginnet': {
       //  target: 'http://139.159.153.12',
        target: 'http://127.0.0.1',
        changeOrigin: true,
        pathRewrite: {
          '^/loginnet': ''
        }
      },
      '/location':{
        target:'http://pv.sohu.com/',
        changeOrigin:true,
        pathRewrite:{
          '^/location':''
        }
      },
    }
  }
}