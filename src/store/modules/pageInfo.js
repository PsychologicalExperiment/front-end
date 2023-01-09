import {
  NAV_MENU_OPTION_BACK_TO_HOME,
  NAV_MENU_OPTION_NEW_STUDY,
  NAV_MENU_OPTION_RUNNING,
  NAV_MENU_OPTION_HOME_PAGE,
} from '../../constants/global'

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

const getters = {
  getNavOptionsByRole: () => (role) => {
    if (role === '研究者') {
      return [
        NAV_MENU_OPTION_HOME_PAGE,
        NAV_MENU_OPTION_NEW_STUDY,
        NAV_MENU_OPTION_RUNNING,
      ]
    } else if (role === '参与者') {
      return [
        NAV_MENU_OPTION_HOME_PAGE,
        NAV_MENU_OPTION_RUNNING,
      ]
    } else {
      return [
        NAV_MENU_OPTION_HOME_PAGE,
        NAV_MENU_OPTION_RUNNING,
      ]
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}