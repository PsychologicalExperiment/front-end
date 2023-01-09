<template>
  <div id="home-page-banner">
    <el-icon id="banner-icon" color="#FCF5DD" :size="bannerIconSize">
      <comment />
    </el-icon>
    <div class="home-page-banner-text">
      <span class="home-page-banner-span" :style="{ fontSize: bannerFontSize }">
        快速向万名值得信赖的参与者启动您的研究。按需选择实验所需参与者或样本。爱实验系统为您的专业在线研究提供服务
      </span>
    </div>
    <div id="banner-divder">
      <el-divider></el-divider>
    </div>
  </div>
  <div id="service-part">
    <div id="service-title">
      <div class="service-wrapper">
        <el-icon color="#F0D060" :size="titleIconSize" class="service-icon">
          <expand />
        </el-icon>
        <span :style="{ fontSize: titleFontSize }" class="service-title-text">
          特性&amp;功能
        </span>
      </div>
    </div>
    <div id="service-desc">
      <span class="service-desc-text" :style="{ fontSize: svcDescFontSize }">
        利用本页面进行您的研究
      </span>
    </div>
    <div id="service-content">
      <el-row>
        <el-col
          v-for="(item, index) in serviceCards"
          :key="index"
          :span="cardSpanLen"
          :offset="index > 0 ? 1 : 0"
        >
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img
              :src="item.pic"
              class="card-img"
              :style="{ width: cardImgWidth, height: cardImgHeight }"
            />
            <div class="card-text-box clearfix">
              <p class="card-title" :style="{ fontSize: cardTitleFontSize }">
                {{ item.title }}
              </p>
              <p class="card-desc" :style="{ fontSize: cardDescFontSize }">
                {{ item.desc }}
              </p>
              <div class="card-summary" :style="{ height: summaryHeight }">
                <span class="card-summary-text" :style="{ fontSize: summaryFontSize }">
                  {{ item.summary }}
                </span>
                <el-icon class="card-summary-icon" :size="summaryIconSize">
                  <right />
                </el-icon>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const serviceCards = reactive([
      {
        title: "功能一",
        desc: "这是功能一的内容",
        summary: "查看详情",
        pic: "/pic/desc1.jpeg",
      },
      {
        title: "功能二",
        desc:
          "这是功能二的内容，这是功能二的内容，这是功能二的内容（测试长一点的文本测试长一点的文本测试长一点的文本测试长一点的文本）",
        summary: "查看详情",
        pic: "/pic/desc2.jpeg",
      },
      {
        title: "功能三",
        desc: "这是功能三的内容，这是功能三的内容",
        summary: "查看详情",
        pic: "/pic/desc3.jpeg",
      },
      {
        title: "功能四",
        desc: "这是功能四的内容，这是功能四的内容",
        summary: "查看详情",
        pic: "/pic/desc4.jpeg",
      },
    ]);
    const bannerIconSize = ref(Math.round(window.innerWidth * 0.07));
    const bannerFontSize = ref(window.innerWidth * 0.0012 + "em");
    const titleIconSize = ref(Math.round(bannerIconSize.value * 0.3));
    const titleFontSize = ref(window.innerWidth * 0.001 + "em");
    const svcDescFontSize = ref(window.innerWidth * 0.0009 + "em");
    const cardImgHeight = ref(window.innerWidth * 0.15 + "px");
    const cardImgWidth = ref(window.innerWidth * 0.17 + "px");
    const cardTitleFontSize = ref(window.innerWidth * 0.0009 + "em");
    const cardDescFontSize = ref(window.innerWidth * 0.0006 + "em");
    const summaryHeight = ref(window.innerWidth * 0.05 + "px");
    const summaryIconMarginTop = ref(window.innerWidth * 0.015 + "px");
    const summaryFontSize = ref(window.innerWidth * 0.0008 + "em");
    const summaryIconSize = ref(Math.round(bannerIconSize.value * 0.25));
    //24为element-ui el-row总长度
    const cardSpanLen = ref(5);
    const store = useStore();
    const navs = store.getters['pageInfo/getNavOptionsByRole'](store.state.userInfo.role);
    onMounted(() => {
      window.onresize = () => {
        bannerIconSize.value = Math.round(window.innerWidth * 0.07);
        bannerFontSize.value = window.innerWidth * 0.0012 + "em";
        titleIconSize.value = Math.round(bannerIconSize.value * 0.3);
        titleFontSize.value = window.innerWidth * 0.001 + "em";
        svcDescFontSize.value = window.innerWidth * 0.0009 + "em";
        cardImgHeight.value = window.innerWidth * 0.15 + "px";
        cardImgWidth.value = window.innerWidth * 0.17 + "px";
        cardTitleFontSize.value = window.innerWidth * 0.0009 + "em";
        cardDescFontSize.value = window.innerWidth * 0.0006 + "em";
        summaryHeight.value = window.innerWidth * 0.05 + "px";
        summaryIconMarginTop.value = window.innerWidth * 0.015 + "px";
        summaryFontSize.value = window.innerWidth * 0.00075 + "em";
        summaryIconSize.value = Math.round(bannerIconSize.value * 0.25);
      };
      store.commit("pageInfo/setNavOptionOptionList", navs);
    });
    return {
      serviceCards,
      cardSpanLen,
      bannerIconSize,
      bannerFontSize,
      titleIconSize,
      titleFontSize,
      svcDescFontSize,
      cardImgHeight,
      cardImgWidth,
      cardTitleFontSize,
      cardDescFontSize,
      summaryHeight,
      summaryIconMarginTop,
      summaryFontSize,
      summaryIconSize,
    };
  },
};
</script>

<style scoped>
#home-page-banner {
  position: relative;
  height: 40%;
  overflow: auto;
}
#service-part {
  position: relative;
  height: 80%;
  overflow: auto;
}
.home-page-banner-text {
  position: absolute;
  left: 17%;
  width: 68%;
  top: 32%;
}
#banner-icon {
  position: absolute;
  top: 20%;
  left: 13%;
}
.home-page-banner-span {
  word-break: break-word;
}
#banner-divder {
  position: absolute;
  left: 10%;
  bottom: 8%;
  width: 80%;
}
#service-title {
  position: absolute;
  left: 10%;
  height: 8%;
  width: 80%;
}
.service-wrapper {
  position: absolute;
  left: 0%;
  width: 100%;
}
.service-icon {
  position: absolute;
  left: 1%;
}
.service-title-text {
  position: absolute;
  left: 5%;
  font-weight: bold;
}
#service-desc {
  height: 5%;
  position: absolute;
  width: 80%;
  left: 10%;
  top: 8%;
}
.service-desc-text {
  position: absolute;
  left: 2%;
  top: 2%;
  color: #9a9a9a;
}
#service-content {
  position: absolute;
  top: 25%;
  width: 80%;
  height: 75%;
  left: 10%;
}
.card-text-box {
  padding: 2%;
}
.card-title {
  color: #000000;
  font-weight: bold;
  margin: 0;
  padding: 2% 0 5% 2%;
  text-align: left;
}
.card-desc {
  width: 100%;
  text-align: left;
  margin: 0;
  color: #a5a5a5;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.card-img {
  display: block;
}
.card-summary {
  margin: 25% 0 0 0;
  background-color: #f4f4f4;
}
.card-summary-text {
  float: left;
  margin-left: 5%;
  font-weight: bold;
  margin-top: 10%;
}
.card-summary-icon {
  float: right;
  margin-top: 10.5%;
  margin-right: 4%;
}
</style>
