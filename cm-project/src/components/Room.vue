<template>
  <div :class="doors.name" class="set-inlineBlock base__door">
    <img
      class="img img-resp"
      :src="doors.src"
      alt=""
      width="147"
      height="328"
    />
  </div>
</template>

<script>
export default {
  props: {
    doors: {
      type: Object
    }
  }
};
</script>

<style scoped>
.base__door {
  position: absolute;
  width: 10%;
  height: auto;
}
.img {
  max-width: 100%;
  width: 100%;
}
.door1 {
  left: 0;
  top: 48%;
}
.door2 {
  left: 10%;
  top: 38%;
}
.door3 {
  left: 25%;
  top: 39%;
}
.door4 {
  left: 45%;
  top: 39%;
}
.door5 {
  left: 65%;
  top: 39%;
}
.door6 {
  left: 80%;
  top: 39%;
}
.door7 {
  left: 90%;
  top: 49%;
}
</style>
