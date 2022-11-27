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
  <template v-else-if="inputItemData.type == 'textareaInput'">
    <el-input
      class="input-style"
      type="textarea"
      :rows="3"
      :placeholder="inputItemData.placeholder"
      :value="inputItemData.value">
    </el-input>
  </template>
  <template v-else-if="inputItemData.type === 'radioInputGroup'">
    <el-radio-group
      class="input-style"
      :label="inputItemData.label"
      :value="inputItemData.value"
    >
      <el-radio
        v-for="(label, idx) in inputItemData.labels"
        :key="idx"
        :label="label"
      ></el-radio>
    </el-radio-group>
  </template>
  <template v-else-if="inputItemData.type === 'selectInput'">
    <el-select :label="inputItemData.label" :value="inputItemData.value">
      <el-option
        v-for="item in inputItemData.labels"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>
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
