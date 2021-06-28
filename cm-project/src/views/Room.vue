<template>
  <main class="main">
    <div class="row">
      <header class="base__head">
        <IconList @goRoom="changeRoom" />
      </header>
      <section class="room__body">
        <!-- 相片牆:放相片 -->
        <!-- 衣櫥:換房間樣式 -->
        <div class="pointer photoImgBox">
          <img
            class="pointer photoImg__base img-resp"
            src="../../static/imgs/room/photo.png"
            alt="photoPic"
            width="698"
            height="349"
            @click="openPhoto"
          />
          <div v-if="photo1" class="photoOne" @click="openPhoto">
            <img
              class="photoImgOne"
              :src="photo1"
              alt="牆照１"
              @click="openPhoto"
            />
          </div>
          <div v-if="photo2" class="photoTwo" @click="openPhoto">
            <img
              class="photoImgTwo"
              :src="photo2"
              alt="牆照２"
              @click="openPhoto"
            />
          </div>
          <div v-if="photo3" class="photoThree" @click="openPhoto">
            <img
              class="photoImgThree"
              :src="photo3"
              alt="牆照３"
              @click="openPhoto"
            />
          </div>
        </div>
        <Photo
          v-if="showPhoto"
          @leave="closePhoto"
          :photoOne="photo1"
          :photoTwo="photo2"
          :photoThree="photo3"
        />
        <div class="pointer wardrobeImgBox">
          <img
            class="pointer wardrobeImg img-resp"
            src="../../static/imgs/room/wardrobe.png"
            alt="wardrobePic"
            width="373"
            height="493"
            @click="openWardrobe"
          />
        </div>
        <!-- 衣櫃彈窗 -->
        <Wardrobe class="wardrobe" v-if="showWardrobe" @leave="closeWardrobe" />
        <!-- 書櫃:寫個版 -->
        <div class="pointer bookcaseImgBox">
          <img
            class="pointer bookcaseImg img-resp"
            src="../../static/imgs/room/bookcase.png"
            alt="bookcasePic"
            width="365"
            height="582"
            @click="goBlog"
          />
        </div>
        <!-- 日記:寫日記 -->
        <div class="pointer diaryImgBox">
          <img
            class="pointer diaryImg img-resp"
            src="../../static/imgs/room/diary.png"
            alt="diaryPic"
            width="628"
            height="496"
            @click="goDiary"
          />
        </div>
        <!-- 電腦:回郵件 -->
        <div class=" computerDeskBox">
          <img
            class=" computerDeskImg img-resp"
            src="../../static/imgs/room/computerDesk.png"
            alt="computerDeskPic"
            width="254"
            height="260"
          />
          <i
            v-if="isOwner && isEnvelope"
            class="pointer envelope far fa-envelope"
            @click="goComputer"
          ></i>
          <i
            v-if="isOwner && !isEnvelope"
            class="pointer envelope far fa-envelope-open"
            @click="goComputer"
          >
          </i>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { getRoomInfo } from "@/js/all.js";
import Photo from "@/components/Photo.vue";
import Wardrobe from "@/components/Wardrobe.vue";
import IconList from "../components/IconList.vue";
export default {
  data() {
    return {
      isEnvelope: false,
      showPhoto: false,
      showWardrobe: false,
      isblink: false,
      isOwner: false,
      photo1: "",
      photo2: "",
      photo3: "",
      roomId: 0
    };
  },
  components: {
    Photo,
    Wardrobe,
    IconList
  },
  created() {
    this.roomId = this.$route.query.id;
    // 取得房間資訊
    getRoomInfo(this.roomId, this.$store.getters.userSeriel).then(res1 => {
      this.isOwner = res1.data.isOwner;
      console.log(res1.data);
      console.log(res1.data.isOwner);
      this.photo1 = res1.data.photo1;
      this.photo2 = res1.data.photo2;
      this.photo3 = res1.data.photo3;
      this.isEnvelope = res1.data.hasNewMail;
    });
    // console.log(this.$store.getters.doorIndex);
  },
  watch: {
    "$store.state.doorIndex": function() {
      console.log(this.$store.getters.doorIndex);
    }
  },
  methods: {
    // 打開衣櫃
    openWardrobe() {
      this.showWardrobe = true;
    },
    // 關閉衣櫃
    closeWardrobe() {
      this.showWardrobe = false;
    },
    // 打開相簿
    openPhoto() {
      this.showPhoto = true;
    },
    // 關閉相簿
    closePhoto() {
      getRoomInfo(this.roomId, this.$store.getters.userSeriel).then(res1 => {
        this.isOwner = res1.data.isOwner;
        console.log(res1.data);
        console.log(res1.data.isOwner);
        this.photo1 = res1.data.photo1;
        this.photo2 = res1.data.photo2;
        this.photo3 = res1.data.photo3;
      });
      this.showPhoto = false;
    },
    // 進入部落格
    goBlog() {
      const index = this.$store.getters.doorIndex;
      this.$router.push({
        path: "/bookcase",
        query: { id: index }
      });
    },
    // 進入日記
    goDiary() {
      if (this.isOwner) {
        const id = this.roomId;
        this.$store.commit("Enter", id);
        this.$router.push({ name: "Diary", query: { id } });
      } else {
        return;
      }
    },
    // 進入聊天
    goComputer() {
      if (this.isOwner) {
        const id = this.roomId;
        this.$store.commit("Enter", id);
        this.$router.push({ name: "Chat", query: { id } });
      } else {
        return;
      }
    },
    // 換房間
    changeRoom() {
      this.roomId = this.$route.query.id;
      // 取得房間資訊
      getRoomInfo(this.roomId, this.$store.getters.userSeriel).then(res1 => {
        this.isOwner = res1.data.isOwner;
        console.log(res1.data);
        console.log("pppp");
        console.log(res1.data.isOwner);
        this.photo1 = res1.data.photo1;
        this.photo2 = res1.data.photo2;
        this.photo3 = res1.data.photo3;
        this.isEnvelope = res1.data.hasNewMail;
      });
    }
  }
};
</script>

