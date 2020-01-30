<template>
  <div>
    <GmapMap
      :center="center"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100%; height: 400px"
      class="mt-2"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
      <gmap-marker
        :key="i"
        v-for="(m, i) in positions"
        :position="m.position"
        :clickable="true"
        @click="displayUpcomingEvents(m, i)"
      ></gmap-marker>
    </GmapMap>
    <div id="upcoming-events">
      <div v-if="displayInfo" class="mt-3">
        <div v-for="event in eventsAtThisPosition" :key="event.details.id">
          <EventDetails :event="event"></EventDetails>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import moment from "moment";
import EventDetails from "@/components/EventDetails";
export default {
  watch: {
    loading(newValue) {
      if (newValue === false) {
        this.setMarkers();
      }
    }
  },
  components: {
    EventDetails
  },
  data() {
    return {
      center: {
        lat: 41.8781,
        lng: -87.6298
      },
      infoContent: "",
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markers: [],
      positions: [],
      displayInfo: false,
      eventsAtThisPosition: null,
      markersLoading: true
    };
  },
  created() {
    this.geolocateClient();
  },
  methods: {
    geolocateClient() {
      let vm = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            console.log("Setting client location: ", pos);
            vm.center.lat = pos.lat;
            vm.center.lng = pos.lng;
          },
          function() {
            console.log("using default map geolocation");
          }
        );
      } else {
        // Browser doesn't support Geolocation

        console.log("using default map geolocation");
      }
    },
    setMarkers() {
      this.markersLoading = true;
      this.positions = [];
      this.events.forEach(event => {
        let obj = {};
        obj["position"] = {};
        obj["position"]["lat"] = Number(event.details.venue.address.latitude);
        obj["position"]["lng"] = Number(event.details.venue.address.longitude);
        obj["position"]["address"] = Number(event.details.venue.address);
        obj["position"]["infoText"] = "Scroll down for event information.";
        obj["position"]["details"] = event.details;
        this.positions.push(obj);
      });
      //console.log(this.positions);
      this.markersLoading = false;
      //console.log(this.markersLoading);
    },
    displayUpcomingEvents(m) {
      this.displayInfo = true;

      this.eventPosition = m.position.lat + " " + m.position.lng;
      let eventsAtThisPosition = this.events.filter(event => {
        if (
          Number(event.details.venue.address.latitude) === m.position.lat &&
          Number(event.details.venue.address.longitude) === m.position.lng
        ) {
          return event;
        }
      });
      this.eventsAtThisPosition = eventsAtThisPosition;
      // Scroll to events
      this.$vuetify.goTo("#upcoming-events");
    }
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
