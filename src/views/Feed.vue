<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>Grant Feeds</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical v-model="activeTab">
      <v-tab>
        <v-icon left>mdi-account</v-icon>
        Grants.gov
      </v-tab>

      <v-tab-item :eager="true">
        <v-card flat>
          <v-card-text>
            <GrantFeed :activeTab="activeTab" :key="activeTab"></GrantFeed>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import GrantFeed from "@/components/GrantFeed";

export default {
  components: {
    GrantFeed
  },
  watch: {
    activeTab: function() {
      console.log(this.activeTab);
      //this.getHeadings();
    }
  },
  data: function() {
    return {
      activeTab: 0
    };
  },
  methods: {
    getHeadings() {
      //let headings = document.getElementsByClassName(`test01-tocHeading`);
    }
  },
  mounted() {}
};
</script>
