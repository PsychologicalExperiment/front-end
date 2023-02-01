<template>
  <div id="study-info">
    <el-form :model="studyData" status-icon label-position="top">
      <el-form-item v-for="item in studyData" :key="item.key" :label="item.label">
        <input-item v-model="item.value" :input-item-data="item"></input-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import inputItem from "../modules/inputItem.vue";

export default {
  name: "studyInfo",
  props: {
    studyData: {
      type: Array,
    }
  },
  components: {
    inputItem,
  },
}
</script>

<style>
#study-info{
  position: absolute;
  left: 10%;
  width: 80%;
  top: 8%;
}
</style>