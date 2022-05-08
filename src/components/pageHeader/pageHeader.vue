<template>
  <div id="page-header" :style="{ height: pageHeaderHeight }">
    <div id="header-top" :style="{ height: headerTopHeight }">
      <img
        src="../../assets/logo.png"
        class="logo-style"
        :style="{ height: logoSize, width: logoSize, top: logoTopStyleVal }"
      />
      <el-button
        v-if="isShowLoginButton"
        type="primary"
        class="login-button"
        :style="{ marginTop: loginButtonMarginTop, marginRight: loginButtonMarginRight }"
        @click="handleClickLogin"
      >
        登录
      </el-button>
    </div>
    <div v-if="isInHomePage" id="header-middle">
      <img class="home-page-theme" src="/pic/book-library-with-open-textbook.jpg" />
    </div>
    <div id="header-bottom" :style="{ height: headerBottomHeight }">
      <el-menu
        :default-active="activedMenu >= 0 ? activedMenu : null"
        mode="horizontal"
        background-color="#000000"
        text-color="#ffffff"
        active-text-color="#ffd04b"
        id="head-nav"
        :key="navKey"
      >
        <el-menu-item
          v-for="(item, index) in navMenuList"
          :key="index"
          :index="index.toString()"
          @click="clickMenuItem(item)"
        >
          <el-icon v-if="item.isWithIcon">
            <component :is="item.iconClass"> </component>
          </el-icon>
          <span>{{ item.value }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, watch, ref, onMounted } from "vue";
import { ROUTE_NAME_LOGIN, ROUTE_NAME_HOME } from "../../constants/global";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let navMenuList = computed(() => store.state.pageInfo.navMenuOptionList);
    let navKey = ref(0);
    const activedMenu = computed(() => store.state.pageInfo.activedMenu);
    const isInHomePage = computed(() => route.name == ROUTE_NAME_HOME);
    const isShowLoginButton = computed(() => {
      return !store.state.userInfo.isLogin && route.name == ROUTE_NAME_HOME;
    });
    const loginButtonMarginTop = ref(window.innerHeight * 0.02 + "px");
    const loginButtonMarginRight = ref(window.innerWidth * 0.03 + "px");
    const handleClickLogin = () => {
      router.push({ name: ROUTE_NAME_LOGIN });
    };
    const headerTopHeight = computed(() => {
      if (route.name == ROUTE_NAME_HOME) {
        return "13%";
      } else {
        return "60%";
      }
    });
    const pageHeaderHeight = computed(() => {
      if (route.name == ROUTE_NAME_HOME) {
        return "60%";
      } else {
        return "13%";
      }
    });
    const headerBottomHeight = computed(() => {
      if (route.name == ROUTE_NAME_HOME) {
        return "8.6666%";
      } else {
        return "40%";
      }
    });
    const logoTopStyleVal = computed(() => {
      if (route.name == ROUTE_NAME_HOME) {
        return "1.7333%";
      } else {
        return "8%";
      }
    });
    const clickMenuItem = (menuItem) => {
      router.push({
        name: menuItem.routerName,
      });
    };
    watch(
      navMenuList,
      () => {
        navKey.value = 1 - navKey.value;
      },
      { deep: true }
    );
    onMounted(() => {
      window.onresize = () => {
        loginButtonMarginTop.value = window.innerHeight * 0.02 + "px";
        loginButtonMarginRight.value = window.innerWidth * 0.03 + "px";
      };
    });
    return {
      clickMenuItem,
      logoTopStyleVal,
      headerTopHeight,
      headerBottomHeight,
      pageHeaderHeight,
      isInHomePage,
      handleClickLogin,
      loginButtonMarginTop,
      loginButtonMarginRight,
      isShowLoginButton,
      navKey,
      navMenuList,
      activedMenu,
      logoSize: computed(() => {
        return window.innerHeight * 0.05 + "px";
      }),
    };
  },
};
</script>

<style scoped>
#page-header {
  position: relative;
}
#header-top {
  margin: 0;
}
#header-bottom {
  margin: 0;
  background-color: #000000;
}
#header-middle {
  height: 75%;
}
.home-page-theme {
  height: 100%;
  width: 100%;
}
.logo-style {
  position: absolute;
  left: 8%;
}
#head-nav {
  height: 100%;
  width: 80%;
  left: 10%;
  border: 0;
}
.login-button {
  float: right;
}
.el-menu-item:hover,
.el-menu-item:focus {
  border-bottom: 2px solid var(--el-menu-active-color);
  color: var(--el-menu-active-color) !important;
}
</style>
