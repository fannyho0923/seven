<template>
  <div>
    <div class="photoBg">
      <div class="photo__base mx-auto">
        <section class="photo__body">
          <div class="leftBox">
            <PhotoPic class="leftBox__body" :photo="photoOne" :photoIndex="1" />
          </div>
          <div class="midBox">
            <PhotoPic class="midBox__body" :photo="photoTwo" :photoIndex="2" />
          </div>
          <div class="rightBox">
            <PhotoPic
              class="rightBox__body"
              :photo="photoThree"
              :photoIndex="3"
            />
          </div>
        </section>
        <!-- 關閉視窗按鈕 -->
        <div class="pointer leave__btn" @click="leave">
          <img
            class="closeIcon"
            src="../../static/imgs/closeIcon.png"
            alt="closeIcon"
            width="252"
            height="252"
            @click="leave"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoPic from "@/components/PhotoPic.vue";
export default {
  props: ["photoOne", "photoTwo", "photoThree"],
  components: {
    PhotoPic
  },
  methods: {
    //   關閉彈窗
    leave() {
      this.$emit("leave");
    }
  }
};
</script>

<style scoped>
/* 遮罩 */
.photoBg {
  position: absolute;
  z-index: 2;
  left: 0;
  width: 100vw;
  height: 50vw;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
/* 衣櫃彈窗基底 */
.photo__base {
  display: flex;
  position: relative;
  margin-top: 3rem;
  width: 80%;
  height: 45rem;
  /* background-color: blue; */
}
/* 放三張照片的容器 */
.photo__body {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* background-color: coral; */
}
/* 關閉彈窗 */
.leave__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5vw;
  height: 3.5vw;
  font-size: 3.5vw;
  left: 101%;
  top: 0;
  /* background-color: rgb(43, 189, 226); */
}
/* 左邊照片 */
.leftBox {
  min-width: 200px;
  min-height: 260px;
  width: 25vw;
  /* background-color: cornflowerblue; */
}
.leftBox__body {
  min-width: 200px;
  min-height: 260px;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 30vw;
  box-shadow: 0 0 10px #748888;
  background-color: #e0fbfc;
  border-radius: 5px;
}
/* 中間照片 */
.midBox {
  min-width: 200px;
  min-height: 260px;
  width: 25vw;

  /* background-color: cornsilk; */
}
.midBox__body {
  min-width: 200px;
  min-height: 260px;
  position: relative;
  bottom: -30%;
  width: 100%;
  height: 30vw;
  box-shadow: 0 0 10px rgb(126, 145, 147);
  background-color: #9db4c0;
  border-radius: 5px;
}
/* 右邊照片 */
.rightBox {
  min-width: 200px;
  min-height: 260px;
  width: 25vw;

  /* background-color: darkkhaki; */
}
.rightBox__body {
  min-width: 200px;
  min-height: 260px;
  position: relative;
  top: 10%;
  right: 0;
  width: 100%;
  height: 30vw;
  box-shadow: 0 0 10px #a7c1c4;
  background-color: #c2dfe3;
  border-radius: 5px;
}
/* 離開按鈕照片 */
.closeIcon {
  width: 100%;
  height: auto;
}
.closeIcon:hover {
  opacity: 0.5;
}
</style>
