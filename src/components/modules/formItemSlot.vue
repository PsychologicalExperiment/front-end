<template>
  <div class="lot-wrapper">
    <slot v-for="item in formItemList" :name="item.type"></slot>
  </div>
</template>

<script>
export default {
  name: "formItemSlot",
  props: {
    formItemList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped></style>
