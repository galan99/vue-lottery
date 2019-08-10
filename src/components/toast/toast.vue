<template>
  <transition name="fade">
    <div class="cmTips" v-show="show">
      <p>{{message}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'toast',
  data () {
    return {
      show: false,
      message: ''
    }
  }
}
</script>
<style scoped lang="less">
.cmTips {
  position: fixed;
  left: 0;
  top:0;
  width: 100%;
  height:100%;
  z-index: 99999;
}
.cmTips p {
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  top: 2rem;
  border-radius: .1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  background: rgba(0, 0, 0, 0.8);
  font-size: .28rem;
  padding: .25rem .2rem;
  min-width:4rem;
  max-width:6.8rem;
  color:#fff;
  line-height: .32rem;
  text-align: center;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
