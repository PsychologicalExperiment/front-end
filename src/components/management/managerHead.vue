<template>
  <div class="manager-header-wrapper">
    <div class="submit-progress">
      <div class="progress-title">
        <span>提交进展</span>
      </div>
      <div class="progress-wrapper">
        <el-progress 
          type="circle" 
          color="#F1D160" 
          :width="150"
          :stroke-width="20"
          stroke-linecap="square"
          :percentage="studyBasicInfo.progress" 
        />
      </div>
    </div>
    <div id="study-info">
      <div id="study-publish-time">
        <span class="info-line-title">发布时间：</span>
        <span class="info-line-content">{{studyBasicInfo.publishTime}}</span>
      </div>
      <div id="study-reward">
        <span class="info-line-title">报酬：</span>
        <span class="info-line-content">{{studyBasicInfo.reward}}</span>
      </div>
      <div id="study-eligible">
        <span class="info-line-title">符合条件的参与者：</span>
        <span class="info-line-content">{{studyBasicInfo.eligible}}</span>
      </div>
      <div id="study-other-info">
        <span class="info-line-title">其他说明：</span>
        <span class="info-line-content">{{studyBasicInfo.otherInfo}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "magagerHeader",
  props: {
    studyBasicInfo: {
      type: Object,
    },
  }
}
</script>

<style scoped>
.manager-header-wrapper{
  height: 100%;
  position: relative;
  background-color: #FFFFFF;
  width: 80%;
  left: 10%;
}
.manager-header-wrapper .submit-progress{
  height: 100%;
  position: relative;
  left: 0;
  width: 25%;
}
.manager-header-wrapper #study-info{
  height: 90%;
  position: relative;
  width: 75%;
  left: 25%;
  top: -90%;
}
.manager-header-wrapper #study-info #study-publish-time {
  background-color: #F9F9F9;
  width: 85%;
  position: relative;
  left: 7.5%;
  height: 15%;
  top: 7%;
}

.manager-header-wrapper #study-info #study-reward {
  background-color: #F9F9F9;
  width: 85%;
  position: relative;
  left: 7.5%;
  height: 15%;
  top: 13%;
}
.manager-header-wrapper #study-info #study-eligible {
  background-color: #F9F9F9;
  width: 85%;
  position: relative;
  left: 7.5%;
  height: 15%;
  top: 19%;
}
.manager-header-wrapper #study-info #study-other-info {
  background-color: #F9F9F9;
  width: 85%;
  position: relative;
  left: 7.5%;
  height: 15%;
  top: 25%;
}
.manager-header-wrapper #study-info .info-line-title{
  color: #CACCCF;
  float: left;
  position: relative;
  left: 1.5%;
  top: 14%;
}
.manager-header-wrapper #study-info .info-line-content{
  float: right;
  font-weight: bold;
  position: relative;
  right: 1.5%;
  top: 14%;
}
.manager-header-wrapper .submit-progress .progress-title {
  position: relative;
  width: 30%;
  left: 9%;
  top: 15%;
  font-weight: bold;
}
.manager-header-wrapper .submit-progress .progress-wrapper {
  position: relative;
  left: 18%;
  top: 14%;
}
.manager-header-wrapper .submit-progress .progress-wrapper .el-progress--circle{
  font-weight: bold;
}
</style>