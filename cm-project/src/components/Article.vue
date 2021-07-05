<template>
  <div class="articleBody  pointer" @click="see">
    <!-- 從後端拿取日期 -->
    <div v-if="arr.postTime" class="day text-center">{{ arr.postTime }}</div>
    <div v-else class="day text-center">{{ date }}</div>
    <!-- 分隔線 -->
    <hr class="hr" />
    <!-- 照片塊 -->
    <div
      :style="{ width: `${setWidth}px`, height: `${setWidth}px` }"
      class="imgBox"
    >
      <img v-if="imgSrc" class="articleImg" :src="imgSrc" alt="發文圖片" />
      <img
        v-if="!imgSrc"
        class="articleImg"
        :src="'http://35.201.237.18/img/avatar_' + arr.posterRoleId + '.png'"
        alt="發文圖片"
      />
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
      date: new Date().toString().slice(4, 15),
      imgSrc: this.arr.postImg
    };
  },
  methods: {
    // 點擊看文章與留言
    see() {
      this.$emit("see");
    }
  },
  computed: {
    setWidth() {
      console.log(document.querySelector(".articleBox").offsetWidth / 3);
      return document.querySelector(".blogBox").offsetWidth / 4;
    }
  }
};
</script>

<style scoped>
/* 單篇文章容器 */
.articleBody {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  box-shadow: 0 0 5px #ff8396;
  width: 30%;
  min-width: 300px;
  margin-bottom: 2rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  margin-top: 3rem;
  background-color: #f4acb7;
  color: #ff006ff0;
}
.hr {
  width: 100%;
}
/* 單篇照片容器 */
.imgBox {
  max-width: 100%;
  box-shadow: 0 0 5px #ff93a7;
  background-color: #ffcad4;
}
.articleImg {
  width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  vertical-align: bottom;
  /* background-color: cornflowerblue; */
}
/* 文字區塊 */
.textBox {
  margin-top: 0.5rem;
  padding: 0 0.5rem;
  width: 100%;
  /* background-color: indianred; */
}
/* 文字 */
.text {
  padding: 0.5rem;
  height: 2.8em;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  /* border: solid 1px rgb(5, 21, 248); */
  /* background-color: greenyellow; */
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
