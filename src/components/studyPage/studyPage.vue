<template>
  <div id="study-page">
    <div id="study-page-header">
      <div class="study-page-date">
        <span class="study-page-date-header" :style="{fontSize: headerFontSize}">实验日期: </span>
        <div class="date-picker-wrapper">
          <el-date-picker
            class="study-page-picker"
            v-model="dateVal"
            type="monthrange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :shortcuts=shortcuts
          />
        </div>
        <span class="study-page-date-header" :style="{fontSize: headerFontSize}">实验费用: </span>
        <div class="select-wrapper">
         <el-select v-model="priceVal" placeholder="Price">
            <el-option
              v-for="item in priceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>
    <div id="study-page-body">
      <el-row class="study-page-row">
        <el-col
          v-for="(item, index) in rowData.firstRow"
          :key="index"
          :span="cardSpanLen"
          :offset="index > 0 ? 1 : 0"
        >
          <study-item :studyItemData="item"></study-item>
        </el-col>
      </el-row>
      <el-row class="study-page-row">
        <el-col
          v-for="(item, index) in rowData.secondRow"
          :key="index"
          :span="cardSpanLen"
          :offset="index > 0 ? 1 : 0"
        >
          <study-item :studyItemData="item"></study-item>
        </el-col>
      </el-row>
    </div>
    <div id="study-page-bottom">
      <el-pagination
        class="study-page-pagination"
        background 
        layout="prev, pager, next" 
        :page-count=pageNum
        @current-change="paginationClick"
      />
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from "vuex";
import { ElMessageBox } from 'element-plus'
import studyItem from './studyItem.vue'
import util from '../../util/util.js'
import {
  STUDY_RUNNING_ITEM_NUM,
  STUDY_RUNNING_CACHE_NUM,
} from '../../constants/global'
export default {
  components: {
    studyItem,
  },
  setup() {
    const dateVal = ref('')
    const priceVal = ref('')
    const cardSpanLen = ref(6);
    const pageNum = ref(0)
    const headerFontSize = ref(window.innerWidth * 0.0006 + "em");
    const priceOptions = [
      {
        label: '0-50',
        value: 'zero_to_fifty',
      },
      {
        label: '51-100',
        value: 'fifty_to_hundred',
      },
      {
        label: '>100',
        value: 'larger_than_hundred'
      }
    ]
    const rowData = reactive({
      firstRow: [],
      secondRow: []
    })
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
    const store = useStore();
    const getRows = async () => {
      console.log('getRows')
      const listParam = {
        page_index: 0,
        page_size: STUDY_RUNNING_CACHE_NUM,
      }
      const [err] = await util.asyncCall(
        store.dispatch('studyInfo/getStudyListFromServer',
        {
          listParam,
        })
      )
      if (err) {
        console.log(err)
        ElMessageBox.alert('网络错误' + ' ,请刷新页面', '网络错误')
      }
      const rows = store.getters['studyInfo/getStudyRowsByPageId'](1)
      pageNum.value = Math.ceil(store.state.studyInfo.studyListCnt / STUDY_RUNNING_ITEM_NUM)
      rowData.firstRow = rows.firstRow
      rowData.secondRow = rows.secondRow
    };
    const paginationClick = async (pageNum) => {
      console.log(pageNum)
      const {start, len} = store.getters['studyInfo/getCurrentStudyPageRange']
      console.log(start, len)
      if (pageNum >= start && pageNum < start + len) {
        console.log('in cache')
        const rows = store.getters['studyInfo/getStudyRowsByPageId'](pageNum)
        rowData.firstRow = rows.firstRow
        rowData.secondRow = rows.secondRow
      } else {
        const batchNum = STUDY_RUNNING_CACHE_NUM / STUDY_RUNNING_ITEM_NUM
        const startIdx = (Math.ceil(pageNum / batchNum) - 1) * STUDY_RUNNING_CACHE_NUM
        console.log('out cache', batchNum, startIdx)
        const [err] = await util.asyncCall(
          store.dispatch('studyInfo/getStudyListFromServer', {
            listParam: {
              page_index: startIdx,
              page_size: STUDY_RUNNING_CACHE_NUM,
          }})
        )
        if (err) {
          console.log(err)
          ElMessageBox.alert('网络错误' + ' ,请刷新页面', '网络错误')
        }
        const rows = store.getters['studyInfo/getStudyRowsByPageId'](pageNum)
        rowData.firstRow = rows.firstRow
        rowData.secondRow = rows.secondRow
      }
    }
    const navs = store.getters['pageInfo/getNavOptionsByRole'](store.state.userInfo.role);
    onMounted(() => {
      window.onresize = () => {
        headerFontSize.value = window.innerWidth * 0.0006 + "em";
      }
      getRows();
      store.commit("pageInfo/setNavOptionOptionList", navs);
    });
    return{
      dateVal,
      priceOptions,
      priceVal,
      headerFontSize,
      shortcuts,
      rowData,
      cardSpanLen,
      pageNum,
      paginationClick,
    };
  }
}
</script>

<style scoped>
#study-page{
  position: relative;
  width: 70%;
  height: 70%;
  left: 20%;
  top: 8%;
}
#study-page-header {
  display: table;
  position: relative;
  width: 66%;
  left: 10%;
  margin-bottom: 2%;
}
#study-page-body {
  position: relative;
  height: 90%;
  left: 5%;
}
#study-page-bottom .study-page-pagination {
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
#study-page-header .study-page-date{
  display: table-row;
}
#study-page-header .study-page-date .study-page-date-header {
  vertical-align: middle;
  color: #E5B75C;
  margin: 0;
  display: table-cell;
}
#study-page .study-page-date .date-picker-wrapper{
  display: table-cell;
  vertical-align: middle;
  margin: 0;
  position: relative;
  left: -4%;
}
#study-page .study-page-date .select-wrapper{
  display: table-cell;
  vertical-align: middle;
  margin: 0;
  position: relative;
  left: -2%;
}
.study-page-date {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.study-page-row{
  height: 50%;
}
/deep/ .el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background-color: #F1D160;
  color: var(--el-color-white);
  font-weight: 700;
}
/deep/ .el-pagination.is-background .el-pager li:not(.is-disabled):hover {
  color: #F1D160;
}
</style>