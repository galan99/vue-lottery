import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [{
    path: '/index',
    component: resolve => require(['../pages/vertical.vue'], resolve)
  }, {
    path: '/h',
    component: resolve => require(['../pages/horizontal.vue'], resolve)
  }, {
    path: '/',
    redirect: '/index'
  }]
})

export default router
