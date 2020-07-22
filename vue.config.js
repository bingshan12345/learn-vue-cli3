module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'assets':'@/assets',
        'commonjs':'@/commonjs',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
}