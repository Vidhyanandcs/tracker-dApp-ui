<template>
  <div class="main-container">
    <div class="dashboard-container">
      <Facility @go-home="tracker" @go-settings="settings" />
      <component :is="componentName"></component>
      <Popup :alert="alert" v-if="alert.length != 0" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Tracker from "@/components/Tracker.vue";
import Facility from "@/components/Facility.vue";
import Settings from "@/components/Settings.vue";
import { mapGetters } from "vuex";
import Popup from "@/components/Popup.vue";

export default {
  data() {
    return {
      selectedComponent: "Tracker"
    };
  },

  components: {
    Tracker,
    Facility,
    Settings,
    Popup
  },

  computed: {
    ...mapGetters(["alert", "componentName"])
  },

  methods: {
    //Method to make tracker active component
    tracker() {
      this.$store.commit("changeComponent", {
        component: "Tracker"
      });
    },
    //Method to make settings active component
    settings() {
      this.$store.commit("changeComponent", {
        component: "Settings"
      });
    }
  }
};
</script>
