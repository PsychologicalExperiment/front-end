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
import { reactive } from "vue";
import inputItem from "../modules/inputItem.vue";

export default {
  name: "studyInfo",
  components: {
    inputItem,
  },
  setup() {
    const studyData = reactive([
      {
        type: "normalInput",
        value: "",
        label: "1、你的研究课题是什么",
        placeholder: "请输入研究课题",
        key: "topic",
      },
      {
        type: "normalInput",
        value: "",
        label: "2、为您的研究指定内部名称（仅您可见）",
        placeholder: "请输入内部名称",
        key: "name",
      },
      {
        type: "textareaInput",
        value: "",
        label: "3、描述参与者将在本研究中做什么",
        placeholder: "请输入描述",
        key: "desc",
      }
    ])
    return {
      studyData,
    }
  }
}
</script>

<style>
#study-info{
  position: absolute;
  left: 10%;
  width: 80%;
  top: 13%;
}
</style>