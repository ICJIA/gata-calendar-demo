<template>
  <div>
    <v-container
      v-if="
        $vuetify.breakpoint.md ||
          $vuetify.breakpoint.lg ||
          $vuetify.breakpoint.xl
      "
    >
      <v-row>
        <v-col>
          <div>
            <v-card>
              <v-tabs
                v-model="tab"
                grow
                centered
                icons-and-text
                background-color="grey lighten-2"
              >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#tab-by-date">
                  All Workshops

                  <v-icon
                    v-if="loading"
                    left
                    :disabled="loading"
                    class="custom-loader"
                    color="blue darken-4"
                    >cached</v-icon
                  >
                  <v-icon v-else left>format_align_justify</v-icon>
                </v-tab>

                <v-tab :disabled="loading" href="#tab-map">
                  Workshops by Location
                  <v-icon
                    v-if="loading"
                    left
                    :disabled="loading"
                    class="custom-loader"
                    color="blue darken-4"
                    >cached</v-icon
                  >
                  <v-icon v-else left>add_location</v-icon>
                </v-tab>

                <v-tab :disabled="loading" href="#tab-full-list">
                  Workshops by Date
                  <v-icon
                    v-if="loading"
                    left
                    :disabled="loading"
                    class="custom-loader"
                    color="blue darken-4"
                    >cached</v-icon
                  >
                  <v-icon v-else left>calendar_today</v-icon>
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item value="tab-by-date" :eager="true">
                  <v-card flat px-3>
                    <v-card-text>
                      <EventList
                        :events="events"
                        :loading="loading"
                      ></EventList>
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <v-tab-item value="tab-map" :eager="true">
                  <v-card flat
                    ><EventMap
                      :events="events"
                      :loading="loading"
                      :showAddress="false"
                      :showTitle="true"
                    ></EventMap>
                  </v-card>
                </v-tab-item>

                <v-tab-item value="tab-full-list" :eager="true">
                  <v-card flat>
                    <v-card-text>
                      <EventCalendar
                        :events="events"
                        :loading="loading"
                        :showTitle="false"
                      ></EventCalendar
                    ></v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col>
          <v-card flat>
            <v-card-text>
              <EventList :events="events" :loading="loading"></EventList>
            </v-card-text>
          </v-card>
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
import EventList from "@/components/EventList";
export default {
  components: {
    EventCalendar,
    EventMap,
    EventList
  },
  created() {
    this.getEventBriteEvents();
  },
  mounted() {},
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
      let events = null;
      events = await axios.get(`/.netlify/functions/events`);

      // events = await axios.get(
      //   `https://gata-calendar.netlify.com/.netlify/functions/events`
      // );

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
    tab: null,
    isError: true,
    errorMsg: null,
    clientGeolocation: null
  })
};
</script>
