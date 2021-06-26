<template>
  <div class="articleBox  pointer" @click="see">
    <!-- 從後端拿取日期 -->
    <div v-if="arr.postTime" class="day text-center">{{ arr.postTime }}</div>
    <div v-else class="day text-center">{{ date }}</div>
    <!-- 分隔線 -->
    <hr class="hr" />
    <!-- 照片塊 -->
    <div class="imgBox">
      <img class="articleImg" :src="arr.postImg" alt="發文圖片" />
    </div>
    <!-- 文字區塊 -->
    <div class="textBox">
      <p class="text">
        {{ arr.postText }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    arr: {
      type: Object
    }
  },
  data() {
    return {
      isPhoto: false,
      date: new Date().toString().slice(4, 15)
    };
  },
  methods: {
    // 點擊看文章與留言
    see() {
      this.$emit("see");
    }
  }
};
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.articleImg {
  max-width: 100%;
  max-height: 100%;
  vertical-align: bottom;
  /* background-color: cornflowerblue; */
}
/* 文字區塊 */
.textBox {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: 25%;
  border: solid 1px rgb(5, 21, 248);
  margin: 0.5rem;
  padding: 0.5rem;
}
/* 文字 */
.text {
  margin: 0;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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
