<!--转盘组件-->
<template>
  <div class="luckwheel">
    <div class="luck-after" v-if="wheelopt.moveUrl1" :style="{backgroundImage: 'url('+ wheelopt.moveUrl1 +')'}"></div>
    <div class="luck-main">
        <div
          class="rotate"
          :style="{WebkitTransform:'rotate('+ deg +'deg) translateZ(0)', transform: 'rotate('+ deg +'deg) translateZ(0)'}"
        >
          <img class="movebg" :src="wheelopt.moveUrl2"/>
          <ul class="wheel-list">
            <li v-for="(item, index) in wheelopt.list" :key="item.goods_id" :class="'myitem item'+ (index + 1)">
              <img :src="item.img" v-if="item.img" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div
        class="wheel-btn"
        @click="rotating"
        :style="{backgroundImage: 'url('+ btnUrl +')'}">
        立即抽奖
      </div>
  </div>
</template>

<script>
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function (fn) {
    setTimeout(fn, 17)
  }
}
export default {
  name: 'wheel',
  props: {
    wheelopt: {
      type: Object,
      default: function () {
        return {
          // list: [], // 奖品列表
          // moveUrl1: '', // 转盘大背景
          // moveUrl2: '', // 转盘小背景
          // startUrl: '', // 未转动的背景
          // stopUrl: '', // 转动时的背景
          // index: -1 // 转到的位置
        }
      }
    }
  },
  data () {
    return {
      btnUrl: '', // 按钮背景
      deg: 20, // 旋转角度
      areaNumber: 9, // 多少个奖品格子
      awardNumer: 5, // 中奖的位置
      singleAngle: 0, // 每片扇形的角度
      speed: 18, // 帧的速度
      isStart: true, // 转盘状态
      prize: {} // 奖品信息
    }
  },
  created () {
    let singleAngle = 360 / this.areaNumber
    this.singleAngle = singleAngle
    this.btnUrl = this.wheelopt.startUrl
  },
  methods: {
    move () {
      document.querySelector('body').style.pointerEvents = 'none'
      const This = this
      let { deg, awardNumer, singleAngle, speed } = this
      This.isStart = false
      This.btnUrl = This.wheelopt.stopUrl
      let endAddAngle = (awardNumer - 1) * singleAngle + singleAngle / 2 + 360 // 中奖角度
      let rangeAngle = (Math.floor(Math.random() * 2) + 4) * 360 // 随机旋转几圈再停止
      let cAngle
      deg = 0
      let animate = function () {
        if (deg < rangeAngle) {
          deg += speed
        } else {
          cAngle = (endAddAngle + rangeAngle - deg) / 38
          cAngle = cAngle > speed ? speed : cAngle < 1 ? 1 : cAngle
          deg += cAngle

          if (deg >= endAddAngle + rangeAngle) {
            deg = endAddAngle + rangeAngle
            This.btnUrl = This.wheelopt.startUrl
            window.sessionStorage.setItem('goods', JSON.stringify(This.prize))
            document.querySelector('body').style.pointerEvents = 'auto'
            This.$emit('wheelOver', This.prize)
            setTimeout(() => {
              This.isStart = true
            }, 2000)
            return
          }
        }

        This.deg = deg
        requestAnimationFrame(animate)
      }
      animate()
    },
    async rotating () {
      const {aid} = this.$route.query
      const This = this
      if (!This.isStart) return false
      if (!This.wheelopt.canStart) {
        if (!This.wheelopt.noBind) {
          This.$emit('noBind')
          return false
        }
        This.$emit('noCoin')
        return false
      }
      const res = await This.$ajax('post', `/jf/lottery`, {aid})
      if (res.error_code === 0) {
        This.$emit('getCoin')
        for (var i = 0; i < This.wheelopt.list.length; i++) {
          if (+This.wheelopt.list[i].goods_id === +res.data.goods_id) {
            This.awardNumer = i * 1 + 1
            This.prize = res.data
            This.move()
            break
          }
        }
        this.$sendData({type: 'buy', order: res.data.order_no, name: res.data.name, coin: This.$parent.coin})
      }
    }
  }
}
</script>
<style lang="less">
.luckwheel {
  width: 5.58rem;
  height: 5.58rem;
  position: relative;
  margin: 0 auto;
  background-size: 100% auto;
  background-repeat: no-repeat;
  transform-origin: 50% 50%;
  .luck-main {
    position: relative;
    z-index: 5;
    width: 100%;
    height: 100%;
  }
  .luck-after {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 7.13rem;
    height: 7.2rem;
    margin: -3.6rem 0 0 -3.65rem;
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
  .movebg{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    -webkit-transform:rotate(-30deg);
    transform:rotate(-30deg);
  }
  .wheel-list{
    position: relative;
    z-index: 4;
    width:100%;
    height:100%;
  }
  .rotate {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -2.79rem 0 0 -2.79rem;
    width: 5.58rem;
    height: 5.58rem;
    background-size: 100% auto;
    background-repeat: no-repeat;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    will-change: transform;
  }
  .wheel-btn {
    position: absolute;
    width: 1.39rem;
    height: 1.63rem;
    left: 50%;
    top: 2rem;
    margin-left: -0.7rem;
    background-size: 100% auto;
    background-repeat: no-repeat;
    z-index: 10;
    overflow: hidden;
    text-indent: -999em;
  }
  .myitem{
    position: absolute;
    z-index: 5;
    width:1.9rem;
    height:1.8rem;
    line-height: .5rem;
    font-size: .28rem;
    left:50%;
    margin-left:-.95rem;
    top:50%;
    margin-top:-.9rem;
    text-align: center;
    overflow: hidden;
    img{
      width:1.44rem;
      height:1.6rem;
    }
  }
  @deg:-40deg;
  .loop(@n) when (@n > 0) {
    .item@{n}{
        -webkit-transform: rotate(@deg*(@n - 1) - 20) translateY(-1.62rem);
        transform: rotate(@deg*(@n - 1) - 20) translateY(-1.62rem);
    }
    .loop((@n - 1));
  }
  .loop(9);
}
</style>
