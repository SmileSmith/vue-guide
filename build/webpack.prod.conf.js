/*
 * Webpack 生产环境配置文件，用于生产环境执行Build
 * 执行Build 主要是用Webpack执行这里的配置
 * 建议先查阅webapck.base.conf.js ../config/index.js
*/

var path = require('path')
var utils = require('./utils') // 下面是utils工具配置文件，主要用来处理css类文件的loader
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge') // 用merge的方式继承base.conf里面的配置
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin') // copy-webpack-plugin使用来复制文件或者文件夹到指定的目录的
var HtmlWebpackPlugin = require('html-webpack-plugin') // html-webpack-plugin是生成html文件，可以设置模板
var ExtractTextPlugin = require('extract-text-webpack-plugin') // extract-text-webpack-plugin这个插件是用来将bundle中的css等文件生成单独的文件，比如我们看到的app.css
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
//压缩css代码的，还能去掉extract-text-webpack-plugin插件抽离文件产生的重复代码，因为同一个css可能在多个模块中出现所以会导致重复代码，一般都是配合使用

// TODO SPA预渲染插件，目前没有app-shell，效果不佳
// var PrerenderSpaPlugin = require('prerender-spa-plugin') // SPA预渲染插件，更改index.html中的内容
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin') // Serviceworker插件，最终在dist目录下生成service-worker.js

// 如果当前环境变量NODE_ENV的值是testing，则导入 test.env.js配置文，设置env为"testing"
// 如果当前环境变量NODE_ENV的值不是testing，则设置env为"production"
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

// 把当前的配置对象和base.conf基础的配置对象合并
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    // 下面就是把utils配置好的处理各种css类型的配置拿过来，和dev设置一样，就是这里多了个extract: true，此项是自定义项，设置为true表示，生成独立的文件
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  // devtool开发工具，用来生成个sourcemap方便调试，只用于生产环境
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    // 和base.conf中一致，输出文件的路径：config目录下的index.js，path.resolve(__dirname, '../dist')
    path: config.build.assetsRoot,
    // 有区别，输出文件加上的chunkhash
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 非入扣文件配置，异步加载的模块，输出文件加上的chunkhash
    // ...默认的是chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')，这里改成name，但是模块间的依赖关系依然是通过某种ID依赖
    // ...name和id都可以达到效果
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env// line-21 下面是利用DefinePlugin插件，定义process.env环境变量为env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false // 禁止压缩时候的警告信息
      },
      sourceMap: true // 压缩后生成map文件
    }),
    // extract css into its own file，已经很清楚了就是独立css文件，文件名和hash
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
      ? 'index.html'
      : config.build.index,
      template: 'index.html', // 模板是index.html加不加无所谓
      inject: true, // 将js文件注入到body标签的结尾
      minify: {  // 压缩html页面
        removeComments: true, // 去掉注释
        collapseWhitespace: true, // 去除无用空格
        removeAttributeQuotes: true// 去除无用的双引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency' // 可以对页面中引用的chunk进行排序，保证页面的引用顺序
    }),
    // TODO SPA预渲染插件，目前没有app-shell，效果不佳
    /*     new PrerenderSpaPlugin(
      // Absolute path to compiled SPA
      path.join(__dirname, '../dist'),
      // List of routes to prerender
      [ '/' ],
      {
        // Instead of loudly failing on JS errors (the default), ignore them.
        ignoreJSErrors: true,
        // raise or lower this limit if you wish.
        maxAttempts: 10,
        // embeds), which are not ideal for SEO and may introduce JS errors.
        navigationLocked: true,
        // http://phantomjs.org/api/command-line.html#command-line-options
        phantomOptions: '--disk-cache=true',
        // http://phantomjs.org/api/webpage/property/settings.html
        phantomPageSettings: {
          loadImages: true
        },
        postProcessHtml: function (context) {
          var code = `
            <script>
            (function() {
                if('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/service-worker.js');
                }
              })();
            </script>
            `
          return context.html.replace(
            /<\/head>/i,
            code + '<\/head>'
          )
        }
      }
    ), */
    new SWPrecacheWebpackPlugin({
      cacheId: 'vue-docker',
      filename: 'service-worker.js',
      navigateFallback: 'http://localhost/index.html',
      mergeStaticsConfig: true,
      staticFileGlobsIgnorePatterns: [/\.map$/,/\.gz$/]
    }),
    // 为每个模块添加模块名，避免因为用ID引起依赖关系错乱
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      const chunkName = chunk.mapModules(m => {
        return path.relative(m.context, m.request);
      }).join("_");
      return chunkName;
    }),
    // reference：https://zhuanlan.zhihu.com/p/31456808
    // 模块依赖根据模块的hash匹配，而不是默认的模块ID
    new webpack.HashedModuleIdsPlugin(),
    // split vendor js into its own file
    // 公共模块插件，便于浏览器缓存，提高程序的运行速度（哪些需要打包进公共模块需要取舍）
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 公共模块的名称，对应打包出来的js是vendor.js
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        // 存在资源，且以js结尾，且路径在node_node_modules下的都打包进来（这里可以根据项目的时机情况做调整）
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // 把webpack的runtime代码和module manifest代码提取到manifest.js文件中，防止修改了代码但是没有修改第三方库文件导致第三方库文件也打包的问题
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    // 复制项目中的静态文件，忽略.开头的文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

// Gzip压缩插件
if (config.build.productionGzip) { // 修改config里面的配置才能开启
  var CompressionWebpackPlugin = require('compression-webpack-plugin')// Gzip插件

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

// 模块化分析插件
// 文档好像没有提档说明如何使用，看config/index.js中的注释，npm run build --report 可以看到，或者修改config里面的配置
if (config.build.bundleAnalyzerReport) { // 模块分析，会在127.0.0.1：8080生成模块打包分析结果
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig // 导出所有配置
