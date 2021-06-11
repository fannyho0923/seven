<template>
  <main>
    <div class="row">
      <header class="base__head mx-auto">
        <IconList />
      </header>
      <div class=" mx-auto">
        <div class="base__body">
          <div class="doorBox" v-if="doors">
            <Room v-for="(item, index) in doors" :key="index" :doors="item" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Room from "../components/Room.vue";
import IconList from "../components/IconList.vue";
export default {
  data() {
    return {
      data: {},
      doors: [
        {
          name: "door1",
          src: "../../static/imgs/doorSkewL.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          name: "door2",
          src: "../../static/imgs/doorSkewL.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          name: "door3",
          src: "../../static/imgs/door.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          name: "door4",
          src: "../../static/imgs/door.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          name: "door5",
          src: "../../static/imgs/door.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          name: "door6",
          src: "../../static/imgs/doorSkewR.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          name: "door7",
          src: "../../static/imgs/doorSkewR.png",
          img: "../../static/imgs/avatar.png"
        }
      ]
    };
  },
  components: { IconList, Room }
};
</script>

<style scoped>
.base__body {
  position: relative;
  max-width: 100vw;
  width: 100vw;
  height: 47vw;
  background-image: url("../../static/imgs/bg.jpeg");
  background-position: center bottom;
  background-repeat: none;
  /* background-attachment: fixed; */
  background-size: contain;
  left: 0;
}

main {
  margin-right: 0;
}
</style>
