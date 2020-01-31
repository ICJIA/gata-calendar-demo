<template>
  <div>
    <v-select
      v-model="sort.sort_id"
      :items="sortBy"
      item-value="id"
      item-text="name"
      label="Sort By"
      v-on:change="changeSort(`${sort.sort_id}`)"
    />
    <div v-if="sort.sort_id === 1">
      <div
        v-for="(city, index) in cities"
        :key="index"
        style="margin-top: -20px;"
      >
        <h2
          class="mb-5 tocHeading"
          style="font-size: 32px; text-transform: uppercase; background: #2657A9; color:  #fff; padding: 10px; margin-top: 50px; "
          id="city"
        >
          {{ city }}
        </h2>
        <div v-for="event in groupedEvents[city]" :key="event.details.id">
          <EventDetails :event="event" class="mb-2"></EventDetails>
        </div>
      </div>
    </div>
    <div v-if="sort.sort_id === 2" class="mt-8">
      <div v-for="event in events" :key="event.details.id">
        <EventDetails :event="event" class="mb-2"></EventDetails>
      </div>
    </div>
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

      toc: null,
      sort: {
        sort_id: 1
      },
      sortBy: [
        {
          id: 1,
          name: "City"
        },
        {
          id: 2,
          name: "Date"
        }
      ]
    };
  },

  methods: {
    changeSort(a) {
      console.log(a, this.sort.sort_id);
    },
    groupByCity() {
      this.isGrouped = false;
      this.groupedEvents = _.groupBy(this.events, function(event) {
        return event.details.venue.address.city;
      });
      for (const property in this.groupedEvents) {
        this.cities.push(property);
      }
      this.cities.sort();
      console.log(this.sortedEvents);
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
