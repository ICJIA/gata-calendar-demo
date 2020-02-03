<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>User Profile</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical v-model="activeTab">
      <v-tab>
        <v-icon left>mdi-account</v-icon>
        Option 1
      </v-tab>
      <v-tab>
        <v-icon left>mdi-lock</v-icon>
        Option 2
      </v-tab>

      <v-tab-item :eager="true">
        <v-card flat>
          <v-card-text>
            <Test01 :activeTab="activeTab" :key="activeTab"></Test01>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item :eager="true">
        <v-card flat>
          <v-card-text>
            <Test02 :activeTab="activeTab" :key="activeTab"></Test02>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import Test01 from "@/components/Test01";
import Test02 from "@/components/Test02";
export default {
  components: {
    Test01,
    Test02
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
