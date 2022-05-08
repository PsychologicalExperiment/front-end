<template>
  <template v-if="inputItemData.type === 'normalInput'">
    <el-input
      class="input-style"
      :value="inputItemData.value"
      :placeholder="inputItemData.placeholder"
    >
    </el-input>
  </template>
  <template v-else-if="inputItemData.type === 'passwordInput'">
    <el-input
      class="input-style"
      :value="inputItemData.value"
      :placeholder="inputItemData.placeholder"
      show-password
    >
    </el-input>
  </template>
</template>

<script>
export default {
  name: "inputItem",
  props: {
    inputItemData: {
      type: Object,
    },
  },
  setup(_, { emit }) {
    const updateValue = (value, event) => {
      console.log(value);
      emit(event, value);
    };
    return {
      updateValue,
    };
  },
};
</script>

<style scoped>
.input-style {
  margin: 0;
  width: 100%;
  height: 100%;
}
.el-input__inner {
  height: 500px;
}
</style>
