<template>
  <v-app>
    <v-content
      id="baseContentTop"
      aria-live="polite"
      style="background: #fafafa; min-height: 68vh"
    >
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
