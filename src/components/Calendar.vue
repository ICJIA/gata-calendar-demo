<template>
  <div>
    <v-container class="hidden-sm-and-down"
      ><v-row
        ><v-col>
          <v-sheet tile height="54" color="grey lighten-3" class="d-flex ">
            <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <span
              style="font-weight: 900; font-size: 24px; margin-top: 8px;"
              class="hover "
              @click="setCalendar('month')"
            >
              {{ title }}
            </span>
            <v-btn icon class="ma-2" @click="$refs.calendar.next()">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>

            <v-btn
              outlined
              small
              class="mr-4 mt-3 "
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>

            <v-spacer></v-spacer>

            <span class="mt-3 mr-10">
              <v-btn small class="mr-3" @click="setCalendar('month')"
                ><v-icon left>fas fa-calendar-alt</v-icon
                ><span class="">Month</span></v-btn
              >

              <v-btn small class="mr-3" @click="setCalendar('week')"
                ><v-icon left>fas fa-calendar-week</v-icon
                ><span class="">Week</span></v-btn
              >

              <v-btn small @click="setCalendar('day')"
                ><v-icon left>fas fa-calendar-day</v-icon
                ><span class="">Day</span></v-btn
              >
            </span>
          </v-sheet>

          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="value"
              :weekdays="weekday"
              :type="type"
              :now="today"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              :events="events"
              :event-overlap-mode="mode"
              :event-overlap-threshold="30"
              :event-color="getEventColor"
              @change="getEvents"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar dark>
                  <v-toolbar-title
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  {{ selectedEvent }}
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">
                    CLOSE
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu></v-sheet
          ></v-col
        ></v-row
      ></v-container
    >
    <v-container class="hidden-md-and-up"
      ><v-row><v-col>Mobile view here</v-col></v-row></v-container
    >
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import moment from "moment";

export default {
  data() {
    return {
      type: "month",
      moment,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      types: ["month", "day", "week"],
      start: {},
      end: {},
      today: moment().format("YYYY-MM-DD"),
      value: ""
    };
  },
  props: {
    events: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    title() {
      if (this.type === "month") {
        return moment(this.start.date).format("MMMM, YYYY");
      } else if (this.type === "day") {
        return moment(this.start.date).format("MMMM DD, YYYY");
      } else {
        return `${moment(this.start.date).format("MMM DD, YYYY")} - ${moment(
          this.end.date
        ).format("MMM DD, YYYY")}`;
      }
    }
  },
  methods: {
    setToday() {
      this.value = this.today;
    },
    viewDay({ date }) {
      this.value = date;
      this.type = "day";
    },
    getEvents(e) {
      const { start, end } = e;
      this.start = start;
      this.end = end;

      return this.events;
    },
    setCalendar(type) {
      //console.log(type);
      this.type = type;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    getEventColor(event) {
      return event.color;
    }
  }
};
</script>

<style>
.hover {
  cursor: pointer;
}
.v-present button {
  background: red !important;
  color: #fff !important;
  font-weight: 900;
}
</style>
