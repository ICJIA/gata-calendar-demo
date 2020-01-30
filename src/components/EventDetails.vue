<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="12" order-md="1" order="2" order-sm="2">
        <v-card class="py-5 mx-2 grey lighten-4">
          <h2
            v-if="showTitle"
            style="font-weight: 900"
            class="pl-3"
            :id="slugify(event.name)"
          >
            {{ event.name }}
          </h2>
          <v-card-text style=" font-weight: 700;">
            <div style="font-size: 18px">
              {{ moment(event.start).format("dddd, MMMM Do YYYY") }}
            </div>
            <div>
              {{ moment(event.start).format("HH:mm a") }} -
              {{ moment(event.end).format("HH:mm a") }}&nbsp;CST
            </div>
          </v-card-text>
          <v-card-text style="margin-top: -15px;">
            <div v-html="event.details.description.html"></div>
          </v-card-text>
          <v-card-text style="margin-top: -30px;">
            <div class="subtitle-1 black--text">
              <v-card-text class="mb-5">
                <strong>{{ event.details.venue.name }}</strong>

                <div>
                  {{ event.details.venue.address.localized_address_display }}
                </div>
              </v-card-text>
            </div>
          </v-card-text>

          <v-divider class="mx-4" style="margin-top: -25px;"></v-divider>

          <!-- <v-card-title>Availability</v-card-title> -->

          <v-card-actions class="mt-3">
            <v-chip class="seats-available">
              {{ seatsRemaing }}
              seats remaining</v-chip
            >
            <v-spacer></v-spacer>
            <v-btn
              v-if="seatsRemaing > 0"
              dark
              color="blue darken-4"
              :href="event.details.url"
              target="_blank"
              class="mr-5"
            >
              Register Now
            </v-btn>
            <v-btn
              v-else
              dark
              color="red darken-4"
              :href="event.details.url"
              target="_blank"
              class="mr-5"
            >
              Get on Waitlist
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import slugify from "url-slug";
import moment from "moment";
export default {
  methods: {
    register() {}
  },
  computed: {
    seatsRemaing() {
      return (
        this.event.details.ticket_classes[0]["quantity_total"] -
        this.event.details.ticket_classes[0]["quantity_sold"]
      );
    }
  },
  data() {
    return {
      moment,
      slugify
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
