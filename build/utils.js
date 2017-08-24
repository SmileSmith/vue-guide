/*
 * npm run dev和 npm run build中可能用到的公共函数
 * 目前主要包括
 * 1、获取兼容的输出路径的函数
 * 2、cssLoader工厂函数
*/


var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 导出assetsPath函数，调试和构建时导出文件的路径都采用这种方式的路径
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  // path.join和path.posix.join的区别就是，后者以 posix 兼容的方式交互
  // 这里为什么用posix这样做跨平台的 posix 兼容，而读取内容的地方都没有用？？ 请大神指导
  return path.posix.join(assetsSubDirectory, _path)
}

// 导出最终读取和导入的loader，来处理对应类型的文件
exports.cssLoaders = function (options) {
  options = options || {}

  // 基础的css-loader配置
  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    // webpack中loader的执行是 右-->左，因此最后的css-loader先放在数组的第一位
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, { // Object.assign是es6的方法，主要用来合并对象的，浅拷贝
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    // 是否单独css是统一配置的，避免不同类型的css混乱
    // 所以这里不读取loaderOptions，而是取统一的option的extract配置
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(), // css对应 vue-style-loader, css-loader
    postcss: generateLoaders(), // postcss对应 vue-style-loader, css-loader
    less: generateLoaders('less'), // less对应 vue-style-loader, less-loader
    sass: generateLoaders('sass', { indentedSyntax: true }), // sass对应 vue-style-loader, sass-loader
    scss: generateLoaders('sass'), // scss对应 vue-style-loader, sass-loader
    stylus: generateLoaders('stylus'), // stylus对应 vue-style-loader, stylus-loader
    styl: generateLoaders('stylus') // styl对应 vue-style-loader, styl-loader
  }
}

// Generate loaders for standalone style files (outside of .vue)
// 处理import这种方式导入的文件类型的打包，上面的exports.cssLoaders为这一步服务
// 注意.VUE文件不用这个，用vue-loader.config中的配置
exports.styleLoaders = function (options) {
  var output = []
  // 生成的各种css文件的loader对象
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
