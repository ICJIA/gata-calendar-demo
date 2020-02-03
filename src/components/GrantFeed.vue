<template>
  <div>
    <v-container>
      <div ref="Test01">
        <div v-if="loading">
          LOADING...
        </div>
        <div v-else>
          <div v-for="item in feed" :key="item.title">
            <v-card class="mb-10 px-5 py-5">
              <h3>{{ item.title }}</h3>

              <h5>Posted: {{ moment(item.date).format("MMMM DD, YYYY") }}</h5>
              <h5>Categories:</h5>
              <span v-for="(category, index) in item.categories" :key="index">
                {{ category }}
              </span>
              <div
                v-html="item.html"
                class="markdown-body"
                style="font-size: 10px !important;  "
              ></div>
            </v-card>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import moment from "moment";
export default {
  data() {
    return {
      headings: null,
      loading: true,
      feed: null,
      moment
    };
  },
  props: {
    activeTab: {
      type: Number,
      default: null
    }
  },
  created() {
    this.getFeed();
  },
  mounted() {
    setTimeout(() => {
      console.log("component1");
      this.getHeadings();
    });
  },
  methods: {
    getHeadings() {
      let headings = document.getElementsByClassName(`tocHeading-0`);
      this.headings = Array.from(headings);
    },
    async getFeed() {
      this.loading = true;
      let feed = null;
      feed = require(`../../public/api/grants-dot-gov.json`);
      const sorted = _.sortBy(feed.items, "title");
      //console.log(sorted);
      this.feed = sorted;

      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
