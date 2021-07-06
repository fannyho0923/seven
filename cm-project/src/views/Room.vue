<template>
  <main class="main">
    <div v-if="colorType" class="row" :style="setLayout">
      <!-- 導覽列表 -->
      <header class="base__head">
        <IconList @goRoom="changeRoom" @move="goMove" />
      </header>
      <!-- 房主頭像 -->
      <div class="ownerBg">
        <div class="ownerBox">
          <div class="ownerAvatar">
            <img
              v-if="roleID"
              class="pointer owneImg"
              :src="'http://35.201.237.18/img/avatar_' + roleID + '.png'"
              alt="房主頭像"
              @click.self="watchInfo"
            />
          </div>

          <div class="ownerInfo">
            <p class="ownerName">{{ ownerName }}</p>
          </div>
        </div>
      </div>
      <section class="room__body">
        <!-- 房間裝飾 -->
        <div class="decoImgBox ">
          <img class="decoImg " :src="decoArr[decoSrc - 1].src" alt="裝飾" />
        </div>
        <!-- 相片牆:放相片 -->
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
        <div
          v-if="closetSrc"
          :class="{ pointer: isOwner }"
          class=" wardrobeImgBox"
        >
          <img
            :class="{ pointer: isOwner }"
            class=" wardrobeImg img-resp"
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
        <div :class="{ pointer: isOwner }" v-if="diarySrc" class=" diaryImgBox">
          <img
            :class="{ pointer: isOwner }"
            class=" diaryImg img-resp"
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
            :style="display"
            class="pointer envelope far fa-envelope"
            @click="goComputer"
          ></i>
          <i
            v-if="isOwner && !isEnvelope"
            :style="display"
            class="pointer envelope far fa-envelope-open"
            @click="goComputer"
          >
          </i>
        </div>
      </section>
      <div v-if="showInfo" class="personalInfoBox">
        <PersonalInfo @leave="closeInfo" :user="ownerSeriel" :isOwner="false" />
      </div>
    </div>
  </main>
</template>

