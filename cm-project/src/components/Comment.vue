<template>
  <div class="base__comment set-inlineBlock">
    <!-- 便條照片 -->
    <div class="commentBox set-inlineBlock">
      <img
        class="img img-resp"
        :src="memoSrc"
        alt="memoPic"
        width="100"
        height="100"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
      />
      <!-- 便條內容 -->
      <div
        :style="{ transform: 'rotate(' + memoDeg + 'deg)' }"
        class="article set-inlineBlock"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
      >
        {{ memoStr }}
      </div>
      <!-- 垃圾桶 -->
      <div
        v-show="isHover"
        class="trash__btn"
        :style="{ transform: 'rotate(' + memoDeg + 'deg)' }"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        @click="deleteMemo(memoIndex)"
      >
        <img
          class="pointer"
          src="@/assets/imgs/memoImg/mini_trash.png"
          alt="mini_trash"
          width="20"
          height="20"
        />
      </div>
    </div>
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
    memoStr: String,
    memoSrc: String,
    memoDeg: Number,
    memoIndex: Number
  },
  methods: {
    //刪掉便條動作
    deleteMemo(num) {
      this.$emit("deleteMemo", num);
    }
  }
};
</script>

<style scoped>
/* 便條照片容器 */
.commentBox {
  position: relative;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

/* 文字內容 */
.article {
  position: absolute;
  left: 15%;
  max-width: 70%;
  max-height: 70%;
  width: 70%;
  height: 70%;
  margin-top: 1.5rem;
  word-wrap: break-word;
  overflow: hidden;
  font-size: 1.2vw;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  /* text-overflow: ellipsis; */
}
/* 捲軸底色 */
.article::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.187);
  background-color: #55525302;
}
/* 捲軸寬度 */
.article::-webkit-scrollbar {
  width: 6px;
  background-color: rgba(0, 0, 0, 0.041);
}
/* 捲軸本體顏色 */
.article::-webkit-scrollbar-thumb {
  background-color: #8a878733;
}
/* 便條照片 */
.img {
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  height: auto;
}
/* 整個便條容器 */
.base__comment {
  position: relative;
  max-width: 10vw;
  max-height: 10vw;
  min-width: 150px;
  min-height: 150px;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 垃圾桶按鈕 */
.trash__btn {
  visibility: visible;
  position: absolute;
  left: 80%;
  top: 10%;
}
</style>
