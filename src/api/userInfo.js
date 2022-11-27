import axios from 'axios'


// 注册函数，to do:确定参数以及参数校验
const register = (registerParam) => {
  const param = JSON.stringify(registerParam)
  return axios.post('/api/register', param, {
    headers:{
      'content-type': 'application/json'
    },
    withCredentials: true
  })
}

// 登陆函数，to do:确定参数以及参数校验
const loginApi = (loginParam) => {
  const param = JSON.stringify(loginParam)
  return axios.post('/api/login', param, {
    headers:{
      'content-type': 'application/json'
    },
    withCredentials: true
  })
}


export default{
  register,
  loginApi
}