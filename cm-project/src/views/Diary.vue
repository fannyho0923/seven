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
        <!-- 照片匡 -->
        <div class="imgInputBox">
          <label v-if="!preview" class="pointer label__btnBox"
            ><input
              type="file"
              accept="image/*"
              @change="previewImage"
              class=" input__btn form-control-file"
              id="my-file"
            />點擊新增圖片</label
          >
          <!-- 秀照片區塊 -->
          <div class="imgShowBox" v-if="preview">
            <img
              class="inputImg img-resp"
              :src="preview"
              alt="UserPic"
              width="100"
              height="100"
            />
          </div>
          <button v-if="preview" class="pointer" @click="reset">
            清除照片
          </button>
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
      image: null,
      preview: null,
      preview_list: [],
      image_list: [],
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
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      } else {
        return;
      }
    },
    reset() {
      this.image = null;
      this.preview = null;
      this.image_list = [];
      this.preview_list = [];
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
  width: 70%;
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
/* 放選取照片按鈕以及照片區塊 */
.imgInputBox {
  position: absolute;
  width: 100%;
  top: 60%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 秀照片區塊 */
.imgShowBox {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
}
/* 使用者輸入的照片 */
.inputImg {
  width: 50%;
}
/* 代替新增照面input */
.label__btnBox {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: pink; */
  width: 100%;
  height: 100%;
  color: rgb(77, 73, 73);
}
/* 新增照片的input(要透明) */
.input__btn {
  display: none;
}
</style>
