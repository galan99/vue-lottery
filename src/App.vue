<template>
  <div id="app">
    <router-view :key="key"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    key () {
      let key = ''
      if (this.$route.query.gametype) {
        key = this.$route.path.replace(/\//g, '_') + this.$route.query.gametype
      } else {
        key = this.$route.path.replace(/\//g, '_')
      }
      return key
    }
  }
}
</script>
<style lang="less">
@import 'assets/css/reset.less';
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.modal-open {
  position: fixed;
  width: 100%;
}
</style>
