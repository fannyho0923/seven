<template>
  <main class="main">
    <div class="row">
      <section class="room__body">
        <!-- 相片牆:放相片 -->
        <!-- 衣櫥:換房間樣式 -->
        <div class="pointer photoImgBox">
          <img
            class="pointer photoImg img-resp"
            src="../../static/imgs/room/photo.png"
            alt="photoPic"
            width="698"
            height="349"
          />
        </div>
        <Photo />
        <div class="pointer wardrobeImgBox">
          <img
            class="pointer wardrobeImg img-resp"
            src="../../static/imgs/room/wardrobe.png"
            alt="wardrobePic"
            width="373"
            height="493"
            @click="opevWardrobe"
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
        <div class="pointer computerBox" @click="goComputer"></div>
      </section>
    </div>
  </main>
</template>

<script>
import { getRoomInfo } from "@/js/all.js";
import Photo from "@/components/Photo.vue";
import Wardrobe from "@/components/Wardrobe.vue";
export default {
  data() {
    return {
      showWardrobe: false,
      isblink: false,
      isOwner: false
    };
  },
  components: {
    Photo,
    Wardrobe
  },
  created() {
    // this.$store.commit("Enter", this.$route.query.id);
    // 取得房間資訊
    getRoomInfo(
      this.$store.getters.doorIndex,
      this.$store.getters.userSeriel
    ).then(res1 => {
      this.isOwner = res1.data.isOwner;
      console.log(res1.data.isOwner);
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
    opevWardrobe() {
      this.showWardrobe = true;
    },
    // 關閉衣櫃
    closeWardrobe() {
      this.showWardrobe = false;
    },
    goBlog() {
      const index = this.$store.getters.doorIndex;
      this.$router.push({
        path: "/bookcase",
        query: { id: index }
      });
    },
    goDiary() {
      if (this.isOwner) {
        this.$router.push("/diary");
      } else {
        return;
      }
    },
    goComputer() {
      if (this.isOwner) {
        this.$router.push("/chat");
      } else {
        return;
      }
    }
  }
};
</script>

<style scoped>
.room__body {
  margin-left: 0;
  padding-left: 0;
}
.row {
  position: relative;
  max-width: 100vw;
  width: 100vw;
  height: 50vw;
  background-image: url("../../static/imgs/room/roomBg.png");
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
  box-shadow: -1px 0 5px black;
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
.computerBox {
  position: absolute;
  max-width: 10%;
  width: 10%;
  height: 16%;
  left: 60.5%;
  top: 38%;
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
.photoImg {
  width: 100%;
}
.photoImg:hover {
  opacity: 0.5;
}
.wardrobe {
  position: absolute;
  z-index: 2;
  margin: 0;
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
