<template>
  <div id="app" class="container-fluid">
    <welcome-navbar></welcome-navbar>
    <div class="welcome-margin"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import WelcomeNavbar from "@/components/WelcomeNavbar.vue";

export default {
  name: "App",
  components: {
    "welcome-navbar": WelcomeNavbar,
  },
};
</script>

<style>
.welcome-margin {
  margin-bottom: 4rem !important;
}
</style>
