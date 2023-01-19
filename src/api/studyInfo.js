import axios from 'axios'

// 获取研究列表数据
/*
param:
{
  page_index: number
  page_size: number
  researcher_id: string
}
*/
const getStudyList = ({studyListParam}) => {
  const param = JSON.stringify(studyListParam)
  return axios.post('/api/list_experiment', param, {
    headers:{
      'content-type': 'application/json',
    },
    withCredentials: true
  })
}

const getStudyDetail = ({experiment_id}) => {
  const param = JSON.stringify({
    experiment_id,
  })
  return axios.post('/api/query_experiment', param, {
    headers:{
      'content-type': 'application/json',
    },
    withCredentials: true
  })
}

const createStudy = ({title, description, experiment_time, participant_num, price}) => {
  const param = {
    title,
    description,
    experiment_time,
    participant_num,
    price
  }
  const jsonParam = JSON.stringify(param)
  return axios.post('/api/save_experiment', jsonParam, {
    headers:{
      'content-type': 'application/json',
    },
    withCredentials: true
  })
}

const getRecordList = ({experiment_id, page_index, page_size}) => {
  const param = JSON.stringify({
    experiment_id,
    page_index,
    page_size,
  })
  return axios.post('/api/query_record_list', param, {
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true
  })
}

export default{
  getStudyList,
  createStudy,
  getStudyDetail,
  getRecordList,
}