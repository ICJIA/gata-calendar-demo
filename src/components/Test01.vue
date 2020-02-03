<template>
  <div>
    <div ref="Test01">
      <h1>Component01</h1>
      <h2 class="tocHeading-0">Heading 1 - tocHeading-0</h2>
      <h2 class="tocHeading-0">Heading 2 - tocHeading-0</h2>
      <div v-if="headings">{{ headings }}<br />Active Tab: {{ activeTab }}</div>
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
    // this.$nextTick(()=> {
    //   console.log("component1")
    //   console.log(this.$el.offsetWidth)
    // })

    setTimeout(() => {
      console.log("component1");
      this.getHeadings();
    });
  },
  methods: {
    getHeadings() {
      let headings = document.getElementsByClassName(`tocHeading-0`);
      this.headings = Array.from(headings);
    }
  }
};
</script>

<style lang="scss" scoped></style>
