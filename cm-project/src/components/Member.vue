<template>
  <main>
    <div class="memberBox">
      <!-- 頭像 -->
      <aside class="head">
        <img
          class="img img-resp"
          :src="memberArr.src"
          alt="memberPic"
          width="100"
          height="100"
        />
      </aside>
      <!-- 名字 -->
      <aside class="name">
        <label>{{ memberArr.name }}</label>
      </aside>
    </div>
  </main>
</template>

<script>
export default {
  props: ["memberArr"]
};
</script>

<style scoped>
/* 放頭像和名字容器 */
.memberBox {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background-color: slateblue;
}
/* 頭像框 */
.head {
  width: 4vw;
  height: 4vw;
  border: solid 1px red;
  border-radius: 50%;
}
/* 照片 */
/* 螢幕縮小照片會往下移 */
.img {
  max-width: 100%;
  width: 100%;
}
/* 名字 */
.name {
  width: 55%;
  max-height: 3vw;
  height: 2.5vw;
  border: solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
}
</style>
