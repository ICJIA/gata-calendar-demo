<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div v-if="!loading">
            <Calendar :events="events"></Calendar>
          </div>
          <div v-else>
            <v-sheet :color="`grey lighten-4`">
              <v-boilerplate
                type="table"
                class="mb-6"
                :boilerplate="false"
              ></v-boilerplate>
            </v-sheet>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Calendar from "@/components/Calendar";
import { VSkeletonLoader } from "vuetify/lib";
export default {
  components: {
    Calendar,
    // eslint-disable-next-line vue/no-unused-components
    VSkeletonLoader,
    // Create a new component that
    // extends v-skeleton-loader
    // eslint-disable-next-line vue/no-unused-components
    VBoilerplate: {
      functional: true,
      render(h, { data, props, children }) {
        return h(
          "VSkeletonLoader",
          {
            ...data,
            props: {
              boilerplate: true,
              elevation: 2,
              ...props
            }
          },
          children
        );
      }
    }
  },
  created() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      this.loading = true;
      let events = await axios.get("/.netlify/functions/events");
      this.eventBrite = events.data;
      this.loading = false;
    }
  },
  data: () => ({
    eventBrite: null,
    loading: true,
    events: [
      {
        name: "PTO",
        start: "2020-01-11 08:00",
        end: "2020-01-11 11:30",
        color: "orange",
        details: "Details here"
      },
      {
        name: "PTO",
        start: "2020-01-12 08:00",
        end: "2020-01-12 11:30",
        color: "orange",
        test: "Test",
        details: "Details here"
      },
      {
        name: "PTO",
        start: "2020-01-01 08:00",
        end: "2020-01-01 11:30",
        color: "orange",
        details: "Details here"
      },
      {
        name: "PTO This is a long name this is a long name",
        start: "2020-1-16 19:15",
        end: "2020-1-16 20:15",
        color: "deep-purple",
        details: "Details here"
      },
      {
        name: "Birthday",
        start: "2020-1-11 4:45",
        end: "2020-1-11 6:45",
        color: "grey darken-1",
        details: "Details here"
      },

      {
        name: "Holiday",
        start: "2020-1-25 11:30",
        end: "2020-1-25 12:30",
        color: "deep-purple",
        details: "Details here"
      }
    ]
  })
};
</script>
