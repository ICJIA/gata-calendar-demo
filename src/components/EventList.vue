<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        :md="dynamicFlex()"
        order-md="1"
        order="2"
        order-sm="2"
        id="scrollArea"
      >
        <div v-for="(city, index) in cities" :key="index" style="">
          <h2
            class="mb-5 ml-2 tocHeading"
            style="font-size: 32px; text-transform: uppercase; background: #2657A9; color:  #fff; padding: 10px; margin-top: 50px; "
            id="city"
          >
            {{ city }}
          </h2>
          <div v-for="event in groupedEvents[city]" :key="event.details.id">
            <EventDetails :event="event"></EventDetails>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import EventDetails from "@/components/EventDetails";

// eslint-disable-next-line no-unused-vars
import _ from "lodash";
export default {
  watch: {
    loading(newValue) {
      if (newValue === false) {
        this.groupByCity();
      }
    }
  },
  computed: {
    showToc() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return false;
      } else {
        return true;
      }
    }
  },
  data() {
    return {
      groupedEvents: null,
      cities: [],
      isGrouped: false,

      toc: null
    };
  },

  methods: {
    groupByCity() {
      this.isGrouped = false;
      this.groupedEvents = _.groupBy(this.events, function(event) {
        return event.details.venue.address.city;
      });
      for (const property in this.groupedEvents) {
        this.cities.push(property);
      }
      this.cities.sort();
      this.isGrouped = true;
    },
    dynamicFlex() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "12";
      } else {
        return "12";
      }
    }
  },
  components: {
    EventDetails
    // eslint-disable-next-line vue/no-unused-components
  },
  props: {
    events: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
