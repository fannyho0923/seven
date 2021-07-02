<template>
  <div class="pointer refrigerator__body" @click="seeMemo">
    <img
      @click="seeMemo"
      class="pointer img img-resp "
      src="../../static/imgs/refrigerator.png"
      alt="refrigeratorPic"
      width="101"
      height="196"
    />
  </div>
</template>

<script>
export default {
  methods: {
    seeMemo() {
      this.$router.push("/memo");
    }
  }
};
</script>

<style scoped>
/* 冰箱照片 */
.img {
  max-width: 100%;
  width: 100%;
}
.img:hover {
  opacity: 0.5;
}
.refrigerator__body {
  position: absolute;
  width: 10%;
  height: auto;
  left: 66%;
  top: 35%;
  background-color: transparent;
}
</style>
