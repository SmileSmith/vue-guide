// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    // 相对路径的拼接，假如当前跟目录是config，那么下面配置的index属性的属性值就是dist/index.html
    index: path.resolve(__dirname, '../dist/index.html'),// index页面
    assetsRoot: path.resolve(__dirname, '../dist'), // 输出目录
    assetsSubDirectory: 'static', // 子目录
    assetsPublicPath: '/', // 发布地址，例如HTML中引用js的是以/开头
    productionSourceMap: false, // 是否开启sourcemap
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true, // 是否开启Gzip，以及包含哪些类型文件
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report // 当执行`npm run build --report`时生成构建报告
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    /**
     * 典型的方向代理配置
    proxyTable: {
      '/appName': {
          target: 'http://api.appName.com', -> 目标url地址
          changeOrigin: true, -> 指示是否跨域
          pathRewrite: {
          '^/appName': '替换内容' -> 让请求 /appName 等价于 api.appName.com/替换内容
          }
      }
    }   */
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
