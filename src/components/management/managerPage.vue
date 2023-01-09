<template>
  <div id="manager-page">
    <div id="manager-header">
      <manager-head :studyBasicInfo="studyBasicInfo"></manager-head>
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
            v-model="dateVal"
            type="monthrange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :shortcuts=shortcuts
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
        >
          查询
        </el-button>
        <el-button class="reset-button">重置</el-button>
      </div>
    </div>
    <div id="manager-table">
      <manager-table :tableData="tableData"></manager-table>
    </div>
  </div>
  <div id="manager-page-bottom">
    <el-pagination
      class="manager-page-pagination"
      background 
      layout="prev, pager, next" 
      :page-count="5"
    />
  </div>
</template>

<script>
import managerHead from './managerHead.vue'
import managerTable from './managerTable.vue'
import { onMounted, ref } from 'vue'
import { useStore } from "vuex";
import { Search } from '@element-plus/icons-vue'
export default {
  components: {
    managerHead,
    managerTable
  },
  setup() {
    const activateName = ref('unpaid')
    const dateVal = ref('')
    const studyBasicInfo = {
      progress: 30.00,
      publishTime: '2022-12-18',
      eligible: '10',
      reward: '$30',
      otherInfo: '无',
    }
    const tableData = [
      {
        uid: '5fcfcfc1c5aaa211308f4a1d2',
        name: '坤坤',
        startTime: '2023-01-01 00:00:00',
        usedTime: '10m 20s',
        progress: '50%',
        status: '已批准',
      },
      {
        uid: '5fcfcfc1c5aaa211308f4a1d2',
        name: '坤坤',
        startTime: '2023-01-01 00:00:00',
        usedTime: '10m 20s',
        progress: '50%',
        status: '已批准',
      },
      {
        uid: '5fcfcfc1c5aaa211308f4a1d2',
        name: '坤坤',
        startTime: '2023-01-01 00:00:00',
        usedTime: '10m 20s',
        progress: '50%',
        status: '已批准',
      },
      {
        uid: '5fcfcfc1c5aaa211308f4a1d2',
        name: '坤坤',
        startTime: '2023-01-01 00:00:00',
        usedTime: '10m 20s',
        progress: '50%',
        status: '已批准',
      },
      {
        uid: '5fcfcfc1c5aaa211308f4a1d2',
        name: '坤坤',
        startTime: '2023-01-01 00:00:00',
        usedTime: '10m 20s',
        progress: '50%',
        status: '进行中',
      }
    ]
    const checkedGenders = ref([])
    const checkedDurations = ref([])
    const genders = ['男性', '女性']
    const durations = ['十分钟内', '十分钟以上']
    const store = useStore();
    const tabClick = (tab, event) => {
      console.log(tab, event)
    }
    const navs = store.getters['pageInfo/getNavOptionsByRole'](store.state.userInfo.role);
    onMounted(() => {
      store.commit("pageInfo/setNavOptionOptionList", navs);
    });
    return {
      tableData,
      studyBasicInfo,
      activateName,
      tabClick,
      dateVal,
      checkedGenders,
      genders,
      checkedDurations,
      durations,
      Search,
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
  width: 33%;
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
</style>