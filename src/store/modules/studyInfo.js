import {
  STUDY_RUNNING_ITEM_NUM,
  MANAGE_TABLE_ROW_NUM,
} from '../../constants/global'
import studyApi from "../../api/studyInfo"
import util from '../../util/util.js'

const state = {
  //服务器totalNum
  studyListCnt: 0,
  //当前缓存在服务器数据列表的offset
  studyListStartCnt: 0,
  //当前详情页面的研究id
  currentExpId: '',
  //本地缓存30个列表信息
  studyList: [
    {
      title: '',
      duration: '',
      price: '',
      expId: ''
    }
  ],
  studyDetail: {
    title: '',
    duration: '',
    price: '',
    detail: ''
  },
  manageInfo: {
    progress: 0.00,
    publishTime: '',
    eligible: '',
    reward: '',
    otherInfo: ''
  },
  manageTableListCnt: 0,
  manageTableListStartIdx: 0,
  manageTableList: [
    {
      uid: '5fcfcfc1c5aaa211308f4a1d2',
      name: '坤坤',
      startTime: '2023-01-01 00:00:00',
      usedTime: '10m 20s',
      progress: '50%',
      status: '已批准',
    }
  ]
}

const mutations = {
  setStudyListCnt(state, {cnt}) {
    state.studyListCnt = cnt
  },
  setStudyList(state, {studyList}) {
    state.studyList = studyList
  },
  setStudyListStartCnt(state, {startCnt}) {
    state.studyListStartCnt = startCnt
  },
  setCurrentExpId(state, {id}) {
    state.currentExpId = id
  },
  setStudyDetail(state, {studyDetail}) {
    state.studyDetail = studyDetail
  },
  setManageInfo(state, {manageInfo}) {
    state.manageInfo = manageInfo
  },
  setManageTableListCnt(state, {cnt}) {
    state.manageTableListCnt = cnt
  },
  setManageTableList(state,{manageTableList}) {
    state.manageTableList = manageTableList
  },
  setStudyListEmpty(state) {
    state.studyList = []
    state.studyListCnt = 0
    state.studyListStartCnt = 0
  }
}

const getters = {
  getStudyRowsByPageId: (state) => (pageId) => {
    if (state.studyList.length === 0) {
      return {
        firstRow: [],
        secondRow: []
      }
    }
    const localPageId = pageId - state.studyListStartCnt / STUDY_RUNNING_ITEM_NUM
    const stIdx = (localPageId - 1) * STUDY_RUNNING_ITEM_NUM
    const secondStIdx = stIdx + STUDY_RUNNING_ITEM_NUM / 2
    const listEdIdx = state.studyList.length - 1
    if (secondStIdx > listEdIdx) {
      console.log(listEdIdx)
      return {
        firstRow: state.studyList.slice(stIdx, listEdIdx + 1),
        secondRow: []
      }
    } else {
      const secondEdIdx = listEdIdx - secondStIdx + 1 > STUDY_RUNNING_ITEM_NUM / 2 ? secondStIdx + STUDY_RUNNING_ITEM_NUM / 2 - 1 : listEdIdx
      return {
        firstRow: state.studyList.slice(stIdx, secondStIdx),
        secondRow: state.studyList.slice(secondStIdx, secondEdIdx + 1)
      }
    }
  },
  currentStudyDetail: state => state.studyDetail,
  currentManageInfo: state => state.manageInfo,
  getTableDataByPageId: (state) => (pageId) => {
    if (state.manageTableList.length === 0) {
      return []
    }
    const localPageId = pageId - state.manageTableListStartIdx / MANAGE_TABLE_ROW_NUM
    const stIdx = (localPageId - 1) * MANAGE_TABLE_ROW_NUM
    const edIdx = stIdx + MANAGE_TABLE_ROW_NUM > state.manageTableList.length ? state.manageTableList.length : stIdx + MANAGE_TABLE_ROW_NUM
    return state.manageTableList.slice(stIdx, edIdx)
  },
  getCurrentStudyPageRange: (state) => {
    const stPageId = state.studyListStartCnt / STUDY_RUNNING_ITEM_NUM + 1
    const len = Math.ceil(state.studyList.length / STUDY_RUNNING_ITEM_NUM)
    return {
      start: stPageId,
      len
    }
  }
}

const actions = {
  async getStudyListFromServer ({commit}, {listParam}) {
    console.log('studyParam is ', listParam)
    let [err, ret] = await util.asyncCall(studyApi.getStudyList({
      studyListParam: listParam,
    }))
    if (err) {
      console.log(err)
      commit('setStudyListEmpty')
      return Promise.reject(err)
    } else {
      const studyList = ret.data.exp_info_list.map((item) => {
        return {
          title: item.title,
          duration: item.experiment_time.toString() + '分钟',
          price: '$30',
          expId: item.experiment_id,
        }
      })
      const studyListCnt = ret.data.total_num
      commit('setStudyList', {studyList})
      commit('setStudyListCnt', {cnt: studyListCnt})
      commit('setStudyListStartCnt', {startCnt: listParam.page_index})
      return Promise.resolve(true)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}