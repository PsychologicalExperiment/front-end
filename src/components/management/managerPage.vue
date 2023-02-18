<template>
  <div id="manager-page">
    <div id="manager-header">
      <manager-head :studyBasicInfo="pageData.studyBasicInfo"></manager-head>
    </div>
    <div id="manager-table-head">
      <el-tabs v-model="activeName" class="manager-tab" @tab-click="tabClick">
        <el-tab-pane label="待支付" name="unpaid"></el-tab-pane>
        <el-tab-pane label="已完成" name="completed"></el-tab-pane>
      </el-tabs>
      <div id="manager-table-buttons">
        <el-button id="near-day">近3天</el-button>
        <el-button id="near-week">近7天</el-button>
        <el-button id="near-month">近30天</el-button>
        <div id="manager-date-picker">
          <el-date-picker
            v-model="pageData.dateVal"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :shortcuts=shortcuts
            @change="datePickerChange"
            format="YYYY-MM-DD"
            value-format="x"
          />
        </div>
      </div>
      <div id="gender-checkbox">
        <span class="gender-span">性别：</span>
        <div class="checkbox-wrapper">
          <el-checkbox-group v-model="checkedGenders" :min="0" :max="2">
            <el-checkbox 
              v-for="gender in genders" 
              :key="gender" 
              :label="gender"
            >
              {{gender}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div id="duration-checkbox">
        <span class="duration-span">完成时长：</span>
        <div class="checkbox-wrapper">
          <el-checkbox-group v-model="checkedDurations" :min="0" :max="1">
            <el-checkbox 
              v-for="duration in durations" 
              :key="duration" 
              :label="duration"
            >
              {{duration}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div id="manager-search-buttons">
        <el-button 
          type="primary" 
          :icon="Search" 
          class="search-button"
          color="#F1D160"
        >
          查询
        </el-button>
        <el-button class="reset-button">重置</el-button>
      </div>
    </div>
    <div id="manager-table">
      <manager-table :tableData="manageTableList"></manager-table>
    </div>
  </div>
  <div id="manager-page-bottom">
    <el-pagination
      class="manager-page-pagination"
      background 
      layout="prev, pager, next" 
      :page-count=pageNum
      @current-change="paginationClick"
    />
  </div>
</template>

<script>
import managerHead from './managerHead.vue'
import managerTable from './managerTable.vue'
import util from '../../util/util.js';
import {
  MANAGE_TABLE_ROW_NUM,
} from '../../constants/global'
import { onMounted, ref, reactive, computed } from 'vue'
import { useStore } from "vuex";
import { Search } from '@element-plus/icons-vue'

export default {
  components: {
    managerHead,
    managerTable
  },
  setup() {
    const activeName = ref('unpaid')
    const pageNum = ref(0)
    const shortcuts = [
      {
        text: 'Last week',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        },
      },
      {
        text: 'Last month',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        },
      },
      {
        text: 'Last 3 months',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        },
      },
    ]
    const pageData = reactive({
      studyBasicInfo: {
        progress: 0.00,
        publishTime: '',
        eligible: '',
        reward: '',
        otherInfo: ''
      },
      dateVal: [],
    })
    const manageTableList = computed(() => store.state.studyInfo.manageTableList)
    const checkedGenders = ref([])
    const checkedDurations = ref([])
    const genders = ['男性', '女性']
    const durations = ['十分钟内', '十分钟以上']
    const store = useStore();
    const tabClick = (tab, event) => {
      console.log(tab, event)
    }
    const loadTableDatas = async () => {
      const [err] = await util.asyncCall(
        store.dispatch('studyInfo/getRecordListFromServer', {
          page_index: 0,
          page_size: MANAGE_TABLE_ROW_NUM,
      }))
      if (err) {
        console.log(err)
      }
      pageNum.value = Math.ceil(store.state.studyInfo.manageTableListCnt / MANAGE_TABLE_ROW_NUM)
      pageData.studyBasicInfo = store.state.studyInfo.manageInfo
    }
    const loadStudyBasicInfo = async () => {
      const [err] = await util.asyncCall(
        store.dispatch('studyInfo/getManageInfoFromServer')
      )
      if (err) {
        console.log(err)
      }
      pageData.studyBasicInfo = store.state.studyInfo.manageInfo
    }
    const paginationClick = async (pageNum) => {
      console.log(pageNum)
      const page_index = MANAGE_TABLE_ROW_NUM * (pageNum - 1)
      const [err] = await util.asyncCall(
        store.dispatch('studyInfo/getRecordListFromServer', {
          page_index,
          page_size: MANAGE_TABLE_ROW_NUM,
      }))
      if (err) {
        console.log(err)
      }
    }
    const datePickerChange = () => {
      console.log(pageData.dateVal[0], pageData.dateVal[1])
    }
    const navs = store.getters['pageInfo/getNavOptionsByRole'](store.state.userInfo.role);
    onMounted(() => {
      store.commit("pageInfo/setNavOptionOptionList", navs)
      loadStudyBasicInfo()
      loadTableDatas()
    });
    return {
      pageData,
      activeName,
      tabClick,
      checkedGenders,
      genders,
      shortcuts,
      checkedDurations,
      durations,
      Search,
      pageNum,
      paginationClick,
      manageTableList,
      datePickerChange
    }
  }
}
</script>

