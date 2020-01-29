<template>
  <div>
    <v-card class="elevation-3 py-5 my-4">
      <v-card-title v-if="showTitle">{{ event.name }}</v-card-title>
      <v-card-text style=" font-weight: 900;">
        <div style="font-size: 18px">
          {{ moment(event.start).format("dddd, MMMM Do YYYY") }}
        </div>
        <div>
          {{ moment(event.start).format("HH:mm a") }} -
          {{ moment(event.end).format("HH:mm a") }}&nbsp;CT
        </div>
      </v-card-text>
      <v-card-text>
        <div v-html="event.details.description.html"></div>
      </v-card-text>
      <v-card-text style="margin-top: -30px;">
        <div class="subtitle-1 black--text">
          <v-card-text class="mb-5">
            <strong>{{ event.details.venue.name }}</strong>
            <div
              v-for="(a, index) in event.details.venue.address
                .localized_multi_line_address_display"
              :key="index"
            >
              {{ a }}
            </div></v-card-text
          >
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Availability</v-card-title>

      <v-card-text class="mb-5">
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
          column
        >
          <div>
            <v-chip class="seats-available">
              {{
                event.details.ticket_classes[0]["quantity_total"] -
                  event.details.ticket_classes[0]["quantity_sold"]
              }}
              seats remaining</v-chip
            >
          </div>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          dark
          color="blue darken-4"
          :href="event.details.url"
          target="_blank"
          class="mr-5"
        >
          Register Now
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  methods: {
    register() {}
  },
  computed: {
    quantitySold() {
      return this.event.details.ticket_classes[0]["quantity_sold"];
    }
  },
  data() {
    return {
      moment
    };
  },
  props: {
    event: {
      type: Object,
      default: () => {}
    },
    showAddress: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style>
.v-chip__content {
  font-weight: 900;
}
</style>
