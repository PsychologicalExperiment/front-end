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
    <study-info :studyData="studyData"></study-info>
  </div>
  <div id="submit-study-wrapper">
    <el-button 
      class="form-button"
      @click="submitClick"
    >
      建立研究项目
    </el-button>
  </div>
</template>

<script>
import studyInfo from "./studyInfo.vue"
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { ElMessage } from 'element-plus';
import util from '../../util/util.js'
import studyApi from "../../api/studyInfo";
import { useRouter } from "vue-router";
import {
  ROUTER_NAME_NEW_RUNNING
} from '../../constants/global'

export default {
  components: {
    studyInfo,
  },
  setup() {
    const bannerIconSize = ref(Math.round(window.innerHeight * 0.1));
    const bannerFontSize = ref(window.innerHeight * 0.0015 + "em");
    const store = useStore();
    const router = useRouter();
    const navs = store.getters['pageInfo/getNavOptionsByRole'](store.state.userInfo.role);
    onMounted(() => {
      window.onresize = () => {
        bannerIconSize.value = Math.round(window.innerHeight * 0.1);
        bannerFontSize.value = window.innerHeight * 0.0015 + "em";
      };
      store.commit("pageInfo/setNavOptionOptionList", navs);
    });
    const studyData = reactive([
      {
        type: "normalInput",
        value: "",
        label: "1、您的研究课题是什么",
        placeholder: "请输入研究课题",
        key: "title",
      },
      {
        type: "normalInput",
        value: "",
        label: "2、您的研究课题预计耗时(单位：分钟)",
        placeholder: "请输入预计耗时",
        key: "duration",
      },
      {
        type: "normalInput",
        value: "",
        label: "3、参与您的研究课题可获得的报酬是多少",
        placeholder: "请输入报酬",
        key: "price",
      },
      {
        type: "normalInput",
        value: "",
        label: "4、实验所需人数",
        placeholder: "请输入所需人数",
        key: "participant_num",
      },
      {
        type: "textareaInput",
        value: "",
        label: "5、描述参与者将在本研究中做什么",
        placeholder: "请输入描述",
        key: "desc",
      }
    ])
    const submitClick = async () => {
      console.log(studyData)
      let [err] = await util.asyncCall(studyApi.createStudy(
        {
          title: studyData[0].value,
          description: studyData[4].value,
          experiment_time: Number(studyData[1].value),
          participant_num: Number(studyData[3].value),
          price: studyData[2].value
        }
      ))
      if (err) {
        console.log(err)
        ElMessage({
            showClose: true,
            message: '网络错误，请重试',
            type: 'error',
          })
      } else {
        router.push({ name: ROUTER_NAME_NEW_RUNNING })
      }
    }
    return {
      bannerIconSize,
      bannerFontSize,
      studyData,
      submitClick
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
  height: 55%;
  overflow: auto;
  left: 15%;
  background: #FFFFFF;
}
#submit-study-wrapper{
  position: relative;
  top: 20%;
  width: 70%;
  left: 15%;
  top: 5%;
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