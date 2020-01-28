<template>
  <div>
    {{ events }}
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped></style>
