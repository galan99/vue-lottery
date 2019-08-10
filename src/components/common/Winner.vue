<!--竖版获奖者-->
<template>
  <div class="winner-floor">
    <h3 class="tit">中奖名单</h3>
    <div class="scroll" v-if="winnerList.length">
      <ul class="list" :style="styleAnimation">
        <li v-for="(item, index) in winnerList" :key="index">
          <p>{{item.nickname}}</p>
          <span>{{item.note}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ['list'],
  data () {
    return {
      winnerList: [],
      styleAnimation: {} // 动态滚动获奖者的样式
    }
  },
  watch: {
    list: function (newVal) {
      const This = this
      this.winnerList = JSON.parse(JSON.stringify(this.list))
      if (this.winnerList.length > 4) {
        this.winnerList = this.winnerList.concat(this.winnerList)
        This.styleAnimation = {
          'animation-duration': parseInt(this.winnerList.length / 2.2) + 's',
          'webkit-animation-duration': parseInt(this.winnerList.length / 2.2) + 's'
        }
      } else {
        This.styleAnimation = {
          'animation': 'none',
          'webkit-animation': 'none'
        }
      }
    }
  },
  methods: {
    handleClick (idx) {
      console.log(idx)
    }
  }
}
</script>
<style lang="less" scoped>
.winner-floor{
  height:4.65rem;
  box-sizing: border-box;
  color:#FFDB6C;
  font-size:.26rem;
  padding:.6rem .7rem 0;
  .tit{
    font-size:.26rem;
    text-align: center;
    margin-bottom:.3rem;
  }
  .scroll{
    height:2rem;
    overflow: hidden;
  }
  .list{
    line-height: .5rem;
    -webkit-animation: scroll 5s linear 1.5s infinite forwards;
    animation: scroll 5s linear 1.5s infinite forwards;
    @-webkit-keyframes scroll {
      0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
      100% {
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
    @keyframes scroll {
      0% {
        transform: translateY(0);
        transform: translateY(0);
      }
      100% {
        transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
    li{
      display: flex;
      p{
        flex:1;
      }
    }
  }
}
</style>
