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
        <div id="verify-button-wrapper">
          <el-button
            @click="handleSendVerifyCode"
            class="form-button"
          >
            发送验证码
          </el-button>
        </div>
        <div id="register-button-wrapper">
          <el-button
            @click="handleClickRegister"
            class="form-button"
            type="primary"
          >
            注册
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import inputItem from "../modules/inputItem.vue";
import util from '../../util/util.js';
import userApi from "../../api/userInfo";
import { ElMessage } from 'element-plus';
import md5 from 'js-md5';
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
        type: "normalInput",
        value: "",
        label: "用户名",
        placeholder: "请输入用户名",
        key: "user_name",
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
        type: "radioInputGroup",
        label: "用户类型",
        value: "",
        labels: ["研究者", "参与者"],
        key: "sex",
      },
      {
        type: "normalInput",
        value: "",
        label: "验证码",
        placeholder: "请输入验证码",
        key: "verify_code",
      }
    ]);
    const handleClickRegister = async () => {
      const registerParam = {
        email: formData[0].value,
        phone_number: formData[1].value,
        user_name: formData[2].value,
        password: md5(formData[3].value),
        gender: formData[5].value === '女' ? 2 : 1,
        user_type: formData[6].value === '研究者' ? 1 : 2,
        verify_code: formData[7].value
      }
      let [err, ret] = await util.asyncCall(userApi.register(registerParam))
      if (err) {
        console.log(err)
        ElMessage({
          showClose: true,
          message: '网络错误，请重试',
          type: 'error',
        })
      } else {
        console.log(ret)
        ElMessage({
          showClose: true,
          message: '注册成功',
          type: 'success',
        })
      }
    };
    const handleSendVerifyCode = async () => {
      const email = formData[0].value
      const isValid = util.isEmail(email)
      if (!isValid) {
        ElMessage({
          showClose: true,
          message: '电子邮箱格式错误或为空，请重新输入',
          type: 'error',
        })
        return
      }
      let [err] = await util.asyncCall(userApi.sendVerifyCode(email))
      if (err) {
        console.log(err)
        ElMessage({
          showClose: true,
          message: '网络错误，请重试',
          type: 'error',
        })
      } else {
        ElMessage({
          showClose: true,
          message: '发送成功，请在您的邮箱查看验证码',
          type: 'success',
        })
      }
    };
    return {
      formData,
      handleClickRegister,
      handleSendVerifyCode,
    };
  },
};
</script>

<style scoped>
#login-wrapper {
  position: relative;
  left: 31%;
  top: 13%;
  width: 37%;
  height: 95%;
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
  height: 35%;
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
  top: 80%;
  height: 4.5%;
}
.form-button {
  margin: 0;
  width: 100%;
  height: 100%;
}
#verify-button-wrapper {
  position: absolute;
  width: 100%;
  left: 0%;
  top: 73%;
  height: 4.5%;
}
.form-button {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
