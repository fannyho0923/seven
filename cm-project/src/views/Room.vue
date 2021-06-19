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
          />
        </div>
        <Wardrobe />
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
        <Computer />
        <div class="pointer computerBox"></div>
        <Computer />
      </section>
    </div>
  </main>
</template>

<script>
import Photo from "@/components/Photo.vue";
import Wardrobe from "@/components/Wardrobe.vue";
import Computer from "@/components/Computer.vue";
export default {
  data() {
    return {
      showBlog: false,
      isblink: false
    };
  },
  components: {
    Photo,
    Wardrobe,
    Computer
  },
  methods: {
    showBookcase() {
      showBlog = true;
    },
    goBlog() {
      this.$router.push("/bookcase");
    },
    goDiary() {
      this.$router.push("/diary");
    }
  }
};
</script>

<style scoped>
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
/* 電腦 */
.computerBox {
  position: absolute;
  max-width: 10%;
  width: 10%;
  height: 16%;
  left: 60.5%;
  top: 38%;
}
/* 照片 */
.photoImgBox {
  position: absolute;
  max-width: 20%;
  width: 20%;
  height: 16%;
  left: 21.7%;
  top: -8px;
}
.photoImg {
  width: 100%;
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
