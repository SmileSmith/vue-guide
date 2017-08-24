/*
 * Webpack 开发环境配置文件，用于开发环境构建dev-server发布的内容
 * 执行npm run dev主要会用到这里Webpack配置
 * 建议先查阅webapck.base.conf.js ../config/index.js
*/

var utils = require('./utils') // 下面是utils工具配置文件，主要用来处理css类文件的loader
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge') // 用merge的方式继承base.conf里面的配置
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin') // 生产环境也使用此插件，html-webpack-plugin是生成html文件，可以设置模板
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 下面这个插件是用来把webpack的错误和日志收集起来，漂亮的展示给用户

// add hot-reload related code to entry chunks
// 为基础设置的入口app，默认值是src/main.js关联热加载
// 例如：baseWebpackConfig.entry.app = ["./build/dev-client", "./src/main.js"]
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 把当前的配置对象和base.conf基础的配置对象合并
module.exports = merge(baseWebpackConfig, {
  module: {
    // 下面是把utils配置中的处理css类似文件的处理方法拿过来，并且不生成cssMap文件
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // devtool是开发工具选项，用来指定如何生成sourcemap文件，cheap-module-eval-source-map此款soucemap文件性价比最高
  // 生产环境：#source-map
  // 开发环境：#cheap-module-eval-source-map  编译消耗小
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // DefinePlugin内置webpack插件，专门用来定义全局变量的，下面定义一个全局变量 process.env 并且值是如下
    new webpack.DefinePlugin({
      'process.env': config.dev.env // { NODE_ENV: '"development"' }
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // 当你的程序在运行时，而你现在要替换、添加或删除某个模块，又不想重新加载页面，
    // 这个插件帮助你实现无刷新加载，关于内部实现原理
    new webpack.HotModuleReplacementPlugin(),
    // 当webpack编译错误的时候，来中断打包进程，防止错误代码打包到文件中，你还不知道
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({ // 和生产环境的配置略有区别，不需要minify
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // 使用FriendlyErrorsPlugin插件，其他细节还设置在dev-server-js文件中
    new FriendlyErrorsPlugin()
  ]
})
