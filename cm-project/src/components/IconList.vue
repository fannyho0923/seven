<template>
  <nav class="nav">
    <ul class="ul">
      <li class="li ">
        <i class="bed pointer fas fa-bed" @click="goRoom"></i>
      </li>
      <li class="li">
        <i class="home pointer fas fa-home" @click="goPub"></i>
      </li>
      <li class="li">
        <i class="bulb pointer far fa-lightbulb" @click="popInfo"></i>
      </li>
      <li class="li">
        <i class="user pointer far fa-user" @click="popUserInfo"></i>
      </li>
      <!-- <div class="base__left">
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
    </div> -->
    </ul>
    <PersonalInfo
      v-if="showUserInfo"
      class="personalInfo"
      @leave="closeUserInfo"
      :user="userID"
      :isOwner="true"
    />
  </nav>
</template>

<script>
import Chat from "./icons/Chat.vue";
import ScreenShot from "./icons/ScreenShot.vue";
import Contact from "./icons/Contact.vue";
import Info from "./icons/Info.vue";
import Music from "./icons/Music.vue";
import Lang from "./icons/Lang.vue";
import { getMembers, getUserInfo } from "@/js/all.js";
import PersonalInfo from "@/components/PersonalInfo.vue";
export default {
  data() {
    return {
      userID: this.$store.getters.userSeriel,
      showInfo: false,
      showUserInfo: false,
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
  components: { PersonalInfo },
  methods: {
    st(index) {
      return "../static/imgs/pic" + index + ".png";
    },
    // 回自己房間
    goRoom() {
      //取得使用者資訊
      getUserInfo(this.$store.getters.userSeriel)
        .then(res1 => {
          console.log(res1.data);
          if (res1.data.result) {
            const id = res1.data.doorIndex;
            console.log(id);
            this.$store.commit("Enter", id);
            this.$router.push({ name: "Room", query: { id } });
            this.$emit("goRoom");
          }
        })
        .catch(error => console.log(error));
    },
    // 到大廳
    goPub() {
      this.$router.push("/publicArea");
    },
    // 跳出資訊
    popInfo() {
      this.showInfo = true;
    },
    closeInfo() {
      this.showInfo = false;
    },
    // 登出
    popUserInfo() {
      this.showUserInfo = true;
    },
    closeUserInfo() {
      this.showUserInfo = false;
    }
  }
};
</script>

<style scoped>
/* .icon__box {
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
} */
img {
  /* background-color: rgb(248, 175, 18); */
}
.nav {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}
.ul {
  display: flex;
  justify-content: space-around;
  /* background-color: lightslategray; */
  list-style: none;
  width: 20vw;
  margin: 0;
  padding: 0;
  /* position: relative; */
  right: 0;
}
.li {
  font-size: 2vw;
}
.bed {
  color: rgb(188, 127, 245);
}
.bed:hover {
  color: rgb(188, 127, 245);
  opacity: 0.5;
}
.home {
  color: #ff4d6d;
}
.home:hover {
  /* color: #ff4d6d; */
  opacity: 0.5;
}
.bulb {
  color: #fee440;
}
.bulb:hover {
  color: #fee440;
  opacity: 0.5;
}
.user {
  color: #8fbfe0;
}
.user:hover {
  color: #8fbfe0;
  opacity: 0.5;
}
</style>
