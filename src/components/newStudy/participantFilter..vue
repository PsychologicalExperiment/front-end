<template>
  <div id="participant-filter">
    <el-form :model="filterData" status-icon label-position="top">
      <el-form-item v-for="item in studyData" :key="item.key" :label="item.label">
        <input-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive } from "vue";
import inputItem from "../modules/inputItem.vue";

export default {
  components: {
    inputItem,
  },
  setup() {
    const filterData = reactive([
      {
        type: "normalInput",
        value: "",
        label: "谁有权限查看你的研究",
        placeholder: "请输入条件",
        key: "topic",
      },
      {
        type: "normalInput",
        value: "",
        label: "2、谁有权限查看你的研究",
        placeholder: "请输入条件",
        key: "name",
      },
      {
        type: "normalInput",
        value: "",
        label: "3、谁有权限查看你的研究",
        placeholder: "请输入条件",
        key: "desc",
      }
    ])
    return {
      filterData,
    }
  }
}
</script>