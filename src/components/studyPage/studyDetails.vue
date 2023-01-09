<template>
  <div id="study-detail">
    <div class="detail-wrapper">
      <el-row :gutter="20" class="detail-row">
        <el-col :span="6">
          <el-card id="brief-intro">
            <template #header>
              <el-icon id="intro-icon" color="#F1D160" :size="detailIconSize">
                <list />
              </el-icon>
              <div class="brief-header">
                <span>简介</span>
              </div>
            </template>
            <div class="brief-body">
              <div class="brief-body-item">
                <div class="brief-item-title">
                  <span :style="{ fontSize: briefTitleFontSize }">实验名称：</span>
                </div>
                <div class="brief-item-content">
                  <span :style="{ fontSize: briefContentFontSize }">{{expData.title}}</span>
                </div>
              </div>
              <div class="brief-body-item">
                <div class="brief-item-title">
                  <span :style="{ fontSize: briefTitleFontSize }">实验时间：</span>
                </div>
                <div class="brief-item-content">
                  <span :style="{ fontSize: briefContentFontSize }">{{expData.duration}}</span>
                </div>
              </div>
              <div class="brief-body-item">
                <div class="brief-item-title">
                  <span :style="{ fontSize: briefTitleFontSize }">实验费用：</span>
                </div>
                <div class="brief-item-content">
                  <span :style="{ fontSize: briefContentFontSize }">{{expData.price}}</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card id="study-detail">
            <template #header>
              <el-icon id="detail-icon" color="#F1D160" :size="detailIconSize">
                <histogram />
              </el-icon>
              <div class="detail-header">
                <span>实验详情</span>
              </div>
            </template>
            <div class="detail-body">
              <div class="detail-info-wrapper">
                <p class="detail-info">{{expData.detail}}</p>
              </div>
              <div class="detail-icon">
                <el-button circle="true" color="#F0D060">
                  <el-icon style="vertical-align: middle">
                    <monitor />
                  </el-icon>
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card id="study-op">
            <template #header>
              <el-icon id="op-icon" color="#F1D160" :size="detailIconSize">
                <operation />
              </el-icon>
              <div class="op-header">
                <span>操作</span>
              </div>
            </template>
            <div class="op-body">
              <div class="op-button-region">
                <div class="op-button-wrapper">
                  <el-button class="op-button">联系研究员</el-button>
                </div>
                <div class="op-button-wrapper">
                  <el-button class="op-button" color="#F1D160">去预约</el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const expData = {
      title: '一项关于冰淇淋的研究',
      duration: '2分钟',
      price: '$0.18',
      detail: '在两分钟的实验中，我们将要求您回答有关产品的几个问题，请注意，您需要一台电脑才能参与这项研究',
    }
    const store = useStore();
    const detailIconSize = ref(Math.round(window.innerWidth * 0.025))
    const briefContentFontSize = ref(window.innerWidth * 0.00046 + "em");
    const briefTitleFontSize = ref(window.innerWidth * 0.00045 + "em");
    const navs = store.getters['pageInfo/getNavOptionsByRole'](store.state.userInfo.role)
    onMounted(() => {
      window.onresize = () => {
        detailIconSize.value = Math.round(window.innerWidth * 0.025)
        briefContentFontSize.value = window.innerWidth * 0.00046 + "em"
        briefTitleFontSize.value = window.innerWidth * 0.00045 + "em"
      }
      store.commit("pageInfo/setNavOptionOptionList", navs);
    })
    return {
      expData,
      detailIconSize,
      briefContentFontSize,
      briefTitleFontSize
    }
  }
}
</script>

<style scoped>
#study-detail {
  position: relative;
  width: 70%;
  height: 70%;
  left: 15%;
}
#study-detail .detail-row{
  height: 85%;
  position: relative;
  top: 12%;
}
#study-detail .detail-wrapper{
  height: 100%;
}
#brief-intro {
  height: 85%;
}
/deep/ #brief-intro .el-card__body{
  height: 100%;
}
#brief-intro .brief-header{
  margin: 6%;
  font-weight: bold;
}
#brief-intro .brief-body {
  height: 100%;
  padding-top: 15%;
}
#brief-intro .brief-body .brief-body-item {
  height: 15%;
}
#brief-intro .brief-body .brief-body-item .brief-item-title{
  text-align: left;
  color: #CACCCF;
}
#brief-intro .brief-body .brief-body-item .brief-item-content{
  background-color: #F9F9F9;
  font-weight: bold;
  height: 35%;
  vertical-align: middle;
  margin-top: 5%;
  padding-top: 3%;
  text-align: center;
}
#study-detail {
  height: 85%;
}
/deep/ #study-detail .el-card__body{
  height: 100%;
}
#study-detail .detail-header{
  margin: 4%;
  font-weight: bold;
}
#study-detail .detail-body{
  height: 100%;
  padding-top: 15%;
}
#study-detail .detail-body .detail-info-wrapper {
  padding-left: 10%;
  width: 80%;
}
#study-detail .detail-body .detail-info-wrapper .detail-info {
  word-break: break-word;
  line-height: 40px;
}
#study-detail .detail-body .detail-icon{
  padding-top: 15%;
}
#study-op .op-header{
  margin: 6%;
  font-weight: bold;
}
#study-op{
  height: 85%;
}
/deep/ #study-op .el-card__body{
  height: 100%;
}
#study-op .op-body{
  height: 100%;
}
#study-op .op-body .op-button-region{
  height: 85%;
  padding-top: 30%;
}
#study-op .op-button-wrapper{
  width: 90%;
  margin-top: 10%;
  margin-left: 5%;
  height: 10%;
}
#study-op .op-button {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>