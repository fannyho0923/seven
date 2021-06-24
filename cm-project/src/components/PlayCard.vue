<template>
  <div class="card__base">
    <section class="card__body">
      <!-- 左邊影片縮圖 -->
      <aside class="leftBox">
        <div>
          <iframe
            class="vedio"
            width="200"
            height="120"
            src="https://www.youtube.com/embed/Ed1NhR3CaAQ?controls=0&autoplay=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </aside>
      <!-- 右邊影片名稱和上傳者資訊 -->
      <aside class="rightBox">
        <p class="title">影片名稱</p>
        <p class="info">用戶名稱＋上傳時間</p>
      </aside>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card__base {
  margin: 0.5rem;
}
/* 放縮圖文字方塊容器 */
.card__body {
  display: flex;
}
/* 左邊影片縮圖 */
.leftBox {
  width: 40%;
  object-fit: contain;
  overflow: hidden;
}
/* 右邊影片名稱和上傳者資訊 */
.rightBox {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: coral;
  width: 60%;
  overflow: hidden;
  /* max-height: 10rem; */
}
/* 影片縮圖 */
.vedio {
  width: 100%;
  vertical-align: bottom;
}
/* 影片名稱 */
.title {
  padding-top: 1rem;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  bottom: 0;
  font-size: 2vw;
  background-color: cornflowerblue;
  overflow: hidden;
}
/* 影片資訊 */
.info {
  background-color: darkgray;
  text-align: center;
  overflow: hidden;
  font-size: 1vw;
}
</style>
