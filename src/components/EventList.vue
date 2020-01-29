<template>
  <div>
    <div v-for="(event, index) in events" :key="index">
      <EventDetails :event="event"></EventDetails>
    </div>
  </div>
</template>

<script>
import EventDetails from "@/components/EventDetails";
export default {
  components: {
    EventDetails
  },
  props: {
    events: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped></style>
