// 工具函数，传入promise，使得异步处理代码可以同步编写
const asyncCall = (promise) => {
  // eslint-disable-next-line no-prototype-builtins
  if (!promise || !Promise.prototype.isPrototypeOf(promise)) {
    return new Promise((_, reject) => {
      reject(new Error("param is not a Promise"))
    }).catch((err) => {
      return [err, null]
    })
  }
  return promise.then((data) => {
    return [null, data]
  }).catch(err => {
    return [err, null]
  })
}

const getCookie = (key) => {
  let reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
  let arr = document.cookie.match(reg)
  if (arr) {
    return arr[2]
  } else {
    return null
  }
}

const setCookie = ({key, value, expireDays}) => {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expireDays)
  document.cookie = key + "=" + encodeURI(value) + ((expireDays == null) ? "" : ";expires=" + exdate.toGMTString())
}

export default{
  asyncCall,
  getCookie,
  setCookie
}