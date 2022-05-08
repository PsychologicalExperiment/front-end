import {NAV_MENU_OPTION_BACK_TO_HOME} from '../../constants/global'

const state = {
  navMenuOptionList: [
    NAV_MENU_OPTION_BACK_TO_HOME,
  ],
  activedMenu: -1
}

const mutations = {
  setNavOptionOptionList(state, options) {
    state.navMenuOptionList = options
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}