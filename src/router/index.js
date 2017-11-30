import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

/* const Logo = resolve => require(['@/components/Logo'], resolve)
const Buy = resolve => require(['@/components/Buy'], resolve)
const Rule = resolve => require(['@/components/Rule'], resolve) */

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  routes: [
    {
      path: '/:type',
      name: 'Main',
      components: {
        // 因为采用异步方式另外打包成文件，采用类似promise的写法
        // ... 因为在webpack中配置了NamedChunksPlugin，Vue解析的模块不能正确拼接模块名。需要手动制定模块名
        default: () => import(/* webpackChunkName: "logo" */'@/components/Logo'),
        buy: () => import(/* webpackChunkName: "buy" */'@/components/Buy'),
        rule: () => import(/* webpackChunkName: "rule" */'@/components/Rule')
      }
    },
    { path: '*', redirect: '/multiple7' }
  ]
})
