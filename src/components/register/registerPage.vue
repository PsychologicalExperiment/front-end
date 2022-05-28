<template>
  <div id="login-wrapper">
    <div>
      <p>注册</p>
    </div>
    <div id="login-body">
      <div id="login-body-form">
        <el-form :model="formData" status-icon label-position="top">
          <el-form-item
            v-for="item in formData"
            :key="item.key"
            :label="item.label"
          >
            <input-item
              v-model="item.value"
              :input-item-data="item"
            ></input-item>
          </el-form-item>
        </el-form>
        <div id="register-button-wrapper">
          <el-button
            @click="handleClickRegister"
            class="form-button"
            type="primary"
            >注册</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import inputItem from "../modules/inputItem.vue";

// import { useStore } from "vuex";
import { reactive } from "vue";
// import { useRouter } from "vue-router";
// import { ROUTE_NAME_REGISTER } from "../../constants/global";

export default {
  components: {
    inputItem,
  },
  setup() {
    // const store = useStore();
    // const router = useRouter();
    const formData = reactive([
      {
        type: "normalInput",
        value: "",
        label: "电子邮箱",
        placeholder: "请输入电子邮箱",
        key: "email",
      },
      {
        type: "normalInput",
        value: "",
        label: "手机号码",
        placeholder: "请输入电话号码",
        key: "mobile",
      },
      {
        type: "passwordInput",
        value: "",
        label: "密码",
        placeholder: "请输入密码",
        key: "password",
      },
      {
        type: "passwordInput",
        value: "",
        label: "再次输入密码",
        placeholder: "请输入密码",
        key: "password_confirm",
      },
      {
        type: "radioInputGroup",
        label: "性别",
        value: "",
        // label1: "男",
        labels: ["男", "女"],
        key: "sex",
      },
      {
        type: "selectInput",
        label: "民族",
        value: "",
        labels: [
          { label: "汉族", value: "" },
          { label: "维吾尔族", value: "" },
          { label: "壮族", value: "" },
        ],
        key: "mz",
      },
    ]);
    const handleClickRegister = () => {
      //   router.push({ name: ROUTE_NAME_REGISTER });
    };
    return {
      formData,
      handleClickRegister,
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
  height: 80%;
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
  top: 10%;
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
  height: 20%;
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
  top: 75%;
  height: 5%;
}
.form-button {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
