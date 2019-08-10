<!--竖版log-->
<template>
  <div class="logo-floor">
    <img :src="logo" alt="">
  </div>
</template>
<script>
export default {
  props: ['logo']
}
</script>
<style lang="less" scoped>
.logo-floor{
  box-sizing: border-box;
  padding-top:2.16rem;
  height:3.28rem;
  text-align: center;
  img{
    width:4.57rem;
  }
}
</style>
