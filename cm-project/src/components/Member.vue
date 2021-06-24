<template>
  <main>
    <div class="memberBox">
      <!-- 頭像 -->
      <aside class="head">
        <img
          class="avatarImg  pointer"
          :src="memberArr.src"
          alt="memberPic"
          width="100"
          height="100"
        />
      </aside>
      <!-- 名字 -->
      <aside class="name">
        <label class="pointer">{{ memberArr.name }}</label>
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
  overflow: hidden;
}
/* 頭像框 */
.head {
  width: 3.6vw;
  height: 3.6vw;
  border: solid 1px red;
  border-radius: 50%;
}
/* 照片 */
.avatarImg {
  max-width: 100%;
  width: 100%;
  object-fit: contain;
  object-position: top;
}
/* 名字 */
.name {
  width: 55%;
  max-height: 3vw;
  height: 2.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
}
</style>