<script>
import { getRoomInfo, userTransferGroup } from "@/js/all.js";
import Photo from "@/components/Photo.vue";
import Wardrobe from "@/components/Wardrobe.vue";
import IconList from "../components/IconList.vue";
import PersonalInfo from "../components/PersonalInfo.vue";
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
      ownerName: "",
      roleID: 0,
      ownerSeriel: 0,
      showInfo: false,
      wallArr: [
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/bgColor/bg_blue.jpg")
        },
        {
          itemIndex: 2,
          src: require("@/assets/imgs/room/bgColor/bg_pink.png")
        },
        {
          itemIndex: 3,
          src: require("@/assets/imgs/room/bgColor/bg_gray.png")
        },
        {
          itemIndex: 4,
          src: require("@/assets/imgs/room/bgColor/bg_green.png")
        },
        {
          itemIndex: 5,
          src: require("@/assets/imgs/room/bgColor/bg_purple.png")
        },
        {
          itemIndex: 6,
          src: require("@/assets/imgs/room/bgColor/bg_orange.png")
        },
        {
          itemIndex: 7,
          src: require("@/assets/imgs/room/bgColor/bg_brown.png")
        }
      ],
      bedArr: [
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/bedColor/bed_brown.png")
        },
        {
          itemIndex: 2,
          src: require("@/assets/imgs/room/bedColor/bed_pink.png")
        },
        {
          itemIndex: 3,
          src: require("@/assets/imgs/room/bedColor/bed_purpleNor.png")
        },
        {
          itemIndex: 4,
          src: require("@/assets/imgs/room/bedColor/bed_red.png")
        },
        {
          itemIndex: 5,
          src: require("@/assets/imgs/room/bedColor/bed_purple.png")
        },
        {
          itemIndex: 6,
          src: require("@/assets/imgs/room/bedColor/bed_orange.png")
        },
        {
          itemIndex: 7,
          src: require("@/assets/imgs/room/bedColor/bed_blue.png")
        }
      ],
      diaryArr: [
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/diaryColor/diary_1.png")
        },
        {
          itemIndex: 2,
          src: require("@/assets/imgs/room/diaryColor/diary_2.png")
        },
        {
          itemIndex: 3,
          src: require("@/assets/imgs/room/diaryColor/diary_3.png")
        },
        {
          itemIndex: 4,
          src: require("@/assets/imgs/room/diaryColor/diary_4.png")
        },
        {
          itemIndex: 2,
          src: require("@/assets/imgs/room/diaryColor/diary_5.png")
        },
        {
          itemIndex: 3,
          src: require("@/assets/imgs/room/diaryColor/diary_6.png")
        },
        {
          itemIndex: 4,
          src: require("@/assets/imgs/room/diaryColor/diary_7.png")
        }
      ],
      bookcaseArr: [
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/bookcaseColor/bookcase_1.png")
        },
        {
          itemIndex: 2,
          src: require("@/assets/imgs/room/bookcaseColor/bookcase_2.png")
        },
        {
          itemIndex: 3,
          src: require("@/assets/imgs/room/bookcaseColor/bookcase_3.png")
        },
        {
          itemIndex: 4,
          src: require("@/assets/imgs/room/bookcaseColor/bookcase_4.png")
        },
        {
          itemIndex: 5,
          src: require("@/assets/imgs/room/bookcaseColor/bookcase_5.png")
        },
        {
          itemIndex: 6,
          src: require("@/assets/imgs/room/bookcaseColor/bookcase_6.png")
        },
        {
          itemIndex: 7,
          src: require("@/assets/imgs/room/bookcaseColor/bookcase_7.png")
        },
        {
          itemIndex: 8,
          src: require("@/assets/imgs/room/bookcaseColor/bookcase_8.png")
        },
        {
          itemIndex: 9,
          src: require("@/assets/imgs/room/bookcaseColor/bookcase_9.png")
        },
        {
          itemIndex: 10,
          src: require("@/assets/imgs/room/bookcaseColor/bookcase_10.png")
        },
        {
          itemIndex: 11,
          src: require("@/assets/imgs/room/bookcaseColor/bookcase_11.png")
        },
        {
          itemIndex: 12,
          src: require("@/assets/imgs/room/bookcaseColor/bookcase_12.png")
        }
      ],
      deskArr: [
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/deskColor/desk_1.png")
        },
        {
          itemIndex: 2,
          src: require("@/assets/imgs/room/deskColor/desk_2.png")
        },
        {
          itemIndex: 3,
          src: require("@/assets/imgs/room/deskColor/desk_3.png")
        },
        {
          itemIndex: 4,
          src: require("@/assets/imgs/room/deskColor/desk_4.png")
        },
        {
          itemIndex: 5,
          src: require("@/assets/imgs/room/deskColor/desk_5.png")
        },
        {
          itemIndex: 6,
          src: require("@/assets/imgs/room/deskColor/desk_6.png")
        },
        {
          itemIndex: 7,
          src: require("@/assets/imgs/room/deskColor/desk_7.png")
        },
        {
          itemIndex: 8,
          src: require("@/assets/imgs/room/deskColor/desk_8.png")
        }
      ],
      closetArr: [
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/closetColor/closet_1.png")
        },
        {
          itemIndex: 2,
          src: require("@/assets/imgs/room/closetColor/closet_2.png")
        },
        {
          itemIndex: 3,
          src: require("@/assets/imgs/room/closetColor/closet_3.png")
        },
        {
          itemIndex: 4,
          src: require("@/assets/imgs/room/closetColor/closet_4.png")
        },
        {
          itemIndex: 5,
          src: require("@/assets/imgs/room/closetColor/closet_5.png")
        },
        {
          itemIndex: 6,
          src: require("@/assets/imgs/room/closetColor/closet_6.png")
        },
        {
          itemIndex: 7,
          src: require("@/assets/imgs/room/closetColor/closet_7.png")
        },
        {
          itemIndex: 8,
          src: require("@/assets/imgs/room/closetColor/closet_8.png")
        }
      ],
      decoArr: [
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/decoColor/deco_1.png")
        },
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/decoColor/deco_2.png")
        },
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/decoColor/deco_3.png")
        },
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/decoColor/deco_4.png")
        },
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/decoColor/deco_5.png")
        },
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/decoColor/deco_6.png")
        },
        {
          itemIndex: 1,
          src: require("@/assets/imgs/room/decoColor/deco_7.png")
        }
      ]
    };
  },
  components: {
    Photo,
    Wardrobe,
    IconList,
    PersonalInfo
  },
  computed: {
    // 背景
    setLayout() {
      const image = this.wallArr[this.colorType - 1].src;
      return {
        backgroundImage: `url(${image})`
      };
    },
    display() {
      if (this.deskSrc === 1) {
        return "top: 6%; left:41%;";
      }
      if (this.deskSrc === 2) {
        return "top: 26%; left:26%;fontSize:3vw;";
      }
      if (this.deskSrc === 3) {
        return "top: 5%; left:49%;";
      }
      if (this.deskSrc === 4) {
        return "top: 24%;left: 9%;font-size: 3vw;";
      }
      if (this.deskSrc === 5) {
        return "top: 8%; left:44%;";
      }
      if (this.deskSrc === 6) {
        return "top: 11%; left:39%;";
      }
      if (this.deskSrc === 7) {
        return "top: 20%; left:30%;";
      }
      if (this.deskSrc === 8) {
        return "top: 8%; left:24%;";
      } else {
        return "top: 10%; left:40%;";
      }
    }
  },
  created() {
    this.roomId = this.$route.query.id;
    // 取得房間資訊
    getRoomInfo(this.roomId, this.$store.getters.userSeriel)
      .then(res1 => {
        this.isOwner = res1.data.isOwner;
        // console.log(res1.data);
        // console.log(res1.data.isOwner);
        this.roleID = res1.data.roleId;
        this.ownerName = res1.data.ownerName;
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
        this.ownerSeriel = res1.data.ownerSeriel;
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
        alert("不可以偷看別人衣櫃唷！");
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
        alert("不可以偷看別人日記歐！");
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
          // console.log(res1.data);
          // console.log(res1.data.isOwner);
          this.roleID = res1.data.roleId;
          this.ownerName = res1.data.ownerName;
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
          this.ownerSeriel = res1.data.ownerSeriel;
        })
        .catch(error => console.log(error));
    },
    updateData(type, count) {
      const furnitureEnum = {
        diary: "日記",
        bookcase: "書櫃",
        desk: "書桌",
        clothcase: "衣櫃",
        bed: "床組",
        decoretion: "裝飾",
        wall: "牆壁"
      };
      switch (type) {
        case furnitureEnum.diary:
          this.diarySrc = count + 1;
          break;
        case furnitureEnum.bookcase:
          this.bookcaseSrc = count + 1;
          break;
        case furnitureEnum.desk:
          this.deskSrc = count + 1;
          break;
        case furnitureEnum.clothcase:
          this.closetSrc = count + 1;
          break;
        case furnitureEnum.bed:
          this.bedSrc = count + 1;
          break;
        case furnitureEnum.decoretion:
          this.decoSrc = count + 1;
          break;
        case furnitureEnum.wall:
          this.colorType = count + 1;
          break;
        // no default
      }
      //this.roomId = this.$route.query.id;
      // 取得房間資訊
      // getRoomInfo(this.roomId, this.$store.getters.userSeriel)
      //   .then(res1 => {
      //     this.isOwner = res1.data.isOwner;
      //     console.log(res1.data.isOwner);
      //     this.photo1 = res1.data.photo1;
      //     this.photo2 = res1.data.photo2;
      //     this.photo3 = res1.data.photo3;
      //     this.isEnvelope = res1.data.hasNewMail;
      //     this.bedSrc = res1.data.bed;
      //     this.diarySrc = res1.data.diary;
      //     this.bookcaseSrc = res1.data.bookShelf;
      //     this.deskSrc = res1.data.desk;
      //     this.closetSrc = res1.data.closet;
      //     this.colorType = res1.data.colorType;
      //     this.decoSrc = res1.data.deco;
      //   })
      //   .catch(error => console.log(error));
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
    },
    // 查看玩家資訊
    watchInfo(data) {
      if (!data) {
        return;
      }
      this.userID = data;
      this.showInfo = true;
    },
    // 關閉玩家資訊
    closeInfo() {
      this.showInfo = false;
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
/* 信件 */
.envelope {
  position: absolute;
  display: block;
  /* font-size: 4vw;
   left: 39%;
   top: 7%; */
  font-size: 3.5vw;
  left: 40%;
  top: 10%;
}
.envelope:hover {
  opacity: 0.5;
  color: white;
}
/* 照片容器 */
.photoImgBox {
  position: absolute;
  max-width: 20%;
  width: 20%;
  height: 16%;
  left: 21.7%;
  top: -8px;
  z-index: 2;
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
  object-fit: cover;
  object-position: top;
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
  object-fit: cover;
  object-position: top;
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
  object-fit: cover;
  object-position: top;
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
  width: 99%;
  left: 1%;
  top: 3%;
  /* background-color: coral; */
}
.decoImg {
  width: 95%;
  /* background-color: rgba(128, 255, 0, 0.384); */
}
/* 房主頭像背景定位 */
.ownerBg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
/* 房主頭像和名稱容器 */
.ownerBox {
  position: relative;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  /* background-color: teal; */
}
/* 房主頭像容器 */
.ownerAvatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.9vw;
  height: 5.9vw;
  border-radius: 50%;
  margin: 1vw 1vw 0 1vw;
  box-shadow: 0 0 10px;
  /* background-color: rgb(231, 18, 196); */
}
/* 房主名字 */
.ownerName {
  margin: 0.5rem 0 0 0;
  font-size: 1.2vw;
  color: #1d3557;
  letter-spacing: 0.1rem;
}
/* 房間照片 */
.owneImg {
  width: 100%;
  border-radius: 50%;
  object-fit: contain;
}
/* 讓名片可以浮在最上層 */
.personalInfoBox {
  position: absolute;
  z-index: 7;
}
</style>
