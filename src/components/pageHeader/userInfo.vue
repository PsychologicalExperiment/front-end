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
    </el-card>
  </el-popover>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { UserFilled } from '@element-plus/icons-vue';

export default {
  name: "userInfo",
  setup() {
    const store = useStore();
    const userMsg = reactive({...store.state.userInfo})
    console.log(userMsg)
    return {
      userMsg,
      UserFilled
    }
  }
}
</script>

<style>
.card-header span{
  font-weight: bold;
}
</style>