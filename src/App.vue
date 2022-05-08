<template>
  <page-header></page-header>
  <router-view></router-view>
</template>

<script>
import PageHeader from "./components/pageHeader/pageHeader.vue";
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    RouterView,
    PageHeader,
  },
};
</script>
PageHeader

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
