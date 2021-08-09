module.exports = {
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
      '/orders': {
         target: 'http://127.0.0.1',
         changeOrigin: true,
         pathRewrite: {
           '^/orders': '/orders'
         }
       },
       '/plane': {
         target: 'http://127.0.0.1',
         changeOrigin: true,
         pathRewrite: {
           '^/plane': '/plane'
         }
       },
       '/user': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        pathRewrite: {
          '^/user': '/user'
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
  },
  
}