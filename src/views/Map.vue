<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div>
            <EventMap
              :events="events"
              :loading="loading"
              :showAddress="false"
              :showTitle="true"
            ></EventMap>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import axios from "axios";
import EventCalendar from "@/components/EventCalendar";
import EventMap from "@/components/EventMap";
export default {
  components: {
    EventCalendar,
    EventMap
  },
  created() {
    this.getEventBriteEvents();
  },

  methods: {
    getColor(name) {
      let type = name.split(":");

      let obj = this.colorMap.filter(c => {
        return c.name === type[0].toLowerCase();
      });
      if (obj.length) {
        return obj[0].color;
      } else {
        return "red";
      }
    },
    async getEventBriteEvents() {
      this.loading = true;

      let events = await axios.get(`/.netlify/functions/events`);
      this.events = events.data.events.map(event => {
        let obj = {};
        obj.name = event.name.text;
        obj.start = event.start.local;
        obj.end = event.end.local;
        obj.color = "blue darken-4";
        obj.details = event;
        return obj;
      });

      this.loading = false;
    }
  },
  data: () => ({
    loading: true,
    events: [],
    tab: null
  })
};
</script>
