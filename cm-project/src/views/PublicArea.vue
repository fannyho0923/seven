<template>
  <main>
    <div class="row">
      <div class="base__head mx-auto">
        <nav class="nav"><IconList /></nav>
      </div>
      <div base__body></div>
    </div>
  </main>
</template>

<script>
import IconList from "../components/IconList.vue";
export default {
  data() {
    return {};
  },
  components: { IconList }
};
</script>

<style scoped>
.nav {
  margin-top: 0;
}
</style>
