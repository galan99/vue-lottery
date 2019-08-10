<template>
  <div class="page" :class="[gametype ? gametype : '']">
    <User :user="data.user_info" @popEmit="popclick" @coinEmit="coinEmit"></User>
    <Log :logo="logoUrl"></Log>
    <Gift :giftlist="data.goods_list" @giftEmit="giftEmit"></Gift>
    <Main :coin="data.draw_need_coin">
      <wheel slot="wheel" :wheelopt="otps" @wheelOver="wheelOver" @noCoin="noCoinPop" @noBind="noBind" @getCoin="getCoin"></wheel>
      <winner slot="winner" :list="data.draw_info_list"></winner>
    </Main>
    <Rule :ruleUrl="data.actConfig"></Rule>
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
import winner from '@/components/common/Winner'
import Rule from '@/components/common/Rule'
import pop from '@/components/popitem/index.vue'
import serverPop from '@/components/server/index.vue'
import mixins from '@/mixins'
import pagemixins from '@/mixins/page'
export default {
  components: {
    wheel,
    User,
    Log,
    Gift,
    Main,
    winner,
    Rule,
    pop,
    serverPop
  },
  mixins: [mixins, pagemixins],
  data () {
    return {
      otps: {
        list: [], // 奖品列表
        moveUrl1: '//dl.gamdream.com/activity/jf/hyshu/move1.png', // 转盘大背景
        moveUrl2: '//dl.gamdream.com/activity/jf/hyshu/move2.png', // 转盘小背景
        startUrl: '//dl.gamdream.com/activity/jf/hyshu/start0.png', // 未转动的背景
        stopUrl: '//dl.gamdream.com/activity/jf/hyshu/start1.png', // 转动时背景
        index: -1 // 转到的位置
      },
      logoUrl: '//dl.gamdream.com/activity/jf/hyshu/log.png'
    }
  },
  created () {
    let devieWidth = Math.min(document.documentElement.clientWidth, 750)
    let fonSize = devieWidth >= 420 ? 70 : devieWidth / 7.5
    document.documentElement.style.fontSize = `${fonSize}px`
    if (this.gametype === 'chuanqi') {
      this.gametype = 'chuanqi'
      this.logoUrl = '//dl.gamdream.com/activity/jf/cqshu/log.png'
      this.otps.moveUrl1 = '//dl.gamdream.com/activity/jf/cqshu/move1.png'
      this.otps.moveUrl2 = '//dl.gamdream.com/activity/jf/cqshu/move2.png'
      this.otps.startUrl = '//dl.gamdream.com/activity/jf/cqshu/start0.png'
      this.otps.stopUrl = '//dl.gamdream.com/activity/jf/cqshu/start1.png'
    }
  }
}
</script>
<style lang="less" scoped>
.page{
  background:#000 url('@{url}hyshu/bg.png') no-repeat center top;
  background-size: 100% auto;
  width:7.5rem;
  margin:0 auto;
  padding-bottom:1rem;
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
  // 传奇
  &.chuanqi{
    background:#300909 url('@{url}cqshu/bg.png') no-repeat center 2.26rem;
    background-size: 100% auto;
    .smico{
      &::before,&::after{
        display: none;
      }
    }
    /deep/ .user-floor{
      background:url('@{url}cqshu/head.png') no-repeat center top;
      background-size: 100% auto;
      height:2.34rem;
      .text{
        width:4.17rem;
      }
      .user,.link{
        color:#FFD590;
      }
      .coin{
        color:#CDA071;
      }
      .user{
        .pic{
          margin-left:.3rem;
          margin-right:.25rem;
        }
        .btn{
          width:1.68rem;
          height:.58rem;
          background-image: url('@{url}cqshu/btn.png');
        }
      }
      .link{
        p{
          &:nth-of-type(1) span{
            background-image: url('@{url}cqshu/head1.png');
          }
          &:nth-of-type(2) span{
            background-image: url('@{url}cqshu/head2.png');
          }
          &:nth-of-type(3) span{
            background-image: url('@{url}cqshu/head3.png');
          }
        }
      }
    }
    /deep/ .logo-floor{
      padding:0;
      padding-top:1.32rem;
      height: auto;
      margin-bottom:.07rem;
      img{
        width:5.85rem;
      }
    }
    /deep/ .gifts-floor{
      background: url('@{url}cqshu/gift.png') no-repeat;
      background-size: 100% auto;
      width:6.97rem;
      height:4.54rem;
      .list{
        color:#E3BB79;
        li{
          margin:0 .45rem;
        }
        .pic{
          padding-top:.1rem;
          width:1.41rem;
          height: 1.41rem;
        }
        .name{
          padding:.15rem 0 .2rem;
        }
        .btn{
          width:1.48rem;
          height:.66rem;
          background: url('@{url}cqshu/dui1.png') no-repeat;
          background-size: 100% auto;
          &.no{
            background-image: url('@{url}cqshu/dui2.png');
          }
        }
      }
    }
    /deep/ .main-floor{
      background: url('@{url}cqshu/main.png') no-repeat;
      background-size: 100% auto;
      padding-top:1.64rem;
      width:6.9rem;
      height: 13.01rem;
      box-sizing: border-box;
      .luck-after{
        width:6.53rem;
        height:6.55rem;
        margin: -3.26rem 0 0 -3.27rem;
      }
      .rotate{
        margin: -3.11rem 0 0 -3.11rem;
        width: 6.22rem;
        height: 6.22rem;
      }
      .movebg{
        transform: rotate(0deg);
      }
      .luckwheel{
        background-image: url('@{url}cqshu/move1.png');
      }
      .coin-text{
        background: #570C0D;
        color:#E3BB79;
      }
      .wheel-btn{
        width:2rem;
        height:2.6rem;
        top: 1.2rem;
        margin-left: -1rem;
      }
    }
    /deep/ .winner-floor{
      color:#E3BB79;
    }
    /deep/ .rule-floor{
      width:6.9rem;
      background-image: url('@{url}rule/cqshu/t.png');
      padding-top:.82rem;
      .rule-foot{
        padding-bottom:.28rem;
        background-image: url('@{url}rule/cqshu/f.png');
      }
      .rule-middle{
        background-image: url('@{url}rule/cqshu/m.png');
      }
    }
  }
}
</style>
