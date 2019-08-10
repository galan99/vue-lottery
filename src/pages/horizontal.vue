<template>
  <div class="horizontal" :class="[gametype ? gametype : '']">
    <nav class="nav">
      <User :user="data.user_info" @popEmit="popclick" @coinEmit="coinEmit"></User>
    </nav>
    <section class="content">
      <div class="detail">
        <Log :logo="logoUrl"></Log>
        <Gift :giftlist="data.goods_list" @giftEmit="giftEmit"></Gift>
        <Main :coin="data.draw_need_coin">
          <wheel slot="wheel" :wheelopt="otps" @wheelOver="wheelOver" @noCoin="noCoinPop" @noBind="noBind" @getCoin="getCoin"></wheel>
          <Winner slot="winner" :list="data.draw_info_list"></Winner>
        </Main>
        <Rule :ruleUrl="data.actConfig"></Rule>
      </div>
    </section>
    <pop :popOpt="popOptions" @popUnbind="popUnbind" @popServer="popServer" @getServer="getServer" @popClose="popClose" @showServer="showServer" @clearTimer="clearTimer"></pop>
    <server-pop :serverOpt="serverOpt"/>
  </div>
</template>
<script>
import User from '@/components/common/User'
import Log from '@/components/common/Log'
import Gift from '@/components/common/Gift'
import Main from '@/components/common/Main'
import wheel from '@/components/wheel'
import Winner from '@/components/common/Winner'
import Rule from '@/components/common/Rule'
import pop from '@/components/popitem/index.vue'
import serverPop from '@/components/server/index.vue'
import mixins from '@/mixins'
import pagemixins from '@/mixins/page'
export default {
  components: {
    User,
    Gift,
    Winner,
    Log,
    Main,
    wheel,
    pop,
    Rule,
    serverPop
  },
  mixins: [mixins, pagemixins],
  data () {
    return {
      otps: {
        list: [], // 奖品列表
        moveUrl1: '//dl.gamdream.com/activity/jf/hyheng/move1.png', // 转盘大背景
        moveUrl2: '//dl.gamdream.com/activity/jf/hyheng/move2.png', // 转盘小背景
        startUrl: '//dl.gamdream.com/activity/jf/hyheng/start0.png', // 未转动的背景
        stopUrl: '//dl.gamdream.com/activity/jf/hyheng/start1.png', // 转动时背景
        index: -1 // 转到的位置
      }, // 转盘信息
      logoUrl: '//dl.gamdream.com/activity/jf/hyheng/log.png'
    }
  },
  created () {
    let devieWidth = Math.min(document.documentElement.clientWidth, 1332)
    let fonSize = devieWidth / 13.32
    document.documentElement.style.fontSize = `${fonSize}px`
    if (this.gametype === 'chuanqi') {
      this.gametype = 'chuanqi'
      this.logoUrl = '//dl.gamdream.com/activity/jf/cqheng/log.png'
      this.otps.moveUrl1 = '//dl.gamdream.com/activity/jf/cqheng/move1.png'
      this.otps.moveUrl2 = '//dl.gamdream.com/activity/jf/cqheng/move2.png'
      this.otps.startUrl = '//dl.gamdream.com/activity/jf/cqheng/start0.png'
      this.otps.stopUrl = '//dl.gamdream.com/activity/jf/cqheng/start1.png'
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.horizontal{
  display: flex;
  justify-content: flex-end;
  min-height:26.25rem;
  background: #000;
  padding-bottom:.3rem;
  overflow-x: hidden;
  .smico{
    &::before,&::after{
      position: absolute;
      content: '';
      width:.26rem;
      height:.8rem;
      background: url('@{url}hyshu/i.png') no-repeat;
      background-size: 100% auto;
      top:-.42rem;
    }
    &::before{
      left:.77rem;
    }
    &::after{
      right:.77rem;
    }
  }
  .nav{
    position: fixed;
    left:0;
    top:0;
    width:4rem;
    height: 100%;
    background: #b5621b;
  }
  /deep/ .user-floor{
    position: relative;
    z-index: 4;
    width:4rem;
    height: auto;
    background:none;
    .huser{
      text-align: center;
      font-size:.26rem;
      color:#fff;
      display: flex;
      height: auto;
      align-items: center;
      padding:.3rem 0 .5rem;
      .text{
        text-align: left;
      }
      .pic{
        width:.9rem;
        height: .9rem;
        margin: 0 .22rem 0 .3rem;
        border-radius:50%;
      }
      .name{
        padding:0;
        font-size:.3rem;
        margin-bottom: .1rem;
        max-width: 2.4rem;
      }
      .coin{
        font-size:.26rem;
      }
    }
    .btn{
      width:1.67rem;
      height:.57rem;
      background: url('@{url}hyheng/button.png') no-repeat;
      background-size: 100% auto;
      font-size:0;
      margin:0 auto .1rem;
    }
    .link{
      padding:0 0 0 .45rem;
      font-size:.3rem;
      color:#fff;
      display: flex;
      flex-flow: wrap;
      align-items: flex-end;
      height: 3rem;
      background: rgba(0, 0, 0, 0);
      p{
        height: .4rem;
        span{
          padding-left:.5rem;
          background: url('@{url}hyshu/head1.png') no-repeat left center;
          background-size: .35rem .35rem;
          text-decoration: underline;
        }
        &:nth-of-type(2) span{
          background-image: url('@{url}hyshu/head2.png');
        }
        &:nth-of-type(3) span{
          background-image: url('@{url}hyshu/head3.png');
        }
      }
    }
  }
  .content{
    flex:1;
    max-width: 9.32rem;
    position: relative;
    &::after{
      position: absolute;
      height:100%;
      width:9.32rem;
      content: '';
      right:0;
      top:0;
      background: url('@{url}/hyheng/bg.png') no-repeat;
      background-size: 100% auto;
    }
    .detail{
      position: relative;
      z-index: 5;
    }
  }
  /deep/ .logo-floor{
    text-align: center;
    padding:.52rem 0 .42rem;
    height: auto;
    img{
      width:5.6rem;
    }
  }
  /deep/ .gifts-floor{
    width:9.04rem;
    height:4.76rem;
    background: url('@{url}hyheng/gift.png') no-repeat;
    background-size: 100% auto;
    padding:1.24rem 1rem 0;
    margin:0 auto .1rem;
    .list{
      li{
        margin: 0 0.6rem;
      }
      .name{
        padding:.08rem 0 .1rem;
        color:#361A1D;
      }
      .btn{
        background-image: url('@{url}hyheng/dui1.png') no-repeat;
        &.no{
          background-image: url('@{url}hyheng/dui0.png');
        }
      }
    }
  }
  /deep/ .main-floor{
    width: 9.04rem;
    height: 13.33rem;
    background: url('@{url}hyheng/main.png') no-repeat;
    background-size: 100% auto;
    margin: 0 auto .1rem;
    padding-top:1.72rem;
    .coin-text{
      margin-top:0;
      background: none;
      line-height: 1;
      padding-top:.8rem;
      color:#5C2300;
      font-size:.28rem;
    }
  }
  /deep/ .luckwheel{
    width: 6.28rem;
    height: 6.28rem;
    .luck-after{
      width: 7.92rem;
      height: 8rem;
      left: -.93rem;
      margin: -4rem 0 0 0;
    }
    .rotate{
      width:6.28rem;
      height:6.28rem;
      margin: -3.14rem 0 0 -3.14rem;
    }
    .wheel-btn{
      width:1.55rem;
      height:1.81rem;
      top: 2.1rem;
      margin-left:0;
      transform: translateX(-50%);
    }
  }
  /deep/ .winner-floor{
    padding:.6rem .97rem 0 1.02rem;
  }
  /deep/ .rule-floor{
    width:9rem;
    background-image: url('@{url}rule/hyheng/t.png');
    padding-top:.94rem;
    .rule-foot{
      padding-bottom:.56rem;
      background-image: url('@{url}rule/hyheng/f.png');
    }
    .rule-middle{
      background-image: url('@{url}rule/hyheng/m.png');
    }
  }
  &.chuanqi{
    background: #300909;
    .smico{
      &::before,&::after{
        display: none;
      }
    }
    /deep/ .nav{
      background: #400000;
      .user-floor{
        .huser{
          color:#FFDDA6;
        }
        .btn{
          width: 2.28rem;
          height: .62rem;
          background-image: url('@{url}cqheng/btn.png');
        }
      }
      .link{
        color:#FFD590;
        p:nth-of-type(1) span {
          background-image: url('@{url}cqheng/head1.png');
        }
        p:nth-of-type(2) span {
          background-image: url('@{url}cqheng/head2.png');
        }
        p:nth-of-type(3) span {
          background-image: url('@{url}cqheng/head3.png');
        }
      }
    }
    .content{
      &::after{
        background-image: url('@{url}cqheng/bg.png');
      }
    }
    /deep/ .logo-floor{
      padding: .24rem 0;
      text-align: left;
      img{
        width: 5.48rem;
      }
    }
    /deep/ .gifts-floor{
      width:8.64rem;
      height:4.69rem;
      background-image: url('@{url}cqheng/gift.png');
      padding: 1.1rem 1rem 0;
      margin-bottom:.28rem;
      .list{
        color:#E3BB79;
        li{
          margin: 0 .46rem;
        }
        .pic{
          width:1.41rem;
          height:1.41rem;
        }
        .name{
          padding:.14rem 0 .26rem;
          color:#E3BB79;
        }
        .btn{
          width:1.48rem;
          height:.66rem;
          background-image: url('@{url}cqheng/dui1.png');
          &.no{
            background-image: url('@{url}cqheng/dui0.png');
          }
        }
      }
    }
    /deep/ .main-floor{
      width: 8.63rem;
      height: 13.49rem;
      background: url('@{url}cqheng/main.png') no-repeat;
      background-size: 100% auto;
      margin: 0 auto .48rem;
      padding-top:1.38rem;
      .coin-text{
        width:3.4rem;
        line-height: .62rem;
        background: #570C0D;
        padding-top:0;
        color:#E3BB79;
        margin-top:.55rem;
      }
    }
    /deep/ .luckwheel{
      width: 6.63rem;
      height: 6.63rem;
      .luck-after{
        width: 6.96rem;
        height: 6.98rem;
        left:50%;
        margin: -3.49rem 0 0 -3.48rem;
      }
      .rotate{
        width: 6.63rem;
        height: 6.63rem;
        margin: -3.31rem 0 0 -3.31rem;
      }
      .movebg{
        transform: rotate(0deg);
      }
      .wheel-btn{
        width:2.13rem;
        height:2.77rem;
        top: 1.6rem;
        margin-left:0;
        transform: translateX(-50%);
      }
    }
    /deep/ .winner-floor{
      width:6.93rem;
      height:3.18rem;
      padding:.27rem .7rem 0;
      box-align: border-box;
      background: rgba(151, 44, 44, .34);
      border-radius: .2rem;
      color: #E3BB79;
      margin: .62rem auto 0;
    }
    /deep/ .rule-floor{
      width: 8.63rem;
      background-image: url('@{url}rule/cqheng/t.png');
      padding-top:.82rem;
      .rule-foot{
        padding-bottom:.51rem;
        background-image: url('@{url}rule/cqheng/f.png');
      }
      .rule-middle{
        background-image: url('@{url}rule/cqheng/m.png');
      }
    }
  }
}
</style>
