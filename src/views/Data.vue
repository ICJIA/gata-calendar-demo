<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div v-if="!loading">
            <div v-for="event in events" :key="event.details.id">
              <v-card class="px-8 py-8 mb-4">
                {{ event }}
              </v-card>
            </div>
          </div>
          <div v-else class="text-center">
            <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import axios from "axios";
export default {
  components: {},
  created() {
    this.getEventBriteEvents();
  },

  methods: {
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
