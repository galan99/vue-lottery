// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Toast from '@/components/toast'
import {Ajax} from '@/utils/api'
import {copy} from '@/utils/copy'
import {sendData} from '@/utils/sendData'
import Pop from '@/components/pop'

if (process.env.NODE_ENV !== 'development' & 2=== 1) {
  const errorHandler = require('./utils/errorHandler')
  Vue.config.errorHandler = errorHandler
}
var EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

Vue.config.productionTip = false
Vue.prototype.$toast = Toast
Vue.prototype.$ajax = Ajax
Vue.prototype.$copy = copy
Vue.prototype.$sendData = sendData
Vue.use(Pop)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
