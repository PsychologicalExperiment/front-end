import { createStore, createLogger } from 'vuex'
import pageInfo from './modules/pageInfo'
import userInfo from './modules/userInfo'
import studyInfo from './modules/studyInfo'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    pageInfo,
    userInfo,
    studyInfo,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})