import {
  STUDY_RUNNING_ITEM_NUM,
  MANAGE_TABLE_ROW_NUM,
  STATE_RECORD_INIT,
  STATE_RECORD_FINISHED,
  STATE_RECORD_APPROVED,
  STATE_RECORD_TIMEOUT,
  STATE_RECORD_RETURNED,
} from '../../constants/global'
import studyApi from "../../api/studyInfo"
import util from '../../util/util.js'

const stausTransferMap = new Map([
  [0, STATE_RECORD_INIT],
  [1, STATE_RECORD_FINISHED],
  [2, STATE_RECORD_APPROVED],
  [3, STATE_RECORD_TIMEOUT],
  [4, STATE_RECORD_RETURNED],
])

const tagMap = new Map([
  [STATE_RECORD_INIT, ''],
  [STATE_RECORD_FINISHED, 'warning'],
  [STATE_RECORD_APPROVED, 'success'],
  [STATE_RECORD_TIMEOUT, 'danger'],
  [STATE_RECORD_RETURNED, 'info'],
])

const statusMap = new Map([
  [STATE_RECORD_INIT, '进行中'],
  [STATE_RECORD_FINISHED, '已完成'],
  [STATE_RECORD_APPROVED, '已批准'],
  [STATE_RECORD_TIMEOUT, '已超时'],
  [STATE_RECORD_RETURNED, '已拒绝'],
])

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
    detail: '',
    url: '',
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
  manageTableList: []
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
  setManageTableListStartIdx(state, {startIdx}) {
    state.manageTableListStartIdx = startIdx
  },
  setStudyListEmpty(state) {
    state.studyList = []
    state.studyListCnt = 0
    state.studyListStartCnt = 0
  },
  setManageTableItemStatus(state, {table_list_idx, status}) {
    const statusStr = stausTransferMap.get(status) || ''
    state.manageTableList[table_list_idx].status = statusMap.get(statusStr) || '未知'
    state.manageTableList[table_list_idx].tagType = tagMap.get(statusStr) || ''
  },
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
    const [err, ret] = await util.asyncCall(studyApi.getStudyList({
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
  },
  async getStudyDetailFromServer ({commit, state}) {
    const param = {
      experiment_id: state.currentExpId,
    }
    console.log('param is ', param, 'state is  ', state)
    const [err, ret] = await util.asyncCall(studyApi.getStudyDetail(param))
    if (err) {
      console.log(err)
      return Promise.reject(err)
    } else {
      const studyDetail = {
        title: ret.data.experiment_info.title,
        duration: ret.data.experiment_info.experiment_time.toString() + '分钟',
        price: '$' + ret.data.experiment_info.price.toString(),
        detail: ret.data.experiment_info.description,
        url: ret.data.experiment_info.url,
      }
      commit('setStudyDetail', {studyDetail})
      return Promise.resolve(true)
    }
  },
  async getRecordListFromServer({state, commit}, {page_index, page_size}) {
    const [err, ret] = await util.asyncCall(studyApi.getRecordList({
      experiment_id: state.currentExpId,
      page_index,
      page_size,
    }))
    if (err) {
      console.log(err)
      return Promise.reject(err)
    } else {
      console.log(ret.data)
      const manageTableList = ret.data.subject_record_list.map((item) => {
        return {
          recordId: item.subject_record_id,
          name: item.userInfo ? item.userInfo.user_name : '',
          tagType: tagMap.get(item.state) || '',
          startTime: '2023-01-01 00:00:00',
          usedTime: util.parseDuration(item.time_taken),
          progress: '50%',
          status: statusMap.get(item.state) || '未知',
          uid: item.userInfo ? item.userInfo.uid: ''
        }
      })
      const manageInfo = {
        ...state.manageInfo,
        progress: ret.data.finish_pcts
      }
      commit('setManageTableList', {manageTableList})
      commit('setManageTableListCnt', {cnt: ret.data.total_num})
      commit('setManageTableListStartIdx', {startIdx: page_index})
      commit('setManageInfo', {manageInfo})
      return Promise.resolve(true)
    }
  },
  async getManageInfoFromServer({state, commit}) {
    const [err, ret] = await util.asyncCall(studyApi.getStudyDetail({
      experiment_id: state.currentExpId,
    }))
    if (err) {
      console.log(err)
      return Promise.reject(err)
    } else {
      console.log(ret.data)
      const manageInfo = {
        progress: 0.00,
        publishTime: ret.data.experiment_info.create_time,
        eligible: ret.data.experiment_info.participant_num.toString(),
        reward: '$' + ret.data.experiment_info.price,
        otherInfo: '无',
      }
      commit('setManageInfo', {manageInfo})
      return Promise.resolve(true)
    }
  },
  async updateRecordToServer({state, commit}, {table_list_idx, status}) {
    const subject_record_id = state.manageTableList[table_list_idx].recordId
    const user_id = state.manageTableList[table_list_idx].uid
    const [err, ret] = await util.asyncCall(studyApi.updateRecordState({
      subject_record_id,
      status,
      user_id 
    }))
    if (err) {
      console.log(err)
      return Promise.reject(err)
    } else {
      console.log(ret.data)
      if (ret.data.message !== 'Success') {
        return Promise.reject("rsp not ok, message: " + ret.message)
      }
      commit('setManageTableItemStatus', {table_list_idx, status})
      console.log('set success')
      return Promise.resolve(true)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}