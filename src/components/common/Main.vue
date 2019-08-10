<!--竖版主要内容-->
<template>
  <div class="main-floor smico">
      <slot name="wheel"></slot>
      <p class="coin-text">每次消耗<span>{{coin}}</span>乐币</p>
      <slot name="winner"></slot>
  </div>
</template>
<script>
export default {
  props: ['coin']
}
</script>
<style lang="less">
.main-floor{
  width:6.92rem;
  height:13.25rem;
  background: url('@{componentsurl}hyshu/main.png') no-repeat;
  background-size: 100% auto;
  box-sizing: border-box;
  position: relative;
  padding-top:1.84rem;
  margin: 0 auto .2rem;
  .coin-text{
    color: #FFE79F;
    line-height: .72rem;
    background: #A17643;
    border-radius:.72rem;
    width:3.64rem;
    text-align: center;
    font-size:.28rem;
    margin: .9rem auto 0;
    span{
      padding:0 .05rem;
    }
  }
}
</style>
