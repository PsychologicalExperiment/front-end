<template>
  <div class="study-box">
    <div class="study-box-icon">
      <el-icon color='#F9D88F' :size="searchIconSize">
        <data-analysis/>
      </el-icon>
    </div>
    <div class="study-box-text">
      <p class="study-box-title" :style="{ fontSize: cardTitleFontSize}">
        {{studyItemData.title}}
      </p>
      <div class="study-box-table">
        <div class="study-box-duration">
          <span class="study-box-duration-title">实验时间:</span>
          <span class="study-box-duration-content">
            {{studyItemData.duration}}
          </span>
        </div>
        <div class="study-box-price">
          <span class="study-box-price-title">实验费用:</span>
          <span class="study-box-price-content">
            {{studyItemData.price}}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="study-box-button">
    <span class="study-botton-title">查看详情</span>
    <el-icon color='#F9D88F' :size="studyIconSize" class="study-botton-content">
      <caret-right/>
    </el-icon>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "studyItem",
  props: {
    studyItemData: {
      type: Object,
    },
  },
  setup(_, { emit }) {
    const updateValue = (value, event) => {
      console.log(value);
      emit(event, value);
    };
    const cardTitleFontSize = ref(window.innerWidth * 0.0006 + "em");
    const studyIconSize = ref(Math.round(window.innerWidth * 0.0175));
    const searchIconSize = ref(Math.round(window.innerWidth * 0.015));
    onMounted(() => {
      cardTitleFontSize.value = window.innerWidth * 0.0006 + "em";
      studyIconSize.value = Math.round(window.innerWidth * 0.02);
      searchIconSize.value = Math.round(window.innerWidth * 0.015);
    });
    return {
      updateValue,
      cardTitleFontSize,
      studyIconSize,
      searchIconSize,
    };
  },
}
</script>

<style scoped>
.study-box {
  position: relative;
  height: 65%;
  background-color: #FFFFFF;
  margin-bottom: 5%;
}
.study-box .study-box-icon{
  position: relative;
  left: 8%;
  top: 6%;
  width: 4%;
}
.study-box-text .study-box-title{
  font-weight: bold;
  text-align: left;
  padding-left: 5%;
  padding-right: 5%;
}
.study-box-text .study-box-duration{
  width: 100%;
  position: relative;
  display: table-row;
}
.study-box-text .study-box-duration .study-box-duration-title {
  display: table-cell;
  color: #CACCCF;
  text-align: left;
}
.study-box-text .study-box-duration .study-box-duration-content {
  display: table-cell;
  font-weight: bold;
  text-align: right;
}

.study-box-text .study-box-price{
  width: 100%;
  position: relative;
  display: table-row;
}
.study-box-text .study-box-price .study-box-price-title {
  display: table-cell;
  color: #CACCCF;
  text-align: left;
}
.study-box-text .study-box-price .study-box-price-content {
  display: table-cell;
  font-weight: bold;
  text-align: right;
}

.study-box-text .study-box-table {
  display: table;
  width: 86%;
  left: 7%;
  position: absolute;
  bottom: 5%;
}
.study-box-button{
  background-color: #FFFFFF;
  display: table;
  width: 100%;
  position: relative;
  height: 14%;
}
.study-box-button .study-botton-title {
  text-align: left;
  font-weight: bold;
  vertical-align: center;
  float: left;
  position: relative;
  top: 30%;
  left: 5%;
}
.study-box-button .study-botton-content {
  align-items: center;
  position: relative;
  top: 15%;
  left: 30%;
}
</style>