<template>
  <div class="card__base" @click="change">
    <section
      class="card__body"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
    >
      <!-- 左邊影片縮圖 -->
      <aside class="leftBox">
        <div class="imgBox">
          <img :src="playlist.postImg" alt="縮圖" width="200" height="120" />
        </div>
      </aside>
      <!-- 右邊影片名稱和上傳者資訊 -->
      <aside class="rightBox">
        <p class="title">
          {{ playlist.postTitle }}
        </p>
        <p class="info">
          上傳者：{{ playlist.posterNickName }}&ensp;上傳日期：{{
            playlist.postTime
          }}
        </p>
        <!-- 垃圾桶 -->
        <div
          v-show="isHover"
          class="trash__btn"
          @click.stop="deleteVedio"
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
        >
          <img
            class="pointer"
            src="../../static/imgs/memoImg/mini_trash.png"
            alt="mini_trash"
            width="20"
            height="20"
            @mouseenter="isHover = true"
            @mouseleave="isHover = false"
          />
        </div>
      </aside>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHover: false
    };
  },
  props: {
    playlist: {
      type: Object
    }
  },
  // 刪除影片
  methods: {
    deleteVedio() {
      this.$emit("deleteVedio");
    },
    // 換影片
    change() {
      this.$emit("change");
    }
  }
};
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* background-color: coral; */
  width: 60%;
  /* overflow: hidden; */
  /* max-height: 10rem; */
}
/* 影片縮圖 */
.imgBox {
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
  font-size: 1vw;
  /* background-color: cornflowerblue; */
  overflow: hidden;
}
/* 影片資訊 */
.info {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  /* background-color: darkgray; */
  text-align: center;
  overflow: hidden;
  font-size: 0.8vw;
}
/* 垃圾桶按鈕 */
.trash__btn {
  visibility: visible;
  position: absolute;
  left: 92%;
  top: 5%;
}
.trash__btn:hover {
  opacity: 0.5;
}
</style>
