import axios from 'axios'
import * as utils from './utils'
const isIos = /iphone|ipad/i.test(navigator.userAgent.toLowerCase())
const isAndroid = /android/i.test(navigator.userAgent.toLowerCase())
// 数据埋点
const Ajax = (json) => {
  const appkey = '95fea617417a0f8eb0e2'
  let userId = window.sessionStorage.getItem('userId')
  let oData = ''
  let platId = 2
  if (isIos) {
    platId = 0
  } else if (isAndroid) {
    platId = 1
  }
  let data = {
    eventName: 'sgame_event',
    dtEventTime: utils.timeFormat(-1, 'second'),
    appkey: appkey,
    platId: platId,
    userId: userId,
    clienVer: utils.getUrlString('aid') || '',
    channelId: utils.getUrlString('q') || '',
    eventId: json.name, // 事件名
    EventParm: '',
    extstr: ''
  }

  if (json.type === 'buy') {
    data = {
      eventName: 'sgame_orders',
      order_id: json.order, // 订单号
      gameappky: appkey,
      pay_time: utils.timeFormat(-1, 'second'),
      channelId: utils.getUrlString('q') || '',
      userId: userId,
      amount: json.coin, // 消费的乐币
      payment_method_id: '',
      product_name: json.name, // 商品名
      qty: 1,
      client_ip: '',
      creatd: utils.timeFormat(-1, 'second'),
      extstr: '',
      platId: platId,
      clienVer: utils.getUrlString('aid') || ''
    }
  }

  if (json.type === 'search') {
    data = {
      eventName: 'sgame_moneyflow',
      dtEventTime: utils.timeFormat(-1, 'second'),
      appkey: appkey,
      platId: platId,
      userId: userId,
      clienVer: utils.getUrlString('aid') || '',
      channelId: utils.getUrlString('q') || '',
      moneytype: '乐币',
      changetype: 0,
      moneynum: json.addnum, // 增加的乐币
      aftermoney: json.allnum, // 所有乐币
      reason: '兑换',
      itemame: '乐币',
      itemnum: 1,
      extstr: ''
    }
  }

  Object.keys(data).forEach(key => {
    oData += `${decodeURIComponent(data[key])}|`
  })
  let parms = {
    method: 'post',
    data: oData,
    url: 'https://dlog.uu.cc',
    timeout: 8000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
  axios(parms)
}

export {
  Ajax as sendData
}
