<template>
  <div :class="doors.name" class="set-inlineBlock base__door">
    <img
      class="img img-resp"
      :src="doors.src"
      alt=""
      width="147"
      height="328"
    />
    <div class="circle">
      <img
        class="img__avatar img-resp"
        :src="doors.img"
        alt="avatar"
        width="100"
        height="100"
      />
    </div>
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
.circle {
  position: absolute;
  max-width: 50px;
  max-height: 50px;
  min-width: 5px;
  min-height: 5px;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  left: 22%;
  top: 25%;
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
  left: 24%;
  top: 39%;
}
.door4 {
  left: 38%;
  top: 39%;
}
.door5 {
  left: 52%;
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
