<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div>
            <Calendar></Calendar>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar";

export default {
  components: {
    Calendar
    // eslint-disable-next-line vue/no-unused-components
  },
  created() {},
  methods: {},
  data: () => ({})
};
</script>
