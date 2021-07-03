<template>
  <main class="main">
    <div v-if="colorType" class="row" :style="setLayout">
      <header class="base__head">
        <IconList @goRoom="changeRoom" @move="goMove" />
      </header>
      <section class="room__body">
        <!-- 房間裝飾 -->
        <div class="decoImgBox ">
          <img class="decoImg " :src="decoArr[decoSrc - 1].src" alt="裝飾" />
        </div>
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
        <!-- 衣櫃：換背景 -->
        <div v-if="closetSrc" class="pointer wardrobeImgBox">
          <img
            class="pointer wardrobeImg img-resp"
            :src="closetArr[closetSrc - 1].src"
            alt="wardrobePic"
            width="373"
            height="493"
            @click="openWardrobe"
          />
        </div>
        <!-- 衣櫃彈窗 -->
        <Wardrobe
          class="wardrobe"
          v-if="showWardrobe"
          @leave="closeWardrobe"
          @choose="updateData"
        />
        <div v-if="bedSrc" class="bedImgBox">
          <img
            class="bedImg img-resp"
            :src="bedArr[bedSrc - 1].src"
            alt="床照片"
            width="413"
            height="273"
          />
        </div>

        <!-- <div class="wall"><img src="" alt="" /></div>
        <div class="wall"><img src="" alt="" /></div>
        <div class="wall"><img src="" alt="" /></div>
        <div class="wall"><img src="" alt="" /></div> -->
        <!-- 書櫃:寫個版 -->
        <div v-if="bookcaseSrc" class="pointer bookcaseImgBox">
          <img
            class="pointer bookcaseImg img-resp"
            :src="bookcaseArr[bookcaseSrc - 1].src"
            alt="bookcasePic"
            width="365"
            height="582"
            @click="goBlog"
          />
        </div>
        <!-- 日記:寫日記 -->
        <div v-if="diarySrc" class="pointer diaryImgBox">
          <img
            class="pointer diaryImg img-resp"
            :src="diaryArr[diarySrc - 1].src"
            alt="diaryPic"
            width="628"
            height="496"
            @click="goDiary"
          />
        </div>
        <!-- 電腦:回郵件 -->
        <div class=" computerDeskBox">
          <img
            v-if="deskSrc"
            class=" computerDeskImg img-resp"
            :src="deskArr[deskSrc - 1].src"
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
import { getRoomInfo, userTransferGroup } from "@/js/all.js";
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
      roomId: 0,
      bedSrc: 1,
      diarySrc: 1,
      bookcaseSrc: 1,
      deskSrc: 1,
      closetSrc: 1,
      colorType: 1,
      decoSrc: 1,
      wallArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/bgColor/bg_blue.jpg"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/bgColor/bg_pink.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/bgColor/bg_gray.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/bgColor/bg_green.png"
        },
        {
          itemIndex: 5,
          src: "../../static/imgs/room/bgColor/bg_purple.png"
        },
        {
          itemIndex: 6,
          src: "../../static/imgs/room/bgColor/bg_orange.png"
        },
        {
          itemIndex: 7,
          src: "../../static/imgs/room/bgColor/bg_brown.png"
        }
      ],
      bedArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/bedColor/bed_brown.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/bedColor/bed_pink.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/bedColor/bed_purpleNor.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/bedColor/bed_red.png"
        },
        {
          itemIndex: 5,
          src: "../../static/imgs/room/bedColor/bed_purple.png"
        },
        {
          itemIndex: 6,
          src: "../../static/imgs/room/bedColor/bed_orange.png"
        },
        {
          itemIndex: 7,
          src: "../../static/imgs/room/bedColor/bed_blue.png"
        }
      ],
      diaryArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/diaryColor/diary_1.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/diaryColor/diary_2.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/diaryColor/diary_3.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/diaryColor/diary_4.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/diaryColor/diary_5.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/diaryColor/diary_6.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/diaryColor/diary_7.png"
        }
      ],
      bookcaseArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/bookcaseColor/bookcase_1.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/bookcaseColor/bookcase_2.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/bookcaseColor/bookcase_3.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/bookcaseColor/bookcase_4.png"
        },
        {
          itemIndex: 5,
          src: "../../static/imgs/room/bookcaseColor/bookcase_5.png"
        },
        {
          itemIndex: 6,
          src: "../../static/imgs/room/bookcaseColor/bookcase_6.png"
        },
        {
          itemIndex: 7,
          src: "../../static/imgs/room/bookcaseColor/bookcase_7.png"
        },
        {
          itemIndex: 8,
          src: "../../static/imgs/room/bookcaseColor/bookcase_8.png"
        },
        {
          itemIndex: 9,
          src: "../../static/imgs/room/bookcaseColor/bookcase_9.png"
        },
        {
          itemIndex: 10,
          src: "../../static/imgs/room/bookcaseColor/bookcase_10.png"
        },
        {
          itemIndex: 11,
          src: "../../static/imgs/room/bookcaseColor/bookcase_11.png"
        },
        {
          itemIndex: 12,
          src: "../../static/imgs/room/bookcaseColor/bookcase_12.png"
        }
      ],
      deskArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/deskColor/desk_1.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/deskColor/desk_2.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/deskColor/desk_3.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/deskColor/desk_4.png"
        },
        {
          itemIndex: 5,
          src: "../../static/imgs/room/deskColor/desk_5.png"
        },
        {
          itemIndex: 6,
          src: "../../static/imgs/room/deskColor/desk_6.png"
        },
        {
          itemIndex: 7,
          src: "../../static/imgs/room/deskColor/desk_7.png"
        },
        {
          itemIndex: 8,
          src: "../../static/imgs/room/deskColor/desk_8.png"
        }
      ],
      closetArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/closetColor/closet_1.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/closetColor/closet_2.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/closetColor/closet_3.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/closetColor/closet_4.png"
        },
        {
          itemIndex: 5,
          src: "../../static/imgs/room/closetColor/closet_5.png"
        },
        {
          itemIndex: 6,
          src: "../../static/imgs/room/closetColor/closet_6.png"
        },
        {
          itemIndex: 7,
          src: "../../static/imgs/room/closetColor/closet_7.png"
        },
        {
          itemIndex: 8,
          src: "../../static/imgs/room/closetColor/closet_8.png"
        }
      ],
      decoArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_1.png"
        },
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_2.png"
        },
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_3.png"
        },
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_4.png"
        },
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_5.png"
        },
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_6.png"
        },
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_7.png"
        }
      ]
    };
  },
  components: {
    Photo,
    Wardrobe,
    IconList
  },
  computed: {
    // 背景
    setLayout() {
      const image = this.wallArr[this.colorType - 1].src;
      return {
        backgroundImage: `url(${image})`
      };
    }
  },
  created() {
    this.roomId = this.$route.query.id;
    // 取得房間資訊
    getRoomInfo(this.roomId, this.$store.getters.userSeriel)
      .then(res1 => {
        this.isOwner = res1.data.isOwner;
        console.log(res1.data);
        console.log(res1.data.isOwner);
        this.photo1 = res1.data.photo1;
        this.photo2 = res1.data.photo2;
        this.photo3 = res1.data.photo3;
        this.isEnvelope = res1.data.hasNewMail;
        this.bedSrc = res1.data.bed;
        this.diarySrc = res1.data.diary;
        this.bookcaseSrc = res1.data.bookShelf;
        this.deskSrc = res1.data.desk;
        this.closetSrc = res1.data.closet;
        this.colorType = res1.data.colorType;
        this.decoSrc = res1.data.deco;
        // console.log(this.deskArr[this.deskSrc].src);
      })
      .catch(error => console.log(error));
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
      if (this.isOwner) {
        this.showWardrobe = true;
      } else {
        return;
      }
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
      getRoomInfo(this.roomId, this.$store.getters.userSeriel)
        .then(res1 => {
          this.isOwner = res1.data.isOwner;
          console.log(res1.data);
          console.log(res1.data.isOwner);
          this.photo1 = res1.data.photo1;
          this.photo2 = res1.data.photo2;
          this.photo3 = res1.data.photo3;
          this.bedSrc = res1.data.bed;
        })
        .catch(error => console.log(error));
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
      getRoomInfo(this.roomId, this.$store.getters.userSeriel)
        .then(res1 => {
          this.isOwner = res1.data.isOwner;
          console.log(res1.data);
          console.log("pppp");
          console.log(res1.data.isOwner);
          this.photo1 = res1.data.photo1;
          this.photo2 = res1.data.photo2;
          this.photo3 = res1.data.photo3;
          this.isEnvelope = res1.data.hasNewMail;
          this.bedSrc = res1.data.bed;
          this.diarySrc = res1.data.diary;
          this.bookcaseSrc = res1.data.bookShelf;
          this.deskSrc = res1.data.desk;
          this.closetSrc = res1.data.closet;
          this.colorType = res1.data.colorType;
          this.decoSrc = res1.data.deco;
        })
        .catch(error => console.log(error));
    },
    updateData() {
      this.roomId = this.$route.query.id;
      // 取得房間資訊
      getRoomInfo(this.roomId, this.$store.getters.userSeriel)
        .then(res1 => {
          this.isOwner = res1.data.isOwner;
          console.log(res1.data.isOwner);
          this.photo1 = res1.data.photo1;
          this.photo2 = res1.data.photo2;
          this.photo3 = res1.data.photo3;
          this.isEnvelope = res1.data.hasNewMail;
          this.bedSrc = res1.data.bed;
          this.diarySrc = res1.data.diary;
          this.bookcaseSrc = res1.data.bookShelf;
          this.deskSrc = res1.data.desk;
          this.closetSrc = res1.data.closet;
          this.colorType = res1.data.colorType;
          this.decoSrc = res1.data.deco;
        })
        .catch(error => console.log(error));
    },
    goMove() {
      // 打api：搬到新的社群
      userTransferGroup(this.$store.getters.userSeriel)
        .then(res => {
          console.log(res.data);
          if (res.data) {
            this.$router.push("/publicArea");
          }
        })
        .catch(error => console.log(error));
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
  /* background-image: url("../../static/imgs/room/bgColor/bg_blue.jpg"); */
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
  height: 47.5%;
  left: 24%;
  top: 28%;
  display: flex;
  /* background-color: blue; */
}
.wardrobeImg {
  vertical-align: bottom;
  /* display: inline-block; */
  /* flex-direction: column-reverse; */
  /* width: 100%; */
  /* height: 100%; */
  /* object-fit: contain; */
  /* background-color: rgb(111, 111, 235); */
}
.wardrobeImg:hover {
  opacity: 0.5;
}
/* 書櫃 */
.bookcaseImgBox {
  position: absolute;
  max-width: 10%;
  width: 11%;
  height: 31.5%;
  left: 45.5%;
  top: 44%;
  display: flex;
  /* background-color: cornflowerblue; */
}
.bookcaseImg {
  /* width: 100%; */
  vertical-align: bottom;
}
.bookcaseImg:hover {
  opacity: 0.5;
}
/* 日記本 */
.diaryImgBox {
  position: absolute;
  max-width: 10%;
  width: 10%;
  height: 17%;
  left: 50%;
  top: 79%;
  display: flex;
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
  height: 41%;
  left: 58.5%;
  top: 42%;
  display: flex;
  /* background-color: rgb(31, 91, 202); */
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
  left: 42.9%;
  top: 42%;
  width: 20%;
  height: 50%;
  background-color: gray;
}
.photoImgTwo {
  width: 100%;
  height: 100%;

  transform: rotate(0deg);
}
.photoThree {
  position: absolute;
  transform: rotate(-15deg);
  transform: rotate(-15deg);
  left: 69.5%;
  top: 33%;
  width: 20.2%;
  height: 50.5%;
  background-color: gray;
}
.photoImgThree {
  width: 100%;
  height: 100%;
  transform: rotate(1deg);
}
/* 床 */
.bedImgBox {
  position: absolute;
  left: 12%;
  top: 70%;
  width: 22%;
  height: 27%;
  display: flex;
  /* background-color: burlywood; */
}
.bedImg {
  width: 100%;
}
/* 裝飾 */
.decoImgBox {
  position: absolute;
  left: 2%;
  top: 3%;
  /* background-color: coral; */
}
.decoImg {
  width: 100%;
  /* background-color: rgba(128, 255, 0, 0.384); */
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
