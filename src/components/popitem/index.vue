<!--弹窗组件集合-->
<template>
  <div class="pop-components">
    <!--弹窗-兑换成功-->
    <zppop
      v-model="popOpt.value"
      v-if="popOpt.type === 'open'"
      :title="popOpt.title"
      class="pop-sucess">
      <!--花园-->
      <template v-if="gametype === ''">
        <div class="zpcontext">
          <img class="pic" :src="popOpt.json.img" alt=""/>
          <h3 class="name">{{popOpt.json.name}}</h3>
          <div class="code-box">
            兑换码<p class="code">{{popOpt.json.goods_code}}</p>
          </div>
          <p class="tip">长按也可以复制兑换码</p>
        </div>
        <div class="copy zpbtn" @click="copy(popOpt.json.goods_code)">复制兑换码</div>
      </template>
      <!--传奇-->
      <template v-if="gametype === 'chuanqi'">
        <div class="zpcontext">
          <img class="pic" :src="popOpt.json.img" alt=""/>
          <h3 class="name">{{popOpt.json.name}}</h3>
          <p class="tip">请在游戏中，查看邮件领取礼包</p>
        </div>
        <div class="zpbtn" @click="popClose">确定</div>
      </template>
    </zppop>
    <!--弹窗-我的礼包-->
    <zppop
      v-model="popOpt.value"
      v-if="popOpt.type === 'gift'"
      :title="'我的礼包'"
      class="pop-gifts">
      <div class="zpcontext">
        <ul class="list" v-if="popOpt.arr.length">
          <li v-for="item in popOpt.arr" :key="item.order_no">
            <div class="mt">
              <img class="pic" :src="item.img" alt=""/>
              <div class="text">
                <p class="name">{{item.name}}</p>
                <span>兑换时间: {{item.time}}</span>
              </div>
            </div>
            <!--花园-->
            <div class="mc" v-if="item.is_popup == 0">
              兑换码<p>{{item.goods_code}}<span class="copy" @click="copy(item.goods_code)">复制</span></p>
            </div>
            <!--传奇-->
            <div class="mc" v-else>
              <template v-if="item.is_need_popup == 1">
                <em class="elli">游戏区服：{{item.server_name}}</em>
                <em class="elli">游戏角色：{{item.role_name}}</em>
              </template>
              <template v-else>
                <div class="wait">礼包待领取中<span class="openPop" @click="openServer(item)">领取</span></div>
              </template>
            </div>
          </li>
        </ul>
        <p class="no" v-else>暂无记录</p>
      </div>
    </zppop>
    <!--弹窗-绑定手机号-->
    <zppop
      v-model="popOpt.value"
      v-if="popOpt.type === 'bind'"
      :title="'绑定手机号'"
      class="pop-login pop-bind">
      <div class="zpcontext">
        <div class="ins-box">
          <template v-if="gametype === ''">
            <div class="ins-item">
              <input type="text" placeholder="请输入手机号码" v-model="mobile" oninput="if(value.length>11) value=value.slice(0,11)" @blur="wxBug">
            </div>
            <div class="ins-item">
              <input type="text" placeholder="请输入验证码" v-model="captcha" @blur="wxBug">
              <div class="code" v-if="!showTime" @click="getCode">获取验证码</div>
              <div class="code wait" v-else>{{time}}秒</div>
            </div>
          </template>
          <template v-if="gametype === 'chuanqi'">
            <div class="item">
              <span class="label">手机号码</span>
              <div class="ins">
                <input type="text" v-model="mobile" oninput="if(value.length>11) value=value.slice(0,11)" @blur="wxBug"/>
              </div>
            </div>
            <div class="item">
              <span class="label">验证码</span>
              <div class="ins">
                <input type="text" v-model="captcha" @blur="wxBug"/>
                <div class="code" v-if="!showTime" @click="getCode">获取验证码</div>
                <div class="code wait" v-else>{{time}}秒</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="copy zpbtn" @click="bindSubmit">确定</div>
    </zppop>
    <!--弹窗-已绑定-->
    <zppop
      v-model="popOpt.value"
      v-if="popOpt.type === 'binded'"
      :title="'已绑定手机号'"
      class="pop-binded">
      <div class="zpcontext">
        <div class="mt">
          <p>手机号码</p>
          <span>操作</span>
        </div>
        <ul class="mc" v-if="popOpt.arr && popOpt.arr.length">
          <li v-for="item in popOpt.arr" :key="item.id">
            <p>{{item.mobile}}</p>
            <span @click="unbind(item.id)">解绑</span>
          </li>
        </ul>
        <p v-else>暂无记录</p>
      </div>
    </zppop>
    <!--弹窗-区服选择-->
    <zppop
      v-model="popOpt.value"
      v-if="popOpt.type === 'server'"
      :title="popOpt.title"
      class="pop-server">
      <div class="zpcontext">
        <img class="pic" v-if="popOpt.json.img" :src="popOpt.json.img" alt=""/>
        <h3 class="name" v-if="popOpt.json.name">{{popOpt.json.name}}</h3>
        <div class="player-box">
          <div class="item">
            <span>游戏区服</span>
            <div class="ins" @click="showServer('server')">
              <p class="text">{{server_name}}</p>
              <i></i>
            </div>
          </div>
          <div class="item">
            <span>游戏角色</span>
            <div class="ins" @click="showServer('role')">
              <p class="text">{{role_name}}</p>
              <i></i>
            </div>
          </div>
        </div>
        <div class="zpbtn" @click="exchange">领取</div>
      </div>
    </zppop>
    <!--弹窗-提示消息-->
    <zppop
      v-model="popOpt.value"
      v-if="popOpt.type === 'tip'"
      :title="popOpt.title"
      class="pop-tip">
      <div class="zpcontext">
        <!--普通提示-->
        <template v-if="popOpt.btn === 'tip'">
          <div class="tip-text">{{popOpt.tip}}</div>
          <div class="zpbtn" @click="popClose">确定</div>
        </template>
        <!--兑换发送短信-->
        <template v-if="popOpt.btn === 'message'">
          <div class="tip-text tipwrap" v-html="popOpt.tip"></div>
          <a class="zpbtn" :href="popOpt.content" @click="tipSend">获取乐币</a>
        </template>
        <!--兑换等待-->
        <template v-if="popOpt.btn === 'look'">
          <div class="tip-text tipwrap" v-html="popOpt.tip"></div>
          <div class="btn-box">
            <div class="zpbtn" @click="tipHelp">查看帮助</div>
            <div class="zpbtn" @click="tipOver">我已回复</div>
          </div>
        </template>
        <!--兑换帮助-->
        <template v-if="popOpt.btn === 'help'">
          <div class="tip-text tip-help">
            <img class="pic" v-if="popOpt.smsImg" :src="popOpt.smsImg" alt="">
          </div>
          <div class="zpbtn" @click="popClose">确定</div>
        </template>
        <!--兑换完成-->
        <template v-if="popOpt.btn === 'over'">
          <div class="tip-text tip-over">
            <h3 class="t">恭喜你已经完成所有兑换流程</h3>
            <p class="p">请耐心等待5~10分钟，建议你可以回到游戏玩一段时间后，再回到页面刷新领取乐币，兑换你想的奖励！</p>
          </div>
          <div class="zpbtn" @click="popClose">确定</div>
        </template>
      </div>
    </zppop>
  </div>
