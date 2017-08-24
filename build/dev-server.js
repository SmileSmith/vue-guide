/*
 * npm run dev 调试执行文件，主要用于开发环境
 * 建议先查阅webapck.dev.conf.js  ../config/index.js
*/

// npm和node版本检查
require('./check-versions')()

var config = require('../config')
// 下面表示如果如果没有定义全局变量NODE_ENV，则将NODE_ENV设置为"development"
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn') // opn插件是用来打开特定终端的，此文件用来在默认浏览器中打开链接 opn(url)
var path = require('path')
var express = require('express') // nodejs开发框架express，用来简化操作，可以当做一个功能强大的http-server
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware') // http中间代理插件，此插件是用来代理请求的只能用于开发环境，目的主要是解决跨域请求后台api
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
// 下面是express监听的端口号，因为没有设置process.env.PORT，所以下面监听的就是config.dev.port即8080
// 需要自定义设置端口号，可以修改根目录下的package.json中的dev脚本，加上 set PORT=端口号&&
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
// 默认打开浏览器，!!强制转成Boolean值，防止后续用到这个变量的地方可能出问题
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 配置反向代理的配置数据
var proxyTable = config.dev.proxyTable

// 创建express实例
var app = express()
// ※※※ Use express.Router to mock api by SmileSmith ※※※
// ※※※ 用express的router方法来mock发布一些资源 ※※※
var mockRoutes = express.Router()
mockRoutes.post('/getCurrentPeroid', function (req, res) {
  res.json({
    errno: 0 ,
    data: require('../mock/data.currentperoid.json')
  });
})
app.use('/api', mockRoutes) //api开头的请求用mock数据返回

// 把配置参数传递到webpack方法中，返回一个编译对象，这个编译对象上面有很多属性，建议看webpack官方文档
// 这里主要是用到里面的状态函数 如compilation，compile，after-emit这类的
var compiler = webpack(webpackConfig)

// 下面是webpack-dev-middleware和webpack-hot-middleware两兄弟，这两个是黄金组合
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath, // 以webpack编译后的内容处理发布地址（/）的请求
  quiet: true // 使用friendly-errors-webpack-plugin插件这个必须设置为true，具体看wepback-dev-config.js
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) { // webpack任何插件都可以使用这种方式，里面可以传递钩子函数，用来在插件各个阶段做特殊处理，钩子函数种类很多
    hotMiddleware.publish({ action: 'reload' }) // 当插件html-webpack-plugin产出完成之后，强制刷新浏览器
    cb()
  })
})

// proxy api requests
// 下面是代理表的处理方法，请关注../config/index.js中开发环境proxyTab中的配置
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 使用H5的history来做返回，而不是浏览器url
// 用来解决单页面应用，点击刷新按钮和通过其他search值定位页面的404错误
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 让express用上webpack输出的模块中间件
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// 让express用上webpack输出的热加载中间件
app.use(hotMiddleware)

// serve pure static assets
// 让express用上webpack输出在static中的静态文件
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port // 这个port上面提到，默认8080

//定义一个Promise用于返回，定义一个_resolve用于编译完成时的回调里面调用
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
// 等待模块编译完成就可以打开浏览器
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve() // readyPromise就可以返回resolve
})

// node.js监听端口
var server = app.listen(port)

module.exports = {
  ready: readyPromise, // （其它人）调用ready()，就能拿到一个promise对象
  close: () => {
    server.close()
  }
}