<style scoped>
/* 導覽列 */
.base__head {
  position: absolute;
  margin-right: 0;
  z-index: 2;
}
.room__body {
  margin-left: 0;
  padding-left: 0;
}
.row {
  position: relative;
  max-width: 100vw;
  width: 100vw;
  height: 50vw;
  background-image: url("../../static/imgs/room/bgColor/bg_blue.jpg");
  background-repeat: none;
  background-size: cover;
  background-position: center;
  left: 0;
  margin: 0;
}
/* 衣櫃 */
.wardrobeImgBox {
  position: absolute;
  max-width: 18%;
  width: 18%;
  left: 24%;
  top: 28%;
}
.wardrobeImg {
  width: 100%;
}
.wardrobeImg:hover {
  opacity: 0.5;
}
/* 書櫃 */
.bookcaseImgBox {
  position: absolute;
  max-width: 10%;
  width: 10%;
  left: 45.5%;
  top: 44%;
}
.bookcaseImg {
  width: 100%;
}
.bookcaseImg:hover {
  opacity: 0.5;
}
/* 日記本 */
.diaryImgBox {
  position: absolute;
  max-width: 10%;
  width: 10%;
  left: 44%;
  top: 81%;
}
.diaryImg {
  width: 100%;
}
.diaryImg:hover {
  opacity: 0.5;
}
/* 電腦 */
.computerDeskBox {
  position: absolute;
  max-width: 20%;
  width: 20%;
  left: 58.5%;
  top: 36%;
}
.computerDeskImg {
  width: 100%;
}
/* .computerDeskImg:hover {
  opacity: 0.5;
} */
.envelope {
  position: absolute;
  position: absolute;
  display: block;
  font-size: 4vw;
  left: 39%;
  top: 7%;
}
.envelope:hover {
  opacity: 0.5;
}
/* 照片容器 */
.photoImgBox {
  position: absolute;
  max-width: 20%;
  width: 20%;
  height: 16%;
  left: 21.7%;
  top: -8px;
}
/* 照片 */
.photoImg__base {
  width: 100%;
}
.photoImg__base:hover {
  opacity: 0.5;
}
.wardrobe {
  position: absolute;
  z-index: 2;
  margin: 0;
}
/* 牆上照片 */
.photoOne {
  position: absolute;
  left: 15.1%;
  top: 47%;
  width: 20.2%;
  height: 50%;
  background-color: gray;
}
.photoImgOne {
  width: 100%;
  height: 100%;
}
.photoTwo {
  position: absolute;
  transform: rotate(4deg);
  left: 42.8%;
  top: 42%;
  width: 20%;
  height: 50%;
  background-color: gray;
}
.photoImgTwo {
  width: 100%;
  height: 100%;

  transform: rotate(4deg);
}
.photoThree {
  position: absolute;
  transform: rotate(-15deg);
  left: 69.5%;
  top: 33%;
  width: 20.2%;
  height: 50%;
  background-color: gray;
}
.photoImgThree {
  width: 100%;
  height: 100%;
  transform: rotate(-15deg);
}
/* @keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
.blink {
  color: red;
  padding: 10px;
  font-size: 15px;
  height: 60px;
  animation: fade 600ms infinite;
  -webkit-animation: fade 600ms infinite;
} */
</style>
