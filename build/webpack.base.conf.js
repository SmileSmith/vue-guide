/*
 * Webpack 基础配置文件，用于开发环境和生产环境
 * 在prod.conf 和 dev.conf都会用merge的方式引用这里的配置
*/

var path = require('path')
var utils = require('./utils') // css类的loader配置集。主要用来处理css-loader和vue-style-loader
var config = require('../config') // 项目自定义的配置文件
var vueLoaderConfig = require('./vue-loader.conf') // vue-loader.conf配置文件是用来解决各种css文件的

// 获取路径的函数，因为该文件在项目的二级目录build下，要找到src这样的二级目录，需要加上../
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    // 入口文件是src目录下的main.js
    app: './src/main.js'
  },
  output: {
    // 输出文件的路径：config目录下的index.js，path.resolve(__dirname, '../dist')
    path: config.build.assetsRoot,
    // 输出文件的名称：name是保持和entry入口的文件名一致
    filename: '[name].js',
    // 文件引用路径，例如index.html中引用vendor.js的src
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath // / 最后得到 /static/js/vendor.js
      : config.dev.assetsPublicPath // /  最后得到 /static/js/vendor.js
  },
  resolve: {
    // resolve是webpack的内置选项，顾名思义，决定要做的事情，如何处理 import 明明
    extensions: ['.js', '.vue', 'ts', '.json'],
    alias: {
      // 后面的$符号指精确匹配，也就是说只能使用 import vuejs from "vue" 这样的方式导入vue.esm.js文件，不能在后面跟上 vue/vue.js
      'vue$': 'vue/dist/vue.esm.js',
      // resolve('src') 其实在这里就是项目根目录中的src目录，使用 import somejs from "@/some.js"
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        // 正则表达式，需要执行规则的文件
        test: /\.(js|vue)$/,
        // 用eslint进行代码检查
        loader: 'eslint-loader',
        // 'pre'选项可以确保，eslint插件能够在编译之前检测，如果不添加此项，就要把这个配置项放到末尾，确保第一个执行
        enforce: 'pre',
        // include选项指明这些目录下的文件要被eslint-loader检测，还有exclude表示排除某些文件夹
        include: [resolve('src'), resolve('test')],
        options: {
          // formatter是参数的名称，eslint-friendly-formatter是eslint的一个报告总结插件，也就是说eslint的检测
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // 将vueLoaderConfig当做参数传递给vue-loader,就可以解析文件中的css相关文件
        options: vueLoaderConfig
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 限制 10000 个字节以下的图片才使用DataURL
          limit: 10000,
          // 输出图片的路径
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
