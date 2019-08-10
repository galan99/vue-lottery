function debounce (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 获取url参数
function getUrlString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.href.substr(location.href.indexOf('?') + 1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

// 时间戳格式化
function timeFormat (val, type) {
  let time = ''
  if (val) {
    let date = val === -1 ? new Date() : new Date(val * 1000)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

    if (type === 'zhong') {
      // 12月11日00:00
      time = `${month}月${day}日${h}:${m}`
    } else if (type === 'month') {
      // 12月11日
      time = `${month}月${day}日`
    } else if (type === 'second') {
      // 2018.11.12 00:00:00
      time = `${year}.${month}.${day} ${h}:${m}:${s}`
    } else {
      // 2018.11.12 00:00
      time = `${year}.${month}.${day} ${h}:${m}`
    }
  }
  return time
}

// 分享
function wxShare (gappid, gtimestamp, gnonceStr, gsignature, gshareConfig) {
  wx.config({
    debug: false,
    appId: gappid,
    timestamp: gtimestamp,
    nonceStr: gnonceStr,
    signature: gsignature,
    jsApiList: [
      'checkJsApi',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo'
    ]
  })
  window.shareData = {
    'imgUrl': gshareConfig.icon || '',
    'timeLineLink': gshareConfig.share_url,
    'sendFriendLink': gshareConfig.share_url,
    'weiboLink': gshareConfig.share_url,
    'tTitle': gshareConfig.title || '',
    'tContent': gshareConfig.content || '',
    'fTitle': gshareConfig.title || '',
    'fContent': gshareConfig.content || '',
    'wTitle': gshareConfig.title || '',
    'wContent': gshareConfig.content || ''
  }
  wx.ready(function () {
    var shareDataLine = {
      title: window.shareData.tTitle,
      link: window.shareData.timeLineLink,
      imgUrl: window.shareData.imgUrl,
      success: function (res) {}
    }
    var shareData = {
      title: window.shareData.fTitle,
      desc: window.shareData.fContent,
      link: window.shareData.sendFriendLink,
      imgUrl: window.shareData.imgUrl,
      success: function (res) {}
    }
    wx.onMenuShareAppMessage(shareData)
    wx.onMenuShareTimeline(shareDataLine)
    wx.onMenuShareQQ(shareData)
    wx.onMenuShareWeibo(shareData)
  })
}

export {
  debounce,
  getUrlString,
  timeFormat,
  wxShare
}
