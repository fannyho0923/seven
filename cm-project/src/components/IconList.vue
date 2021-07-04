<template>
  <nav class="nav">
    <ul class="ul">
      <!-- 回房間 -->
      <li class="li ">
        <i class="bed pointer fas fa-bed" @click="goRoom"></i>
      </li>
      <!-- 回大廳 -->
      <li class="li">
        <i class="home pointer fas fa-home" @click="goPub"></i>
      </li>
      <!-- 查看使用手冊 -->
      <li class="li">
        <i class="bulb pointer far fa-lightbulb" @click="popHandbook"></i>
      </li>
      <!-- 查看使用者資訊 -->
      <li class="li">
        <i class="user pointer far fa-user" @click="popUserInfo"></i>
      </li>
    </ul>
    <PersonalInfo
      v-if="showUserInfo"
      class="personalInfo"
      @leave="closeUserInfo"
      :user="userID"
      :isOwner="true"
      @move="goMove"
    />
    <!-- 使用手冊 -->
    <div v-if="showHandbook" class="handbookBg">
      <div class="handbook__body mx-auto">
        <img
          class="handbookImg img-resp"
          src="../../static/imgs/publicRoom/handbook.png"
          alt="使用手冊"
          width="1268"
          height="1558"
        />
        <!-- 關閉使用手冊按鈕 -->
        <i
          class="closeHandbookBtn pointer fas fa-times-circle closeHandbook"
          @click.self="closeHandbook"
        ></i>
      </div>
    </div>
  </nav>
</template>

<script>
import { getUserInfo } from "@/js/all.js";
import PersonalInfo from "@/components/PersonalInfo.vue";
export default {
  data() {
    return {
      userID: this.$store.getters.userSeriel,
      showHandbook: false,
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
    // 跳出使用說明
    popHandbook() {
      this.showHandbook = true;
    },
    // 關閉使用說明
    closeHandbook() {
      this.showHandbook = false;
    },
    // 登出
    popUserInfo() {
      this.showUserInfo = true;
    },
    // 關閉會員資訊
    closeUserInfo() {
      this.showUserInfo = false;
    },
    goMove() {
      this.$emit("move");
    }
  }
};
</script>

<style scoped>
.nav {
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
}
.ul {
  display: flex;
  justify-content: space-around;
  list-style: none;
  width: 20vw;
}
.li {
  font-size: 2vw;
}
/* 房間 */
.bed {
  color: rgb(188, 127, 245);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.bed:hover {
  color: rgb(188, 127, 245);
  opacity: 0.5;
}
.bed::after {
  margin-top: 0.3rem;
  font-size: 1.2vw;
  content: "房間";
}
/* 大廳 */
.home {
  color: #ff4d6d;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.home:hover {
  opacity: 0.5;
}
.home::after {
  margin-top: 0.3rem;
  font-size: 1.2vw;
  content: "大廳";
}
/* 使用提示 */
.bulb {
  color: #ffba08;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.bulb:hover {
  color: #ffba08;
  opacity: 0.5;
}
.bulb::after {
  margin-top: 0.3rem;
  font-size: 1.2vw;
  content: "提示";
}
/* 使用者資訊 */
.user {
  color: #8fbfe0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.user:hover {
  color: #8fbfe0;
  opacity: 0.5;
}
.user::after {
  margin-top: 0.3rem;
  font-size: 1.2vw;
  content: "設定";
}
/* 使用手冊 */
.handbookBg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50vw;
  /* background-color: rgba(255, 99, 71, 0.466); */
}
.handbook__body {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 100%;
  /* background-color: yellow; */
}
.handbookImg {
  width: 100%;
  max-height: 100%;
}
.closeHandbook {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 3.6vw;
  height: 3.6vw;
  left: 100%;
  top: 5%;
  font-size: 4vw;
  color: rgb(70, 49, 4);
  background-color: white;
  border-radius: 50%;
}
</style>
