<template>
  <ul class="ul">
    <div class="base__left">
      <li class="icon__box" v-for="(item, index) in navs" :key="index">
        <img
          v-if="index < 5"
          class="pointer img-resp"
          :src="navs[index].src"
          alt="pic"
        />
      </li>
    </div>
    <div class="base__right">
      <li class="icon__box" v-for="(item, index) in navs" :key="index">
        <img
          v-if="index <= 5"
          class="pointer img-resp"
          :src="navs[index + 5].src"
          alt="pic"
        />
      </li>
    </div>
  </ul>
</template>

<script>
import Chat from "./icons/Chat.vue";
import ScreenShot from "./icons/ScreenShot.vue";
import Contact from "./icons/Contact.vue";
import Info from "./icons/Info.vue";
import Music from "./icons/Music.vue";
import Lang from "./icons/Lang.vue";
export default {
  data() {
    return {
      navs: [
        {
          name: "game",
          src: "../static/imgs/pic1.png"
        },
        {
          name: "chat",
          src: "../static/imgs/pic2.png"
        },
        {
          name: "screenShot",
          src: "../static/imgs/pic3.png"
        },
        {
          name: "contact",
          src: "../static/imgs/pic4.png"
        },
        {
          name: "info",
          src: "../static/imgs/pic5.png"
        },
        {
          name: "public",
          src: "../static/imgs/pic6.png"
        },
        {
          name: "home",
          src: "../static/imgs/pic7.png"
        },
        {
          name: "room",
          src: "../static/imgs/pic8.png"
        },
        {
          name: "music",
          src: "../static/imgs/pic9.png"
        },
        {
          name: "lang",
          src: "../static/imgs/pic10.png"
        },
        {
          name: "logout",
          src: "../static/imgs/pic11.png"
        }
      ]
    };
  },
  components: { Chat, ScreenShot, Contact, Info, Music, Lang },
  methods: {
    st(index) {
      return "../static/imgs/pic" + index + ".png";
    }
  }
};
</script>

<style scoped>
.icon__box {
  list-style: none;
}
.ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
.base__left,
.base__right {
  display: flex;
}
img {
  background-color: rgb(248, 175, 18);
}
</style>
