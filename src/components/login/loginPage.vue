<template>
  <div id="login-wrapper">
    <div id="login-header">
      <p>请登录</p>
    </div>
    <div id="login-body">
      <div id="login-body-form">
        <el-form :model="formData" status-icon label-position="top">
          <el-form-item v-for="item in formData" :key="item.key" :label="item.label">
            <input-item v-model="item.value" :input-item-data="item"></input-item>
          </el-form-item>
        </el-form>
        <div id="login-button-wrapper">
          <el-button @click="login" class="form-button" type="primary">登录</el-button>
        </div>
        <div id="register-button-wrapper">
          <el-button @click="register" class="form-button">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import inputItem from "../modules/inputItem.vue";
import { useStore } from "vuex";
import { NAV_MENU_OPTION_BACK_TO_HOME } from "../../constants/global";
import { useRouter } from "vue-router";
import { ROUTE_NAME_REGISTER } from "../../constants/global";

export default {
  components: {
    inputItem,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formData = reactive([
      {
        type: "normalInput",
        value: "",
        label: "电子邮箱/电话号码",
        placeholder: "请输入电子邮箱或电话号码",
        key: "account",
      },
      {
        type: "passwordInput",
        value: "",
        label: "密码",
        placeholder: "请输入密码",
        key: "password",
      },
    ]);
    const login = () => {
      console.log(formData);
    };
    const register = () => {
      // console.log("reister");
      router.push({ name: ROUTE_NAME_REGISTER });
    };
    onMounted(() => {
      store.commit("pageInfo/setNavOptionOptionList", [NAV_MENU_OPTION_BACK_TO_HOME]);
    });
    return {
      formData,
      login,
      register,
    };
  },
};
</script>

<style lang="scss" scoped>
#login-wrapper {
  position: relative;
  left: 31%;
  top: 13%;
  width: 37%;
  height: 45%;
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px;
  border-color: #e3e5ea;
}
#login-header {
  position: absolute;
  width: 100%;
  height: 15%;
  background-color: #fafafa;
}
#login-header p {
  position: absolute;
  top: 30%;
  left: 45%;
  margin: 0;
}
#login-body {
  position: absolute;
  top: 20%;
  width: 100%;
  height: 100%;
}
#login-body-form {
  position: absolute;
  left: 20%;
  width: 60%;
  height: 100%;
}
#login-body-form .el-form {
  height: 50%;
}
#login-body-form .el-form .el-form-item {
  height: 30%;
}
/deep/ #login-body-form .el-form .el-form-item__content {
  height: 60%;
}
#login-button-wrapper {
  position: absolute;
  width: 100%;
  left: 0%;
  top: 45%;
  height: 9%;
}
#register-button-wrapper {
  position: absolute;
  width: 100%;
  left: 0%;
  top: 60%;
  height: 9%;
}
.form-button {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
