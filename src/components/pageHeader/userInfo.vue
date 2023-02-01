<template>
  <div id="user-info-wrapper">
    <el-popover
      placement="bottom"
      width="200"
      trigger="click"
    >
    <template #reference>
      <el-avatar :icon="UserFilled" class="user-avatar" />
    </template>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{userMsg.userName}}</span>
        </div>
      </template>
      <div>{{ '手机号码：' + userMsg.phoneNumber }}</div>
      <div>{{ '电子邮箱：' + userMsg.email }}</div>
      <div>{{ '用户性别：' + userMsg.gender }}</div>
      <div>{{ '用户类型：' + userMsg.role }}</div>
      <div id="logout-wrapper">
        <el-button
          :icon="SwitchButton" 
          class="logout-button"
          @click="clickLogout"
        >
          退出登陆
        </el-button>
      </div>
    </el-card>
  </el-popover>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { UserFilled } from '@element-plus/icons-vue';
import { SwitchButton } from '@element-plus/icons-vue';
import userApi from "../../api/userInfo";
import util from '../../util/util.js';
import { ElMessage } from 'element-plus';
import { useRouter } from "vue-router";
import { ROUTE_NAME_HOME } from "../../constants/global";

export default {
  name: "userInfo",
  setup() {
    const store = useStore();
    const router = useRouter();
    const userMsg = reactive({...store.state.userInfo})
    const clickLogout = async () => {
      const [err] = await util.asyncCall(userApi.logout())
      if (err) {
        ElMessage({
          showClose: true,
          message: '网络错误，请重试',
          type: 'error',
        })
        return
      }
      store.commit("userInfo/userLogout")
      router.push({ name: ROUTE_NAME_HOME })
    } 
    return {
      userMsg,
      UserFilled,
      SwitchButton,
      clickLogout,
    }
  }
}
</script>

<style scoped>
.card-header span{
  font-weight: bold;
}
#logout-wrapper {
  margin-top: 15px;
}
#logout-wrapper .logout-button{
  margin-left: 50%;
}
</style>