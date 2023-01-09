<template>
  <page-header></page-header>
  <router-view></router-view>
</template>

<script>
import PageHeader from "./components/pageHeader/pageHeader.vue";
import { RouterView } from "vue-router";
import { onMounted } from 'vue'

export default {
  name: "App",
  components: {
    RouterView,
    PageHeader,
  },
  setup() {
    onMounted(() => {
      document.body.style.setProperty('--el-color-primary', '#F1D160');
    })
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  height: 100%;
}
html {
  height: 100%;
}
body {
  height: 100%;
  background-color: #f9f9f9;
}
</style>
