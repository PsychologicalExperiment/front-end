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

const isEmail = (email) => {
  let regx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
  return regx.test(email)
}

const parseDuration = (timeSec) => {
  if (timeSec < 0) {
    return '--'
  }
  const h = Math.floor((timeSec / 3600)).toString()
  const m = Math.floor((timeSec / 60 % 60)).toString()
  const s = Math.floor((timeSec % 60)).toString()
  return h + 'h ' + m + 'm ' + s + 's'
}

export default{
  asyncCall,
  getCookie,
  setCookie,
  isEmail,
  parseDuration,
}