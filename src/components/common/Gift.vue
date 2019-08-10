<!--竖版道具-->
<template>
  <div class="gifts-floor">
    <ul class="list" v-if="giftlist">
      <li v-for="(item, index) in giftlist" :key="index">
        <div class="mt">
          <p class="coin">乐币:{{item.price}}</p>
          <img class="pic" :src="item.img" alt="">
          <p class="name elli">{{item.name}}</p>
        </div>
        <span class="btn" v-if="item.status == 1" @click="handleClick(item)"></span>
        <span class="btn no" v-else></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['giftlist'],
  methods: {
    handleClick (parms) {
      this.$emit('giftEmit', parms)
    }
  }
}
</script>
<style lang="less" scoped>
.gifts-floor{
  width:6.92rem;
  height:4.45rem;
  background: url('@{componentsurl}hyshu/gift.png') no-repeat;
  background-size: 100% auto;
  box-sizing: border-box;
  padding:1.14rem .71rem;
  margin:0 auto .2rem;
  .list{
    display: flex;
    justify-content: center;
    font-size:.28rem;
    color:#5C2300;
    line-height: 1;
    text-align: center;
    li{
      margin: 0 0.2rem;
      max-width:1.55rem;
    }
    .coin{
      margin-bottom:.08rem;
    }
    .pic{
      display: block;
      width: 1.51rem;
      height: 1.51rem;
      margin:0 auto;
    }
    .name{
      padding:.08rem 0;
      font-size:.24rem;
    }
    .btn{
      display: inline-block;
      width: 1.77rem;
      height: .67rem;
      background: url('@{componentsurl}hyshu/dui1.png') no-repeat;
      background-size: 100% auto;
      &.no{
        background-image: url('@{componentsurl}hyshu/dui2.png');
      }
    }
  }
}
</style>
