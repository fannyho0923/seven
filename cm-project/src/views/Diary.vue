<template>
  <main class="main mx-auto">
    <header class="title"><h1 class="text-center">Diary</h1></header>
    <div class="row mx-auto">
      <!-- 背景照片 -->
      <div class="imgBox">
        <img
          class="bgImg img-resp"
          src="../../static/imgs/room/openDiary.png"
          alt="bookPic"
          width="6640"
          height="4638"
        />
      </div>
      <!-- 左頁 -->
      <aside class="leftBox">
        <!-- 文字 -->
        <label class="lab__left">選擇日期</label>
        <!-- 分隔線 -->
        <hr />
        <!-- 月曆 -->
        <!-- <date-picker :lang="lang"></date-picker> -->
        <div class="calendarBox">
          <date-picker
            class="calend"
            :lang="lang"
            v-model="time1"
            valueType="format"
            format="MMM-DD-YYYY"
            append-to-body
            open
            :popup-style="{
              position: 'absolute'
            }"
          ></date-picker>
          <!-- <date-picker v-model="time2" type="datetime"></date-picker> -->
          <!-- <date-picker v-model="time3" range></date-picker> -->
        </div>
        <div>
          <section class="calandarBob"></section>
        </div>
        <!-- 圖片 -->
        <div class="">
          <img src="" alt="" />
        </div>
      </aside>
      <!-- 右頁 -->
      <aside class="rightBox">
        <!-- 日期 -->
        <label class="lab__right"> &ensp;{{ time1 }} &ensp;</label>
        <!-- 分隔線 -->
        <hr />
        <!-- 文章 -->
        <div class="article__body">
          <textarea class="textArea" v-model="content"></textarea>
          <div class="btnBox">
            <button
              type="submit"
              class=" set-inlineBlock postBtn"
              @click.prevent="post"
            >
              儲存
            </button>
          </div>
        </div>
      </aside>
      <!-- 關閉視窗按鈕 -->
      <div class="pointer leave__btn" @click="leave">Ｘ</div>
    </div>
  </main>
</template>

<script>
import "vue2-datepicker/index.css";
// import "vue2-datepicker/locale/zh-Hant-TW";
export default {
  data() {
    return {
      content: "",
      time1:
        new Date().getMonth() +
        1 +
        "-" +
        new Date().getDate() +
        "-" +
        new Date().getFullYear(),
      time2: null,
      time3: null,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false,
        popup: "calendar"
      }
    };
  },
  created() {
    this.content = "app";
  },
  methods: {
    leave() {
      this.$router.push("/room");
    },
    post() {
      console.log(this.content);
    }
  }
};
</script>

<style scoped>
/* 標題 */
.title {
}
/* 書本背景 */
.main {
  position: relative;
  width: 78%;
  /* background-color: pink; */
}
/* 背景照片容器 */
.imgBox {
  max-width: 100%;
}
/* 背景照片 */
.bgImg {
  width: 100%;
}
.row {
  position: relative;
  width: 95%;
  /* background-color: rgb(231, 52, 82); */
}
/* 離開按鈕 */
.leave__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px black;
  /* max-width: 5rem; */
  width: 3.5vw;
  height: 3.5vw;
  font-size: 3.5vw;
  left: 100%;
  top: 3%;
  /* background-color: rgb(43, 189, 226); */
}
/* 日記左邊 */
.leftBox {
  position: absolute;
  left: 12%;
  top: 8%;
  width: 34%;
  height: 74%;
  /* background-color: rgb(226, 183, 43); */
}
/* 日記右邊 */
.rightBox {
  position: absolute;
  left: 54%;
  top: 8%;
  width: 34%;
  height: 74%;
  /* background-color: rgb(43, 226, 98); */
}
/* 又頁內容 */
.article__body {
  max-height: 70%;
  height: 100%;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  /* background-color: teal; */
}
/* 文字輸入匡 */
.textArea {
  max-width: 100%;
  width: 100%;
  height: 100%;
  font-size: 18px;
  resize: none;
  background-color: transparent;
  border-style: none;
}
/* 儲存按鈕容器 */
.btnBox {
  display: flex;
  flex-direction: row-reverse;
}
/* 儲存按鈕 */
.postBtn {
  width: 3.5vw;
  /* min-width: 3vw; */
  font-size: 1vw;
}
/* 月曆容器 */
.calendarBox {
  position: relative;
  display: flex;
  justify-content: center;
  /* background-color: tomato; */
}
.calendar {
  position: absolute;
  width: 100%;
  opacity: 0.6;
}
/* 右邊標題 */
.lab__right {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  overflow: hidden;
}
/* 左邊標題 */
.lab__left {
  display: flex;
  justify-content: center;
}
</style>
