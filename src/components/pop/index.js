import pop from './pop'
export default {
  install: function (Vue, options) {
    Vue.component(pop.name, pop)
  }
}
