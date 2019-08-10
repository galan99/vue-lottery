// 异常监控
function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'
  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
  )
}

function sendError (err) {
  var ua = '未知平台'
  var systemStr = navigator.userAgent.toLowerCase()
  var isIos = /iphone/i.test(systemStr) || /ipad/i.test(systemStr)
  var isAndroid = /android/i.test(systemStr)

  if (isIos) {
    ua = 'ios'
  }
  if (isAndroid) {
    ua = 'android'
  }
  console.log(err)
  var img = document.createElement('img')
  img.src = 'http://web.galan.cn/api/error/add?err=' + JSON.stringify(err) + '&ua=' + ua + '&type=移动积分'
  img.style.display = 'none'

  document.body.appendChild(img)
  img.parentNode.removeChild(img)
}

function errorHandler (err, vm, info) {
  if (vm) {
    var componentName = formatComponentName(vm)
    var propsData = vm.$options && vm.$options.propsData
    let errJson = Object.assign({}, {
      errmsg: String(err)
    }, {
      metaData: {
        componentName: componentName,
        propsData: propsData,
        info: info
      }
    })
    sendError(errJson)
  } else {
    sendError({
      errmsg: String(err)
    })
  }
}

export default errorHandler
