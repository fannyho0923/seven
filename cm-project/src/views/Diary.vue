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
        <div class="calendarBox">
          <datepicker
            :inline="true"
            format="MMM dd yyyy"
            v-model="time"
            placeholder="-請選擇-"
            :highlighted="highlighted"
          />
        </div>
        <!-- 照片框 -->
        <div class="imgInputBox">
          <label v-if="!showImg" class="pointer label__btnBox"
            ><input
              type="file"
              accept="image/*"
              @change="previewImage"
              class=" input__btn form-control-file"
              id="my-file"
              ref="files"
            />點擊新增圖片</label
          >
          <!-- 秀照片區塊 -->
          <div class="imgShowBox" v-if="imgUrl && showImg">
            <img
              class="inputImg img-resp"
              :src="imgUrl"
              alt="UserPic"
              width="100"
              height="100"
            />
          </div>
          <button v-if="showImg" class="pointer" @click="reset">
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
        <label class="lab__right"> &ensp;{{ getTimeStr }} &ensp;</label>
        <!-- 分隔線 -->
        <hr />
        <!-- 文章 -->
        <div class="article__body">
          <textarea class="textArea" v-model="content"></textarea>
          <div class="btnBox">
            <button
              type="submit"
              class=" set-inlineBlock postBtn"
              @click.prevent="post()"
            >
              儲存
            </button>
          </div>
        </div>
      </aside>
      <!-- 關閉視窗按鈕 -->
      <div class="pointer leave__btn" @click="leave">Ｘ</div>
      <div class="penBox">
        <img
          class="penImg img-resp"
          src="../../static/imgs/room/FeatherPen.png"
          alt="featherPenPic"
          width="342"
          height="336"
        />
      </div>
    </div>
  </main>
</template>

<script>
import {
  getDiaryHighlight,
  getDiaryContent,
  setDiaryTxt,
  setImg,
  setDiaryImg
} from "@/js/all.js";
import "vue2-datepicker/index.css";
import Datepicker from "vuejs-datepicker";
import { zh } from "vuejs-datepicker/dist/locale";
export default {
  data() {
    return {
      content: "",
      showImg: null,
      time: new Date(),
      zh: zh,
      highlightedArray: [],
      imgUrl: null,
      image: null,
      preview: null,
      preview_list: [],
      image_list: [],
      highlighted: { customPredictor: this.customPredictor }
    };
  },
  components: {
    Datepicker
  },
  created() {
    getDiaryHighlight(this.$store.getters.userSeriel).then(res1 => {
      // console.log(res1.data.writenDays);
      this.highlightedArray = res1.data.writenDays;
      // console.log(this.highlightedArray);
    });

    getDiaryContent(this.$store.getters.userSeriel, {
      diaryDay: this.time.toString().slice(4, 15)
    }).then(res2 => {
      // console.log(res2.data.diaryTxt);
      this.content = res2.data.diaryTxt;
    });
  },
  watch: {
    time() {
      // 監聽要highlight的日子
      getDiaryHighlight(this.$store.getters.userSeriel).then(res1 => {
        this.highlightedArray = res1.data.writenDays;
      });
      // 點選日期來查看內容
      getDiaryContent(this.$store.getters.userSeriel, {
        diaryDay: this.time.toString().slice(4, 15)
      }).then(res2 => {
        this.content = res2.data.diaryTxt;
        this.imgUrl = res2.data.diaryImgPath;
      });
    },
    // 檢查照片有沒有網址
    imgUrl() {
      if (this.imgUrl) {
        this.showImg = true;
      } else {
        this.showImg = false;
      }
    }
  },
  computed: {
    // 取得日期
    getMonthEnum() {
      return this.$store.getters.getMonthEnum;
    },
    getMonthArray() {
      // 將Enum中的key轉成陣列
      return Object.keys(this.getMonthEnum).map(key => key);
    },
    getYear() {
      return this.time.getFullYear();
    },
    getMonth() {
      return this.time.getMonth() + 1;
    },
    getDate() {
      return this.time.getDate();
    },
    getTimeStr() {
      return `${this.getMonthArray[this.getMonth - 1]}-${this.getDate}-${
        this.getYear
      }`;
    }
  },
  methods: {
    // 點選日期查看日記
    look() {
      console.log(this.imgUrl);
      // console.log(this.time.toString().slice(4, 15));
    },
    // 標記有內容的日期
    customPredictor(date) {
      if (this.highlightedArray.length) {
        if (this.highlightedArray.includes(date.toString().slice(4, 15))) {
          return true;
        }
      }
    },
    // 回到房間
    leave() {
      this.$router.push("/room");
    },
    // 上傳圖片
    previewImage(event) {
      // console.log(this.$refs.files.files[0]);
      // 宣告一個變數來儲存我們找到的圖片
      const uploadedFile = this.$refs.files.files[0];
      // 把圖片轉換成 FromData，先宣告一個變數是我們的 new FormData()
      const formData = new FormData();
      // 利用 append 的方式將我們的圖片塞入
      formData.append("file", uploadedFile);
      // 打api：上傳圖片取得imgPath
      setImg(formData).then(res4 => {
        console.log(res4.data.imgPath);
        // 將圖片路徑記下來
        this.imgUrl = res4.data.imgPath;
        // 打api:新增/修改日記圖片
        setDiaryImg({
          userSeriel: this.$store.getters.userSeriel,
          diaryDay: this.time.toString().slice(4, 15),
          diaryImgPath: this.imgUrl
        }).then(res5 => {
          console.log(res5.data);
          // this.showImg = true;
        });
      });
    },
    // 刪除照片
    reset() {
      this.imgUrl = null;
      // 打api:新增/修改日記圖片
      setDiaryImg({
        userSeriel: this.$store.getters.userSeriel,
        diaryDay: this.time.toString().slice(4, 15),
        diaryImgPath: ""
      }).then(res5 => console.log(res5.data));
    },
    // 儲存日記文字
    post() {
      // console.log(this.content);
      setDiaryTxt({
        userSeriel: this.$store.getters.userSeriel,
        diaryDay: this.time.toString().slice(4, 15),
        diaryTxt: this.content
      }).then(res3 => {
        // console.log(res3);
        if (res3.data.result) {
          alert("日記已更新成功！");
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
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
.calendar-red {
  background-color: red;
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
// 羽毛筆照片容器
.penBox {
  width: 25vw;
  position: absolute;
  left: 90%;
  top: 10%;
}
// 羽毛筆照片
.penImg {
  width: 100%;
}
</style>
