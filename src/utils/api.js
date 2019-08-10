import Qs from 'qs'
import axios from 'axios'
import Toast from '@/components/toast'
import Loading from '@/components/loading'

// 本地地址
let $url = ''
// easy-mock模拟数据
if (location.href.indexOf('localhost') !== -1 || location.href.indexOf('192.168') !== -1) {
  // $url = 'https://www.easy-mock.com/mock/5d395904182dfc562392e1b8'
}

export const Ajax = (...rest) => {
  if (rest[2].timer !== 'timer') {
    Loading.open()
  }
  function checkStatus (response) {
    if (response.data.error_code !== 0 && response.data.msg) {
      if (response.data.error_code === 10003) {
        // router.push('/login')
      } else {
        if (rest[2].search !== 'search' && rest[2].timer !== 'timer') {
          Toast(response.data.msg)
        }
      }
    }
    Loading.close()
    return response.data
  }

  function checkCode (err) {
    console.error('Cought Error: ', err)
    Toast('请求出错，请稍后再试！')
    Loading.close()
    return err
  }

  let data = rest[2]
  let headers = {
    'X-Requested-With': 'XMLHttpRequest'
  }
  let json = {}

  if (rest[0].toLowerCase() === 'post') {
    data = rest.length === 3 ? Qs.stringify(data) : data
    headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    json.data = data
  } else if (rest[0].toLowerCase() === 'get') {
    json.params = data
  } else {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return axios.post(rest[1], data, config).then(checkStatus).catch(checkCode)
  }

  json.method = rest[0]
  json.url = $url + rest[1]
  json.timeout = 80000
  json.headers = headers

  return axios(json).then(checkStatus).catch(checkCode)
}
/*
使用方法
async comeIn(){
    let postData = {
        sort: this.sort,
    };
    const data=await Ajax('get',`${this.$url}wpk/popups/list`,postData);
    if(data.code==0){
    }
}
*/
