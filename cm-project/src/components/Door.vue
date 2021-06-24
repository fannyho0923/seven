<template>
  <!-- 房門圖 -->
  <div :class="doors.name" class="set-inlineBlock base__door">
    <img
      class="img img-resp"
      :src="doors.src"
      alt=""
      width="147"
      height="328"
    />
    <!-- 房門頭像 -->
    <div class="pointer circle">
      <img
        class="pointer img__avatar img-resp"
        :src="doors.img"
        alt="avatar"
        width="100"
        height="100"
        @click.self="enterRoom"
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
  },
  methods: {
    //進入房間
    enterRoom() {
      this.$router.push("/room");
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
  box-shadow: 0 0 7px gray;
}
.door1 {
  left: 0.5%;
  top: 50%;
}
.door2 {
  left: 11%;
  top: 39%;
}
.door3 {
  left: 24%;
  top: 42%;
}
.door4 {
  left: 38%;
  top: 42%;
}
.door5 {
  left: 52%;
  top: 42%;
}
.door6 {
  left: 79.5%;
  top: 40%;
}
.door7 {
  left: 90%;
  top: 52%;
}
</style>
