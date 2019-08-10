import Vue from 'vue'
import ToastConfig from './toast.vue'
const ToastVue = Vue.extend(ToastConfig)
let timer = null
let instance = null

let Toast = (text) => {
  if (!text) return
  if (timer) {
    clearTimeout(timer)
    instance.show = false
  }
  if (!instance) {
    instance = new ToastVue({
      el: document.createElement('div')
    })
    document.body.appendChild(instance.$el)
  }
  Vue.nextTick(() => {
    instance.show = true
    instance.message = text
  })
  timer = setTimeout(() => {
    instance.show = false
  }, 2000)
}

export default Toast
