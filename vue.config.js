const path = require('path')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,

  baseUrl:
    process.env.NODE_ENV === 'production' ? '/tp-script-management/' : '/',
  outputDir: 'dist/tp-script-management',

  devServer: {
    port: 8000,
    https: false,
    proxy: null
    // open: true,
  },

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '版本配置管理系统',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      inject: false
    }
  },

  transpileDependencies: ['vue-clamp', 'resize-detector'],

  productionSourceMap: false,

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))

    // 抽离js
    if (IS_PROD) {
      config.optimization.splitChunks({
        /*
         * chunks：可以配置控制webpack选择哪些代码块用于分割（注：其他类型代码块按默认方式打包）。有3个可选的值：initial、async和all
         * minSize(默认是30000)：形成一个新代码块最小的体积
         * minChunks（默认是1）：在分割之前，这个代码块最小应该被引用的次数（注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
         * maxInitialRequests（默认是3）：一个入口最大的并行请求数
         * maxAsyncRequests（默认是5）：按需加载时候最大的并行请求数
         */
        chunks: 'async',
        minSize: 30000,
        maxAsyncRequests: 100,
        maxInitialRequests: 100,
        name: true,
        cacheGroups: {}
      })
    }
  },

  configureWebpack: config => {
    const plugins = []
    if (IS_PROD) {
    }
    config.plugins = [...config.plugins, ...plugins]
  },

  pluginOptions: {}
}
