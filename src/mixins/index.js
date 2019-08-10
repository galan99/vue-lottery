var base = {
  created () {
    let path = this.$route.path.substring(1)
    if (path === 'index') {
      this.router = 'index'
    } else if (path === 'h') {
      this.router = 'h'
    }
    if (this.$route.query.gametype === 'chuanqi') {
      this.gametype = 'chuanqi'
    }
  },
  data () {
    return {
      router: '', // 横竖版
      gametype: '' // 游戏 默认花园
    }
  }
}

export default base
