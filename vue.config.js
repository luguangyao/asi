module.exports = {
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://127.0.0.1/admin',
        changeOrigin: true,
        pathRewrite: {
          '^/admin': ''
        }
      },
      '/orders': {
         target: 'http://127.0.0.1/orders',
         changeOrigin: true,
         pathRewrite: {
           '^/orders': ''
         }
       },
       '/plane': {
         target: 'http://127.0.0.1/plane',
         changeOrigin: true,
         pathRewrite: {
           '^/plane': ''
         }
       },
       '/user': {
        target: 'http://127.0.0.1/user',
        changeOrigin: true,
        pathRewrite: {
          '^/user': ''
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