<style scoped>
#manager-page{
  height: 75%;
}
#manager-header{
  height: 28%;
}
#manager-table-head {
  height: 13%;
  width: 80%;
  left: 10%;
  top: 2.3%;
  position: relative;
  background-color: #FFFFFF;
}
#manager-table {
  height: 40%;
  width: 80%;
  position: relative;
  left: 10%;
  top: 4.3%;
}
#manager-table-head .manager-tab {
  position: relative;
  top: 9%;
  height: 33%;
  width: 60%;
}
#manager-page-bottom .manager-page-pagination {
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-pack: center;
  -moz-box-align: center;
  
  display: -o-box;
  -o-box-orient: horizontal;
  -o-box-pack: center;
  -o-box-align: center;
  
  display: -ms-box;
  -ms-box-orient: horizontal;
  -ms-box-pack: center;
  -ms-box-align: center;
  
  display: box;
  box-orient: horizontal;
  box-pack: center;
  box-align: center;
}
/deep/ #manager-table-head .manager-tab > .el-tabs__header{
  padding: 0;
  position: relative;
  margin: 0 0 0 0;
  width: 100%;
  height: 100%;
}
/deep/ #manager-table-head .manager-tab .el-tabs__nav-wrap{
  overflow: hidden;
  margin-bottom: -1px;
  position: absolute;
  left: 5%;
}
#manager-table-head .manager-tab > .el-tabs__content{
  font-weight: 600;
}
/deep/ #manager-table-head .manager-tab .el-tabs__nav-wrap::after{
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
  z-index: var(--el-index-normal);
}
#manager-table-buttons{
  width: 60%;
  height: 33%;
  position: absolute;
  top: 9%;
  right: 5%;
}
#manager-table-buttons #manager-date-picker{
  width: 40%;
  position: absolute;
  top: 2%;
  right: 2%;
}
/deep/ #manager-table-buttons #manager-date-picker .el-range-editor {
  width: 100%;
  display: inline-flex;
  align-items: center;
  padding: 0 2%;
}
#manager-table-buttons #near-day{
  position: absolute;
  top: 2%;
  left: 10%;
}
#manager-table-buttons #near-week{
  position: absolute;
  top: 2%;
  left: 23%;
}
#manager-table-buttons #near-month{
  position: absolute;
  top: 2%;
  left: 38%;
}
#gender-checkbox{
  width: 23%;
  position: absolute;
  height: 33%;
  bottom: 1%;
}
#gender-checkbox .gender-span{
  font-weight: bold;
  position: absolute;
  top: 10%;
  left: 13%;
}
#gender-checkbox .checkbox-wrapper{
  position: absolute;
  width: 66%;
  top: 1%;
  right: 3%;
}
#duration-checkbox{
  width: 40%;
  position: absolute;
  height: 33%;
  bottom: 1%;
  left: 25%;
}
#duration-checkbox .duration-span{
  font-weight: bold;
  position: absolute;
  top: 10%;
  left: 13%;
}
#duration-checkbox .checkbox-wrapper{
  position: absolute;
  width: 66%;
  top: 1%;
  right: 3%;
}
#manager-search-buttons{
  position: absolute;
  right: 3%;
  bottom: 12%;
  width: 23%;
}
#manager-search-buttons .search-button {
  margin-right: 10%;
}
/deep/ .el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background-color: #F1D160;
  color: var(--el-color-white);
  font-weight: 700;
}
/deep/ .el-pagination.is-background .el-pager li:not(.is-disabled):hover {
  color: #F1D160;
}
/deep/ .el-tabs__item:hover {
  color: #F1D160;
  cursor: pointer;
}
/deep/ .el-tabs__item.is-active {
  color: #F1D160;
}
/deep/ .el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #F1D160;
  z-index: 1;
  transition: width var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier),transform var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
  list-style: none;
}
</style>