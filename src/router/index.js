import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

const Logo = resolve => require(['@/components/Logo'], resolve)
const Buy = resolve => require(['@/components/Buy'], resolve)
const Rule = resolve => require(['@/components/Rule'], resolve)
Vue.use(Router)
Vue.use(Resource)

export default new Router({
  routes: [
    {
      path: '/:type',
      name: 'Main',
      components: {
        default: Logo,
        buy: Buy,
        rule: Rule
      }
    },
    { path: '*', redirect: '/multiple7' }
  ]
})
