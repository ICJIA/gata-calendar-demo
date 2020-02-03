<template>
  <div>
    <div ref="Test02">
      <h1>Component02</h1>
      <h2 class="tocHeading-1">Heading 1 - tocHeading-1</h2>
      <h2 class="tocHeading-1">Heading 2 - tocHeading-1</h2>
      <h2 class="tocHeading-1">Heading 3 - tocHeading-1</h2>
      <div v-if="headings">{{ headings }}<br />Active tab: {{ activeTab }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headings: null
    };
  },
  props: {
    activeTab: {
      type: Number,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      console.log("component2");
      this.getHeadings();
    });
  },
  methods: {
    getHeadings() {
      let headings = document.getElementsByClassName(`tocHeading-1`);
      this.headings = Array.from(headings);
    }
  }
};
</script>

<style lang="scss" scoped></style>
