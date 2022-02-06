const path = require('path')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir:"docs",
    devServer: {
        port: 8090,
        open: true,
        host: "0.0.0.0",
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASE_URL,
                ws: true,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    configureWebpack:{
      resolve: {
        alias: {
          '@': path.join(__dirname,'src')
        }
      }
    }
};
