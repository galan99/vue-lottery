<!--用户信息-->
<template>
  <div class="user-floor">
    <template v-if="user && router === 'h'">
      <div class="huser">
        <img class="pic" :src="user.avatar" alt=""/>
        <div class="text">
          <p class="name elli">{{user.nickname}}</p>
          <p class="coin">我的乐币：{{user.balance}}</p>
        </div>
      </div>
      <a class="btn" href="javascript:;" @click="handleSearch">查询乐币</a>
    </template>
    <div class="user" v-if="user && router !== 'h'">
        <img class="pic" :src="user.avatar" alt=""/>
        <div class="text">
          <p class="name elli">{{user.nickname}}</p>
          <p class="coin">我的乐币：{{user.balance}}</p>
        </div>
        <a class="btn" href="javascript:;" @click="handleSearch">查询乐币</a>
    </div>
    <div class="link" v-if="user">
      <p v-for="item in link" :key="item.type"><span @click="handleClick(item.type)">{{item.name}}</span></p>
    </div>
  </div>
</template>
<script>
import mixins from '@/mixins'
export default {
  props: ['user'],
  mixins: [mixins],
  data () {
    return {
      link: []
    }
  },
  created () {
    const text = this.router !== 'h' ? '>' : ''
    this.link = [
      {type: 'gift', name: `我的礼包${text}`},
      {type: 'bind', name: `绑定手机号${text}`},
      {type: 'binded', name: `已绑定手机号${text}`}
    ]
  },
  methods: {
    handleClick (type) {
      this.$emit('popEmit', type)
    },
    handleSearch () {
      this.$emit('coinEmit')
    }
  }
}
</script>
<style lang="less" scoped>
.user-floor{
  background: url('@{componentsurl}hyshu/head.png') no-repeat;
  background-size: 100% auto;
  height:2.32rem;
  overflow: hidden;
  .user{
    display: flex;
    height:1.6rem;
    position: relative;
    align-items: center;
    font-size:.3rem;
    color:#fff;
    .pic{
      width:.8rem;
      height:.8rem;
      border-radius:50%;
      margin:0 .18rem 0 .4rem;
    }
    .text{
      width:3.05rem;
    }
    .name{
      padding-right:.1rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .coin{
      font-size:.24rem;
    }
  }
  .user .btn, .btn{
    display: block;
    width:1.79rem;
    height:.71rem;
    background: url('@{componentsurl}hyshu/search.png') no-repeat;
    background-size: 100% auto;
    margin-right:.1rem;
    text-indent: -999em;
    overflow: hidden;
  }
  .link{
    display: flex;
    align-items: center;
    font-size:.26rem;
    color:#fff;
    padding:0 .4rem;
    line-height: .36rem;
    justify-content: space-between;
    span{
      padding-left:.38rem;
      background: url('@{componentsurl}hyshu/head1.png') no-repeat left center;
      background-size: .35rem .32rem;
      text-decoration: underline;
    }
    p{
      &:nth-of-type(2) span{
        background-image: url('@{componentsurl}hyshu/head2.png');
      }
      &:nth-of-type(3) span{
        background-image: url('@{componentsurl}hyshu/head3.png');
      }
    }
  }
}
</style>
