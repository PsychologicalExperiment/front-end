<template>
  <div id="study-info-banner">
    <el-icon id="banner-icon" color="#FCF5DD" :size="bannerIconSize">
      <comment />
    </el-icon>
    <div class="banner-text">
      <span class="home-page-banner-span" :style="{ fontSize: bannerFontSize }">
        描述您的研究项目并快速发布实验
      </span>
    </div>
  </div>
  <div id="study-info-wrapper">
    <study-info></study-info>
  </div>
  <div id="submit-study-wrapper">
    <el-button class="form-button">建立研究项目</el-button>
  </div>
</template>

<script>
import studyInfo from "./studyInfo.vue"
import { ref, onMounted } from "vue";

export default {
  components: {
    studyInfo,
  },
  setup() {
    const bannerIconSize = ref(Math.round(window.innerHeight * 0.1));
    const bannerFontSize = ref(window.innerHeight * 0.0015 + "em");
    onMounted(() => {
      window.onresize = () => {
        bannerIconSize.value = Math.round(window.innerHeight * 0.1);
        bannerFontSize.value = window.innerHeight * 0.0015 + "em";
      };
    });
    return {
      bannerIconSize,
      bannerFontSize,
    }
  }
}
</script>

<style scoped>
#study-info-banner{
  position: relative;
  width: 70%;
  height: 17%;
  left: 15%;
}
#banner-icon {
  position: absolute;
  top: 20%;
  left: 0.5%;
}
#study-info-wrapper{
  position: relative;
  width: 70%;
  height: 35%;
  overflow: auto;
  left: 15%;
  background: #FFFFFF;
}
#submit-study-wrapper{
  position: relative;
  top: 20%;
  width: 70%;
  left: 15%;
  top: 12%;
  height: 4%;
}
.form-button {
  margin: 0;
  width: 50%;
  height: 100%;
  background-color: #F0D060;
}
#study-info-banner .banner-text{
  position: absolute;
  left: 5%;
  top: 45%;
}
#study-info-banner .banner-text .home-page-banner-span {
  color: #9a9a9a;
}
</style>