</template>
<script>
import mixins from '@/mixins'
const serverText = '请选择区服'
const roleText = '请选择角色'
export default {
  props: {
    popOpt: Object
  },
  data () {
    return {
      mobile: '',
      captcha: '',
      time: 60,
      showTime: false,
      timer: null,
      server_name: serverText,
      role_name: roleText,
      server_check: '',
      serverSub: {} // 缓存选中角色信息
    }
  },
  mixins: [mixins],
  watch: {
    popOpt: {
      deep: true,
      handler: function (val, oldval) {
        this.timer && clearTimeout(this.timer)
        this.mobile = ''
        this.captcha = ''
        this.time = 60
        this.showTime = false
        this.timer = null
        this.autoCheck()
        // 解决滚动穿透
        if (this.popOpt.type === 'gift' || this.popOpt.type === 'binded') {
          if (this.popOpt.value) {
            this.noscroll().open()
          }
        }
        if (!this.popOpt.value) {
          this.noscroll().close()
        }

        if (!val.value && val.type === 'tip') {
          this.$emit('clearTimer')
        }
      }
    }
  },
  mounted () {
    this.$bus.$on('updateServer', (value) => {
      if (value.type === 'server') {
        this.server_name = value.server_name
        this.server_check = value.server_id
        this.role_name = roleText
      } else {
        this.role_name = value.role_name
        this.serverSub = value
        this.serverSub.server_name = this.server_name
      }
    })
  },
  methods: {
    wxBug (obj) {
      window.scrollTo(0, document.body.scrollTop || 0)
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
    autoCheck () {
      if (this.popOpt.type === 'server' && this.popOpt.value) {
        // 默认选中区服角色
        let checkserver = localStorage.getItem(`${this.gametype}check`)
        if (checkserver && checkserver !== 'undefined') {
          checkserver = JSON.parse(checkserver)
        }
        if (checkserver && checkserver.role_id) {
          this.server_check = checkserver.server_id
          this.server_name = checkserver.server_name
          this.role_name = checkserver.role_name
          this.serverSub = checkserver
        } else {
          this.server_name = serverText
          this.role_name = roleText
        }
      }
    },
    unbind (id) {
      this.$emit('popUnbind', id)
    },
    copy (text) {
      if (this.$copy(text)) {
        this.$toast('复制成功')
      }
    },
    // 重新领取
    openServer (parms) {
      window.sessionStorage.setItem('goods', JSON.stringify(parms))
      this.$emit('getServer', parms, '领取奖品')
    },
    // 获取验证码
    async getCode () {
      const reg = /^1\d{10}/
      const {mobile} = this
      const {aid} = this.$route.query
      if (!reg.test(mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (this.showTime) {
        return false
      }
      this.showTime = true
      const res = await this.$ajax('post', `/jf/captcha`, {aid, mobile})
      if (res.error_code === 0) {
        this.timer = setInterval(() => {
          console.log(this.time)
          this.time--
          if (this.time < 0) {
            this.showTime = false
            this.time = 60
            clearInterval(this.timer)
          }
        }, 1000)
      } else {
        this.showTime = false
      }
    },
    popClose (type) {
      this.$emit('popClose', type)
    },
    // 绑定手机
    async bindSubmit () {
      const reg = /^1\d{10}/
      const {mobile, captcha} = this
      const {aid} = this.$route.query
      if (!reg.test(mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!captcha) {
        this.$toast('请输入验证码')
        return false
      }
      const res = await this.$ajax('post', `/jf/bind-mobile`, {aid, mobile, captcha})
      if (res.error_code === 0) {
        this.$toast('恭喜，绑定手机号成功！')
        this.popClose({type: 'getData'})
      }
    },
    // 领取道具 兑换道具
    exchange () {
      if (this.server_name === serverText) {
        this.$toast('请选择游戏区服')
        return false
      }
      if (this.role_name === roleText) {
        this.$toast('请选择游戏角色')
        return false
      }
      let roleInfo = this.serverSub
      this.$emit('popServer', roleInfo)
      localStorage.setItem(`${this.gametype}check`, JSON.stringify(roleInfo))
    },
    // 获取乐币
    tipSend () {
      this.popOpt.value = false
      this.popOpt.title = '活动提示'
      this.popOpt.tip = `<p>兑换需要回复验证码发送到 ${this.popOpt.smsMobile}，</p><p>即可获得乐币</p>`
      this.popOpt.btn = 'look'
      this.popOpt.value = true
    },
    // 乐币教程
    tipHelp () {
      this.popOpt.value = false
      this.popOpt.btn = 'help'
      this.popOpt.value = true
    },
    // 乐币流程结束
    tipOver () {
      this.popOpt.value = false
      this.popOpt.btn = 'over'
      this.popOpt.value = true
    },
    // 显示区服
    showServer (parms) {
      this.$emit('showServer', {type: parms, id: this.server_check})
    }
  },
  beforeDestroy () {
    this.$bus.$off('updateServer')
  }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
