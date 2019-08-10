<!--弹窗组件-->
<template>
  <transition name="fade">
    <section class="zppop" v-bind:class="classObject" v-if="value" @click="close">
      <div class="zpcon" @click.stop="" :style="styles">
        <div class="close" @click.stop="close"></div>
        <h3 class="zptit"><span>{{title}}</span></h3>
        <slot></slot>
      </div>
    </section>
  </transition>
</template>

<script>
import mixins from '@/mixins'
export default {
  name: 'zppop',
  mixins: [mixins],
  props: {
    value: Boolean,
    title: String
  },
  model: {
    prop: 'value'
  },
  data () {
    return {
      classObject: {
        'popgame-chuanq': false,
        'popHeng': false
      },
      styles: {}
    }
  },
  created () {
    if (this.gametype === 'chuanqi') {
      this.classObject['popgame-chuanq'] = true
    }
    if (this.router === 'h') {
      this.classObject['popHeng'] = true
    }
  },
  mounted () {
    let maxwidth = document.documentElement.clientWidth || document.body.clientWidth
    let maxHeight = document.documentElement.clientHeight || document.body.clientHeight
    const scale = ((maxHeight / maxwidth) / (750 / 1332)).toFixed(2)
    if ((maxHeight / maxwidth < 0.52) && this.router === 'h') {
      this.styles = {transform: `scale(${scale})`, top: `.4rem`, 'transform-origin': 'top center'}
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang="less" scoped>
// 梦幻花园
.zppop{
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .75);
  color:#fff;
  display: flex;
  justify-content: center;
  .zpcon{
    width: 6.8rem;
    height: 6.17rem;
    background: url('@{componentsurl}pop/bg.png') no-repeat;
    background-size: 100% auto;
    position: relative;
    left:0;
    top:2.5rem;
    .close{
      width: .66rem;
      height: .66rem;
      background: url('@{componentsurl}pop/close.png') no-repeat;
      background-size: 100% auto;
      position: absolute;
      right: .34rem;
      top: .23rem;
    }
    .zptit{
      text-align: center;
      font-size:.38rem;
      padding-top:.3rem;
      line-height: .4rem;
      margin-bottom:.5rem;
    }
  }
  // 传奇
  &.popgame-chuanq{
    .zpcon{
      width: 7.33rem;
      height: 6.36rem;
      background: url('@{componentsurl}pop/bg2.png') no-repeat;
      background-size: 100% auto;
      .close{
        display: none;
      }
      .zptit{
        position: absolute;
        width: 2.84rem;
        height: .62rem;
        line-height: .62rem;
        text-align: center;
        font-size: .3rem;
        color: #fff;
        padding:0;
        margin:0;
        left:50%;
        transform: translateX(-50%);
        top:-.2rem;
        &::after{
          position: absolute;
          left:0;
          top:0;
          content:'';
          width:100%;
          height:100%;
          background: url('@{componentsurl}pop/tit.png') no-repeat;
          background-size: 100% auto;
        }
        span{
          position: relative;
          z-index: 2;
          color: rgba(255,139,25,1);
        }
      }
    }
  }

  // 横版
  &.popHeng {
    .zpcon {
      top: .5rem;
    }
  }
}
</style>
