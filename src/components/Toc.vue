<template>
  <div
    class="toc"
    :class="{
      'pl-2': $vuetify.breakpoint.xs || $vuetify.breakpoint.xs,
      'pl-10':
        $vuetify.breakpoint.md ||
        $vuetify.breakpoint.lg ||
        $vuetify.breakpoint.xl,
      shaded: $vuetify.breakpoint.xs || $vuetify.breakpoint.xs
    }"
    style=""
  >
    <div
      v-if="tocHeading.length"
      ref="anchor"
      style="margin-left: -3px; font-weight: bold;"
      class="mb-4 hover anchor"
      @click="$vuetify.goTo(0)"
    >
      {{ `${tocHeading.toUpperCase()}` }}
    </div>
    <div class="divider">
      <ul class="toc-list">
        <li
          v-for="(item, index) in toc"
          :key="index"
          @click="scrollTo(item.id)"
        >
          <span :id="`scrollTo-${item.id}`" class="tocItem">{{
            item.text
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selector: {
      type: String,
      default: "#scrollArea"
    },
    tocHeading: {
      type: String,
      default: "NAVIGATION"
    },
    top: {
      type: String,
      default: "#baseContentTop"
    },
    mini: {
      type: Boolean,
      default: false
    },
    enableTracking: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      toc: []
    };
  },
  async mounted() {
    await this.setToc();
    var section = document.querySelectorAll("h2.tocHeadingList");
    if (section) {
      var sections = {};
      // eslint-disable-next-line no-unused-vars
      var i = 0;
      this.$refs["anchor"].classList.add("visible");
      section.forEach(e => {
        sections[e.id] = e.offsetTop;
      });
      console.log(sections);

      if (this.enableTracking) {
        window.onscroll = () => {
          var scrollPosition =
            document.documentElement.scrollTop || document.body.scrollTop;
          const tocItems = document.querySelectorAll(".tocItem");
          console.log(scrollPosition);
          if (scrollPosition < 150) {
            tocItems.forEach(toc => {
              toc.classList.remove("visible");
            });
            this.$refs["anchor"].classList.add("visible");
          } else {
            this.$refs["anchor"].classList.remove("visible");
          }
          console.log(scrollPosition);
          for (i in sections) {
            if (sections[i] <= scrollPosition) {
              const sectionItem = document.getElementById(`scrollTo-${i}`);
              console.log(i, sectionItem, sections[i]);
              tocItems.forEach(toc => {
                toc.classList.remove("visible");
              });
              sectionItem.classList.add("visible");
            }
          }
        };
      }
    }
  },
  beforeDestroy() {
    window.onscroll = () => {};
  },
  methods: {
    scrollTo(id) {
      //console.log(id);
      this.$vuetify.goTo(`#${id}`, { offset: 15 });
    },
    setToc() {
      const sections = Array.from(
        document.querySelectorAll("h2.tocHeadingList")
      );
      sections.forEach(section => {
        let obj = {};
        obj.text = section.innerText;
        obj.id = section.id;
        this.toc.push(obj);
      });
      //console.log(sections);
    }
  }
};
</script>

<style>
.divider {
  border-left: 1px solid #ccc;
}

.visible {
  color: #116bb9 !important;
  font-weight: bold;
}
.anchor {
  padding: 2px 5px 2px 5px;
}
.anchor:hover {
  color: #116bb9;
  background: #eee;
}

.shaded {
  background: #eee;
  padding: 15px;
  margin-bottom: 25px;
}

.toc {
  position: -webkit-sticky !important; /* Safari */
  position: sticky !important;
  top: 30px !important;
}

ul.toc-list {
  list-style-type: none;
}

ul.toc-list li {
  color: #333;

  padding: 2px 5px 2px 5px;
  cursor: pointer;
  margin-bottom: 8px;
  font-size: 14px;
}

ul.toc-list li:hover {
  color: #116bb9;
  background: #eee;
}
@media only screen and (max-width: 960px) {
  .divider {
    border-left: 0px solid #ccc;
  }

  ul.toc-list li:hover {
    color: #fff;
    background: #aaa;
  }
}
</style>
