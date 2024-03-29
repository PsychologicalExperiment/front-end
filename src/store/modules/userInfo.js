const state = {
  email: '',
  phoneNumber: '',
  userName: '',
  gender: '',
  role: '',
  isLogin: false,
  token: ''
}

const mutations = {
  userLogin(state, {email, phoneNumber, userName, genderType, roleType, token}) {
    state.email = email
    state.phoneNumber = phoneNumber
    state.userName = userName
    state.token = token
    state.isLogin = true
    if (genderType === 'GENDER_TYPE_MAN') {
      state.gender = '男'
    } else if (genderType === 'GENDER_TYPE_WOMAN') {
      state.gender = '女'
    } else {
      state.gender = '未知'
    }
    if (roleType === 'USER_TYPE_RESEARCHER') {
      state.role = '研究者'
    } else if (roleType === 'USER_TYPE_PARTICIPANT') {
      state.role = '参与者'
    } else {
      state.role = '未知'
    }
  },
  userLogout(state) {
    state.email = ''
    state.phoneNumber = ''
    state.userName = ''
    state.token = ''
    state.gender = ''
    state.isLogin = false
    state.role = ''
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}