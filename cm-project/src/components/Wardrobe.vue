<template>
  <div>
    <div class="WardrobeBg">
      <section class="wardrobe__base mx-auto">
        <!-- 左邊選擇物品區塊 -->
        <aside class="leftBox">
          <!-- 左邊標題 -->
          <header class="leftTit">選擇物品</header>
          <!-- 選單 -->
          <nav class="list__base">
            <ul class="list__body">
              <li class="item pointer">日記</li>
              <li class="item pointer">書櫃</li>
              <li class="item pointer">書桌</li>
              <li class="item pointer">衣櫃</li>
              <li class="item pointer">床組</li>
              <li class="item pointer">裝飾</li>
              <li class="item pointer">牆壁</li>
            </ul>
          </nav>
        </aside>
        <!-- 右邊選擇風格區塊 -->
        <aside class="rightBox">
          <!-- 右邊標題 -->
          <header class="rightTit">物品風格名稱</header>
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
            <div class="imgBox mx-auto">
              <img class="img" src="" alt="" />
            </div>
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
        </aside>
        <!-- 關閉視窗按鈕 -->
        <div class=" pointer leave__btn" @click.self="leave">Ｘ</div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    //關閉視窗按鈕
    leave() {
      this.$emit("leave");
    },
    // 套用按鈕
    use() {}
  }
};
</script>

<style scoped>
/* 遮罩 */
.WardrobeBg {
  position: absolute;
  left: 0;
  width: 100vw;
  height: 50vw;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
/* 衣櫃彈窗基底 */
.wardrobe__base {
  display: flex;
  position: relative;
  margin-top: 7rem;
  width: 80%;
  background-color: blue;
}
/* 關閉彈窗 */
.leave__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px black;
  width: 3.5vw;
  height: 3.5vw;
  font-size: 3.5vw;
  left: 101%;
  top: 0;
  /* background-color: rgb(43, 189, 226); */
}
/* 左邊區塊 */
.leftBox {
  width: 45%;
  height: 100%;
  background-color: burlywood;
}
/* 右邊區塊 */
.rightBox {
  width: 55%;
  height: 100%;
  background-color: chartreuse;
}
/* 左邊標題 */
.leftTit {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  font-size: 2vw;
  background-color: cornflowerblue;
}
/* 右邊標題 */
.rightTit {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  font-size: 2vw;

  background-color: rgb(237, 100, 191);
}
/* 家具清單 */
.list__base {
  margin-top: 2rem;
  background-color: cyan;
}
.list__body {
  padding: 0;
  background-color: cornsilk;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
}
/* 家具項目 */
.item {
  /* margin: 0.5rem; */
  background-color: darkcyan;
  width: 100%;
  margin-bottom: 0.3rem;
  text-align: center;
}
.item:hover {
  opacity: 0.7;
}
/* 放預覽和左右按鈕的容器 */
.typeBox {
  display: flex;
  margin-top: 2rem;
  width: 80%;
  background-color: darkgray;
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
