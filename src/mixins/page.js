import { getUrlString, wxShare } from '@/utils/utils'
const allNum = 20
var page = {
  created () {
    this.getData()
    this.wxData()
  },
  data () {
    return {
      data: {},
      popOptions: {
        value: false,
        type: 'tip',
        title: '兑换商品',
        json: {},
        arr: []
      }, // 弹窗信息
      serverOpt: {
        type: ''
      },
      timer: null, // 定时查询
      timerNum: 0
    }
  },
  methods: {
    // 首页数据
    async getData () {
      const {aid} = this.$route.query
      const res = await this.$ajax('get', `/jf/index-for-ajax`, {aid: aid, type: getUrlString('type'), s: getUrlString('s')})
      if (res.error_code === 0) {
        this.data = res.data
        let {is_login, login_url} = res.data
        if (is_login * 1 !== 1) {
          window.location.href = login_url
          return false
        }
        if (this.hasOwnProperty('otps')) {
          this.otps.list = this.data.draw_goods_list
        }
        // 转盘提示绑定手机1
        this.otps.noBind = this.data.user_info.is_bind_mobile * 1 === 1
        // 转盘提示乐币不足
        this.otps.canStart = this.data.user_info.balance * 1 >= this.data.draw_need_coin * 1

        if (!window.localStorage.getItem('bindphone') && +this.data.user_info.is_bind_mobile !== 1) {
          this.popclick('bind')
          window.localStorage.setItem('bindphone', true)
        }
        window.sessionStorage.setItem('userId', res.data.user_info.player_id)
        this.$sendData({name: '移动积分访问页面'})
      }
    },
    async wxData () {
      const res = await this.$ajax('post', '/jf/share-config', {
        key: getUrlString('gametype') || 'exchange',
        cur_page_url: window.location.href
      })
      if (res.error_code === 0) {
        let shareConfig = res.data.shareConfig
        let shareSignConfig = res.data.shareSignConfig
        wxShare(
          shareSignConfig.appId,
          shareSignConfig.timestamp,
          shareSignConfig.nonceStr,
          shareSignConfig.signature,
          shareConfig
        )
      }
    },
    clearTimer () {
      clearTimeout(this.timer)
      this.timerNum = allNum
    },
    // 查询乐币
    async coinEmit () {
      const {aid} = this.$route.query
      const res = await this.$ajax('post', `/jf/query`, {aid, search: 'search'})
      if (res.error_code === 0) {
        clearTimeout(this.timer)
        this.timerNum = 0
        this.timerSearch()
      }
      this.popOptions.tip = res.msg
      this.popOptions.type = 'tip'
      this.popOptions.btn = 'tip'
      this.popOptions.title = '活动提示'
      this.popOptions.value = true
    },
    // 定时查询乐币
    async timerSearch () {
      if (this.timerNum !== allNum) {
        this.timerNum++
        const {aid} = this.$route.query
        const res = await this.$ajax('post', `/jf/get-result`, {aid, timer: 'timer'})
        if (res.error_code === 0) {
          this.timerNum = allNum
          this.getData()
          this.popOptions.value = false
          this.popOptions.tip = `成功提取${res.data.increase_balance}乐币！`
          this.popOptions.type = 'tip'
          this.popOptions.btn = 'tip'
          this.popOptions.title = '活动提示'
          this.popOptions.value = true
          this.$sendData({type: 'search', addnum: res.data.increase_balance, allnum: res.data.balance})
        } else {
          if (this.timerNum === allNum) {
            this.popOptions.value = false
            this.popOptions.tip = res.msg
            this.popOptions.type = 'tip'
            this.popOptions.btn = 'tip'
            this.popOptions.title = '活动提示'
            this.popOptions.value = true
          } else {
            this.timer = setTimeout(() => {
              this.timerSearch()
            }, 1e3)
          }
        }
      }
    },
    // 获取区服列表
    async getServer (json, text) {
      let goods = JSON.parse(sessionStorage.getItem('goods'))
      this.showCode(goods, text, 'server')
    },
    // 转盘获取乐币
    getCoin () {
      this.data.user_info.balance = parseInt((this.data.user_info.balance * 1e4 - this.data.draw_need_coin * 1e4) / 1e4)
      if (this.data.user_info.balance * 1 < this.data.draw_need_coin * 1) {
        this.otps.canStart = false
      } else {
        this.otps.canStart = true
      }
    },
    // 未绑定
    noBind () {
      this.popclick('bind')
    },
    // 乐币不足
    noCoinPop () {
      const nav = navigator.userAgent.toLowerCase()
      const isIos = /iphone|ipad/g.test(nav)
      this.popOptions.type = 'tip'
      this.popOptions.title = '活动提示'
      this.popOptions.tip = '<p>您的乐币不足，请先获得乐币</p><p>是否发送短信兑换？</p>'
      this.popOptions.value = true
      this.popOptions.btn = 'message'
      this.popOptions.smsMobile = this.data.config.send_sms_phone
      this.popOptions.smsImg = this.data.config.sms_explain
      this.popOptions.content = `sms:${this.data.config.send_sms_phone}${isIos ? '&' : '?'}body=${this.data.config.send_sms_content}`
    },
    // 兑换道具
    async giftEmit (data) {
      if (this.data.user_info.balance * 1 < data.price * 1) {
        if (!this.otps.noBind) {
          this.noBind()
          return false
        }
        this.noCoinPop()
        return false
      }
      const {aid} = this.$route.query
      window.sessionStorage.setItem('goods', JSON.stringify(data))
      if (this.gametype === 'chuanqi') {
        this.getServer(data, '兑换商品', 'dui')
      } else {
        const res = await this.$ajax('post', `/jf/exchange`, {aid: aid, goods_id: data.goods_id})
        if (res.error_code === 0) {
          let result = Object.assign({}, data, {goods_code: res.data.goods_code})
          this.getData()
          this.showCode(result, '兑换成功')
          this.$sendData({type: 'buy', order: res.data.order_no, name: data.name, coin: data.price})
        }
      }
    },
    // 重新领取 抽中道具下发 兑换
    async popServer (data) {
      let goods = JSON.parse(sessionStorage.getItem('goods'))
      let parms = {
        aid: this.$route.query.aid,
        goods_id: goods.goods_id,
        server_id: data.server_id,
        server_name: data.server_name,
        role_id: data.role_id,
        role_name: data.role_name,
        open_id: data.openid
      }
      if (goods.order_no) {
        parms.order_no = goods.order_no
        const res = await this.$ajax('post', `/jf/receive`, parms)
        if (res.error_code === 0) {
          this.showCode({img: goods.img, name: goods.name}, '领取奖品')
        }
      } else {
        const res = await this.$ajax('post', `/jf/exchange`, parms)
        if (res.error_code === 0) {
          this.getData()
          this.showCode({img: goods.img, name: goods.name}, '兑换成功')
          this.$sendData({type: 'buy', order: res.data.order_no, name: goods.name, coin: goods.price})
        }
      }
    },
    // 展示道具
    showCode (data, text) {
      this.popOptions.type = arguments.length === 2 ? 'open' : 'server'
      this.popOptions.json = data
      this.popOptions.title = text
      this.popOptions.value = true
    },
    // 转盘结束
    wheelOver (opt) {
      if (this.gametype === 'chuanqi') {
        this.getServer(opt, '领取奖品')
      } else {
        this.showCode(opt, '恭喜抽中')
      }
    },
    // 已绑定手机列表
    async getBinded () {
      const {aid} = this.$route.query
      const res = await this.$ajax('post', `/jf/my-mobile`, {aid})
      if (res.error_code === 0) {
        this.popOptions.arr = res.data
        this.popOptions.value = true
      }
    },
    // 我的礼包列表
    async getGift () {
      const {aid} = this.$route.query
      const res = await this.$ajax('post', `/jf/my-list`, {aid})
      if (res.error_code === 0) {
        this.popOptions.arr = res.data
        this.popOptions.value = true
      }
    },
    // 我的礼包，绑定手机，已绑定手机弹窗
    popclick (type) {
      this.popOptions.type = type
      if (type === 'binded') {
        this.getBinded()
      } else if (type === 'gift') {
        this.getGift()
      } else {
        this.popOptions.value = true
      }
    },
    // 关闭弹窗
    popClose (data) {
      this.popOptions.value = false
      if (data.type === 'getData') {
        this.getData()
      }
    },
    // 解绑
    async popUnbind (id) {
      const {aid} = this.$route.query
      const res = await this.$ajax('post', `/jf/unbind-mobile`, {aid, id: id})
      if (res.error_code === 0) {
        this.popOptions.value = false
        this.$toast('恭喜，解绑成功！')
        this.getData()
      }
    },
    // 显示游戏区服
    showServer (parms) {
      this.serverOpt.id = parms.id
      this.serverOpt.type = parms.type
    }
  }
}

export default page
