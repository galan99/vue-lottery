<!--游戏区服弹窗-->
<template>
  <transition name="fade">
    <section class="server-box" @click="close" v-if="show">
      <div class="main" @click.stop="">
        <form class="search" @submit.stop.prevent="submit">
          <div class="ins">
            <input type="text" v-model="value" name="" placeholder="搜索" @blur="wxBug">
          </div>
        </form>
        <div class="con">
          <div class="list">
            <h3 class="tit">{{serverOpt.type === 'server' ? '全部区服' : '全部角色'}}</h3>
            <VirtualList :size="40" :remain="showList" v-if="serverOpt.type === 'server'" class="list" id="virtual">
                <div class="item" @click="click(item)" v-for="item in list" :key="item.server_name">{{item.server_name}}</div>
            </VirtualList>
            <ul v-if="serverOpt.type !== 'server'" class="list" >
              <li @click="click(item)" v-for="item in list" :key="item.role_name">{{item.role_name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import VirtualList from '@/components/vue-virtual-scroll-list'
import mixins from '@/mixins'
export default {
  props: ['serverOpt'],
  components: {
    VirtualList
  },
  data () {
    return {
      show: false,
      list: [],
      value: '',
      showList: 8
    }
  },
  mixins: [mixins],
  watch: {
    serverOpt: {
      deep: true,
      handler: function (val, oldval) {
        if (val.type) {
          if (val.type === 'server') {
            this.getServer()
          } else {
            this.getRole(val)
          }
        } else {
          this.show = false
          this.value = ''
        }
      }
    },
    value (val) {
      if (this.serverOpt.type === 'server') {
        const list = JSON.parse(sessionStorage.getItem('serverList'))
        const $dom = document.querySelector('#virtual')
        $dom.scrollTop = 0
        if (val) {
          this.list = JSON.parse(JSON.stringify(list)).filter((key) => {
            return key.server_name.indexOf(val) > -1
          })
        } else {
          this.list = JSON.parse(JSON.stringify(list))
        }
      }
    }
  },
  created () {
    if (this.router === 'index') {
      this.showList = 16
    }
  },
  methods: {
    wxBug (obj) {
      window.scrollTo(0, document.body.scrollTop || 0)
    },
    // 获取区服列表
    async getServer () {
      let serverList = window.sessionStorage.getItem('serverList')
      if (serverList === 'undefined' || !serverList) {
        const {aid} = this.$route.query
        const res = await this.$ajax('post', `/jf/server-list`, {aid})
        if (res.error_code === 0) {
          this.list = res.data.all
          window.sessionStorage.setItem('serverList', JSON.stringify(res.data.all))
          this.show = true
        }
      } else {
        this.list = JSON.parse(serverList)
        this.show = true
      }
    },
    // 获取角色列表
    async getRole (val) {
      const {aid} = this.$route.query
      const res = await this.$ajax('post', `/jf/role-list`, {aid, server_id: val.id})
      if (res.error_code === 0) {
        this.list = res.data
        this.show = true
      }
    },
    noscroll () {
      let scrollTop
      let $element = document.scrollingElement || document.body
      return {
        open: function () {
          scrollTop = $element.scrollTop
          document.body.classList.add('modal-open')
          document.body.style.top = -scrollTop + 'px'
        },
        close: function () {
          document.body.classList.remove('modal-open')
          $element.scrollTop = scrollTop
        }
      }
    },
    close () {
      this.show = false
      this.serverOpt.type = false
    },
    async submit () {
      if (this.value && this.serverOpt.type !== 'server') {
        const {aid} = this.$route.query
        const res = await this.$ajax('post', `/jf/game-role-list-by-name`, {aid, server_id: this.serverOpt.id, role_name: this.value})
        if (res.error_code === 0) {
          this.list = res.data
        }
      }
    },
    click (parms) {
      this.$bus.$emit('updateServer', Object.assign({}, parms, {type: this.serverOpt.type}))
      this.show = false
      this.serverOpt.type = false
    }
  }
}
</script>
<style lang="less" scoped>
.server-box{
  position: fixed;
  z-index: 120;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .75);
  color:#fff;
  display: flex;
  justify-content: center;
  .main{
    width:7rem;
    background: #fff;
    margin:.5rem 0;
    color: #1A1A1A;
    font-size:.3rem;
  }
  .search{
    background: #F5F5F5;
    height: .88rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .ins{
      position: relative;
      width:6.28rem;
      height:.64rem;
      border:1px solid rgba(233, 233, 233, 1);
      border-radius: .08rem;
      &::after{
        position: absolute;
        width: .25rem;
        height: .25rem;
        content: '';
        left: .26rem;
        top: .2rem;
        background: url('@{componentsurl}game/search.png') no-repeat;
        background-size: 100% auto;
      }
      input{
        font-size:.3rem;
        width:100%;
        height:100%;
        background: #fff;
        border-radius: .08rem;
        padding-left: .66rem;
        box-sizing: border-box;
      }
    }
  }
  .con{
    overflow: auto;
    height: calc(100% - .88rem);
    -webkit-overflow-scrolling: touch;
  }
  .tit{
    font-size:.28rem;
    color:#9A9A9A;
    background: #F1F1F1;
    line-height: .64rem;
    padding-left:.64rem;
    position: relative;
    &::after{
      position: absolute;
      width: .08rem;
      height: .27rem;
      content: '';
      left: .4rem;
      top: .18rem;
      background: url('@{componentsurl}game/ico1.png') no-repeat;
      background-size: 100% auto;
    }
  }
  li,.item{
    line-height: .8rem;
    height:.8rem;
    margin:0 .4rem;
    border-bottom:1px solid #DBDBDB;
    position: relative;
    &::after{
      position: absolute;
      width: .17rem;
      height: .3rem;
      content: '';
      right: .1rem;
      top: 50%;
      margin-top:-.15rem;
      background: url('@{componentsurl}game/ico2.png') no-repeat;
      background-size: 100% auto;
    }
  }
  .history li{
    border:none;
  }
}
</style>
