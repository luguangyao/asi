module.exports = {
  devServer: {
    proxy: {
      '/data/admin': {
        target: 'http://127.0.0.1/admin',
        changeOrigin: true,
        pathRewrite: {
          '^/data/admin': ''
        }
      },
      '/data/orders': {
         target: 'http://127.0.0.1/order',
         changeOrigin: true,
         pathRewrite: {
           '^/data/orders': ''
         }
       },
       '/data/plane': {
         target: 'http://127.0.0.1/plane',
         changeOrigin: true,
         pathRewrite: {
           '^/data/plane': ''
         }
       },
       '/data/user': {
        target: 'http://127.0.0.1/user',
        changeOrigin: true,
        pathRewrite: {
          '^/data/user': ''
        }
      },
      '/data/location':{
        target:'http://pv.sohu.com/',
        changeOrigin:true,
        pathRewrite:{
          '^/data/location':''
        }
      },
    }
  }
}