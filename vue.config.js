module.exports = {
  devServer: {
    proxy: {
      '/data/admin': {
       //  target: 'http://139.159.153.12',
        target: 'http://127.0.0.1/admin',
        changeOrigin: true,
        pathRewrite: {
          '^/data/admin': ''
        }
      },
      '/data/order': {
        //  target: 'http://139.159.153.12',
         target: 'http://127.0.0.1/order',
         changeOrigin: true,
         pathRewrite: {
           '^/data/order': ''
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