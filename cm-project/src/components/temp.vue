<template>
  <nav>
    <ul class="ul">
      <div class="base__left">
        <li>
          <img class="pointer img-resp" :src="st(1)" alt="gamePic" />
        </li>
        <li>
          <!-- <Chat /> -->
          <img class="pointer img-resp" :src="st(2)" alt="chatPic" />
        </li>
        <li>
          <!-- <ScreenShot /> -->
          <img class="pointer img-resp" :src="st(3)" alt="screeShotPic" />
        </li>
        <li>
          <!-- <Contact /> -->
          <img class="pointer img-resp" :src="st(4)" alt="contactPic" />
        </li>
        <li>
          <!-- <Info /> -->
          <img class="pointer img-resp" :src="st(5)" alt="InfoPic" />
        </li>
      </div>
      <div class="base__right">
        <li>
          <img class="pointer img-resp" :src="st(6)" alt="publicPic" />
        </li>
        <li>
          <img class="pointer img-resp" :src="st(7)" alt="homePic" />
        </li>
        <li>
          <img class="pointer img-resp" :src="st(8)" alt="roomPic" />
        </li>
        <li>
          <!-- <Music /> -->
          <img class="pointer img-resp" :src="st(9)" alt="musicPic" />
        </li>
        <li>
          <!-- <Lang /> -->
          <img class="pointer img-resp" :src="st(10)" alt="languagePic" />
        </li>
        <li>
          <img class="pointer img-resp" :src="st(11)" alt="exitPix" />
        </li>
      </div>
    </ul>
  </nav>
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
      str: ""
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
li {
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
  background-color: green;
}
</style>
