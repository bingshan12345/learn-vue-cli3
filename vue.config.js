//在这个文件中写上module.exports = {}，脚手架会将这里的配置和公共的配置进行合并。
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // '@':'./src'//这个我们不需要配置，因为cli3内部已经默认配置。  
                'assets': '@/assets',
                'commonjs': '@/commonjs',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views'
            }
        }
    },
    devServer: {
        hot: true,
        open: true,//是否自动弹出浏览器页面
        port: 8080,
        host: "localhost",
        proxy: {
            '/api': {
                // target: 'http://localhost:8080',
                target: 'http://123.207.32.32:8000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
/**
 * 在这里配置好之后，我们在其他地方写路径时，可以直接用，例如：
 * @import "assets/css/base.css"
 * 而不需要写成：
 * @import "./assets/css/base.css"
 *
 */
