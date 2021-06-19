<template>
  <div class="articleBox ">
    <!-- 從後端拿取日期 -->
    <div class="day text-center">Jan-12-2021</div>
    <!-- 分隔線 -->
    <hr class="hr" />
    <!-- 照片塊 -->
    <div class="imgBox">
      <img class="img-resp" src="" alt="" />
    </div>
    <!-- 文字區塊 -->
    <div class="textBox"><p>預覽圖只會顯示三行字</p></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* 單篇文章容器 */
.articleBox {
  display: flex;
  flex-direction: column;
  border: solid 1px black;
  min-width: 200px;
  width: 25%;
  height: 60%;
  top: 50%;
  transform: translateY(-55%);
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 20rem;
}
/* 單篇照片容器 */
.imgBox {
  max-width: 100%;
  height: 50%;
  border: solid 1px rgb(16, 61, 29);
  margin-bottom: 1rem;
  margin: 0.5rem;
}
/* 文字區塊 */
.textBox {
  max-width: 100%;
  height: 25%;
  border: solid 1px rgb(5, 21, 248);
  margin: 0.5rem;
}
/* 分隔線 */
.hr {
  margin: 0.5rem;
}
/* 日期 */
.day {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
}
</style>
