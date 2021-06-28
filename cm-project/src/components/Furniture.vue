<template>
  <div>
    <div class="furnitureBg">
      <!-- 圖片預覽以及左右按鈕區塊 -->
      <div class="typeBox mx-auto">
        <div class="left__btn">
          <img
            class="leftBtn__img pointer"
            src="../../static/imgs/room/leftBtn.png"
            alt="左邊按鈕"
            width="224"
            height="346"
          />
        </div>
        <div class="imgBox mx-auto"></div>
        <div class="right__btn">
          <img
            class="rightBtn__img pointer"
            src="../../static/imgs/room/rightBtn.png"
            alt="右邊按鈕"
            width="224"
            height="346"
          />
        </div>
      </div>
      <div class="choose__btn pointer mx-auto" @click="use">套用</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    // item: {
    //   type: Array
    // }
  },
  methods: {
    // 套用按鈕
    use() {}
  }
};
</script>

<style scoped>
.furnitureBg {
  /* position: relative; */
  /* min-width: 200px;
  min-height: 200px; */
}
.furniture__body {
  position: absolute;
  display: flex;
  /* width: 100%; */
  /* background-color: violet; */
}
/* 放預覽和左右按鈕的容器 */
.typeBox {
  display: flex;
  margin-top: 2rem;
  width: 80%;
  background-color: darkgray;
}
/* 照片 */
.img {
  width: 100%;
  /* opacity: 0; */
}
/* 左邊按鈕容器 */
.left__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4vw;
}
/* 左邊按鈕照片 */
.leftBtn__img {
  width: 100%;
  height: auto;
}
.leftBtn__img:hover {
  opacity: 0.7;
}
/* 右邊按鈕 */
.right__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4vw;
}
/* 右邊按鈕照片 */
.rightBtn__img {
  width: 100%;
  height: auto;
}
.rightBtn__img:hover {
  opacity: 0.7;
}
/* 放照片容器 */
.imgBox {
  width: 23vw;
  height: 23vw;
  background-color: darkorange;
}
/* 套用按鈕 */
.choose__btn {
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 10%;
  min-width: 30px;
  font-size: 1.5rem;
  border: solid 1px black;
  border-radius: 10%;
  background-color: darksalmon;
}
</style>
