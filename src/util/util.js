// 工具函数，传入promise，使得异步处理代码可以同步编写
const asyncCall =  (promise) => {
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

export default(
  asyncCall
)
