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
          v-for="(item, index) in firstRow"
          :key="index"
          :span="cardSpanLen"
          :offset="index > 0 ? 1 : 0"
        >
          <study-item :studyItemData="item"></study-item>
        </el-col>
      </el-row>
      <el-row class="study-page-row">
        <el-col
          v-for="(item, index) in secondRow"
          :key="index"
          :span="cardSpanLen"
          :offset="index > 0 ? 1 : 0"
        >
          <study-item :studyItemData="item"></study-item>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import studyItem from './studyItem.vue'
export default {
  components: {
    studyItem,
  },
  setup() {
    const dateVal = ref('')
    const priceVal = ref('')
    const cardSpanLen = ref(6);
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
    const firstRow = [
      {
        title: '研究测试样例，这是一条研究，研究主题是如何开发一个实验招募系统，测试测试测试',
        duration: '30分钟',
        price: '$30'
      },
      {
        title: '研究测试样例，这是一条研究，研究主题是猫猫为何怕我，测试测试测试',
        duration: '10分钟',
        price: '$50'
      },
      {
        title: '研究测试样例，这是一条研究，研究主题伊布怎么进化成仙子伊布，测试测试测试',
        duration: '1小时',
        price: '$100'
      }
    ]
    const secondRow = [
      {
        title: '研究测试样例，这是一条研究，研究主题是如何开发一个实验招募系统2，测试测试测试',
        duration: '30分钟',
        price: '$30'
      },
      {
        title: '研究测试样例，这是一条研究，研究主题是猫猫为何怕我2，测试测试测试',
        duration: '10分钟',
        price: '$50'
      }
    ]
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
    onMounted(() => {
      headerFontSize.value = ref(window.innerWidth * 0.0012 + "em");
    });
    return{
      dateVal,
      priceOptions,
      priceVal,
      headerFontSize,
      shortcuts,
      firstRow,
      cardSpanLen,
      secondRow,
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
  width: 90%;
  left: 5%;
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
</style>