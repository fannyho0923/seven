<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import cookie from "vue-cookies";
import { getUserInfo } from "@/js/all.js";
export default {
  name: "App",
  mounted() {
    this.getRoomId();
  },
  methods: {
    async getRoomId() {
      const userId = this.$store.getters.userSeriel;
      console.log(userId);
      const response = await getUserInfo(userId);
      if (response.status === 200) {
        const id = response.data.doorIndex;
        this.$store.commit("Enter", id);
      }
    }
  }
};
</script>

<style lang="scss">
@import "./assets/style/style.scss";
</style>
