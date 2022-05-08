import { createStore, createLogger } from 'vuex'
import pageInfo from './modules/pageInfo'
import userInfo from './modules/userInfo'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    pageInfo,
    userInfo,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})