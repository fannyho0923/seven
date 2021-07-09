<template>
  <main class="main mx-auto">
    <!-- <header class="title"><h1 class="text-center">Diary</h1></header> -->
    <div class="row mx-auto">
      <!-- 背景照片 -->
      <div class="imgBox">
        <img
          class="bgImg img-resp"
          src="@/assets/imgs/room/openDiary.png"
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
              ref="files"/>點擊新增圖片<i class="far fa-image"></i
          ></label>
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
          <button v-if="showImg" class="pointer resetBtn" @click="reset">
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
          <textarea
            autofocus
            class="textArea"
            v-model="content"
            placeholder="Write something here..."
            maxlength="800"
          ></textarea>
          <div class="wordCount">{{ count }}</div>
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
      <div class="pointer leave__btn" @click="leave">
        <img
          class="closeIcon"
          src="../../static/imgs/closeIcon.png"
          alt="closeIcon"
          width="252"
          height="252"
          @click="leave"
        />
      </div>
      <div class="penBox">
        <img
          class="penImg img-resp"
          src="@/assets/imgs/room/FeatherPen.png"
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
      roomId: 0,
      highlighted: { customPredictor: this.customPredictor },
      words: 800
    };
  },
  components: {
    Datepicker
  },
  created() {
    this.roomId = this.$route.query.id;
    // 有日記的日期（用來highlight
    getDiaryHighlight(this.$store.getters.userSeriel)
      .then(res1 => {
        this.highlightedArray = res1.data.writenDays;
      })
      .catch(error => console.log(error));
    // 查看指定日期日記
    getDiaryContent(this.$store.getters.userSeriel, {
      diaryDay: this.time.toString().slice(4, 15)
    })
      .then(res2 => {
        this.content = res2.data.diaryTxt;
        this.imgUrl = res2.data.diaryImgPath;
      })
      .catch(error => console.log(error));
  },
  watch: {
    time() {
      // 監聽要highlight的日子
      getDiaryHighlight(this.$store.getters.userSeriel)
        .then(res1 => {
          this.highlightedArray = res1.data.writenDays;
        })
        .catch(error => console.log(error));
      // 點選日期來查看內容
      getDiaryContent(this.$store.getters.userSeriel, {
        diaryDay: this.time.toString().slice(4, 15)
      })
        .then(res2 => {
          this.content = res2.data.diaryTxt;
          this.imgUrl = res2.data.diaryImgPath;
        })
        .catch(error => console.log(error));
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
    },
    // 顯示字數
    count() {
      if (!this.content) {
        return;
      }
      if (this.content.length > this.words) {
        return `${this.words}/${this.words}`;
      }
      return `${this.content.length}/${this.words}`;
    }
  },
  methods: {
    // 點選日期查看日記
    // look() {
    // console.log(this.imgUrl);
    // console.log(this.time.toString().slice(4, 15));
    // },
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
      const id = this.roomId;
      this.$store.commit("Enter", id);
      this.$router.push({ name: "Room", query: { id } });
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
      setImg(formData)
        .then(res4 => {
          // console.log(res4.data.imgPath);
          // 將圖片路徑記下來
          this.imgUrl = res4.data.imgPath;
          // 打api:新增/修改日記圖片
          setDiaryImg({
            userSeriel: this.$store.getters.userSeriel,
            diaryDay: this.time.toString().slice(4, 15),
            diaryImgPath: this.imgUrl
          })
            .then(res5 => {
              // console.log(res5.data);
              // this.showImg = true;
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },
    // 刪除照片
    reset() {
      this.imgUrl = null;
      // 打api:新增/修改日記圖片
      setDiaryImg({
        userSeriel: this.$store.getters.userSeriel,
        diaryDay: this.time.toString().slice(4, 15),
        diaryImgPath: ""
      })
        .then(res5 => {
          // console.log(res5.data);
        })
        .catch(error => console.log(error));
    },
    // 儲存日記文字
    post() {
      // console.log(this.content);
      setDiaryTxt({
        userSeriel: this.$store.getters.userSeriel,
        diaryDay: this.time.toString().slice(4, 15),
        diaryTxt: this.content
      })
        .then(res3 => {
          // console.log(res3);
          if (res3.data.result) {
            alert("日記已更新成功！");
          }
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
<style scoped lang="scss">
.wordCount {
  position: absolute;
  top: 71%;
  left: 84%;
  font-size: 1vw;
  color: #5e3023;
}
// 清除按鍵
.resetBtn {
  font-size: 1vw;
}
/* 書本背景 */
.main {
  position: relative;
  width: 75%;
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
  margin-top: 2.5rem;
  /* background-color: rgb(231, 52, 82); */
}
/* 離開按鈕 */
.leave__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 5vw;
  min-width: 50px;
  min-height: 50px;
  left: 103%;
  top: 0;
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
  font-size: 1.5vw;
  resize: none;
  background-color: transparent;
  border-style: none;
}
/* 捲軸底色 */
.textArea::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.187);
  background-color: #55525302;
}
/* 捲軸寬度 */
.textArea::-webkit-scrollbar {
  width: 6px;
  background-color: rgba(0, 0, 0, 0.041);
}
/* 捲軸本體顏色 */
.textArea::-webkit-scrollbar-thumb {
  background-color: rgba(75, 35, 22, 0.479);
}
/* 儲存按鈕容器 */
.btnBox {
  display: flex;
  flex-direction: row-reverse;
}
/* 儲存按鈕 */
.postBtn {
  min-width: 45px;
  width: 3.5vw;
  font-size: 1vw;
  background-color: #895637a7;
  color: #5e3023;
  border-color: #5e3023;
  border-radius: 10%;
}
.postBtn:hover {
  background-color: #dab49d;
}
/* 月曆容器 */
.calendarBox {
  position: relative;
  display: flex;
  justify-content: center;
  opacity: 0.7;
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
  top: 65%;
  height: 35%;
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
  max-height: 100%;
  margin-bottom: 1rem;
  // background-color: darkturquoise;
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
/* 離開按鈕照片 */
.closeIcon {
  width: 100%;
  height: auto;
}
.closeIcon:hover {
  opacity: 0.5;
}

// rwd
// <=1024px 套用
@media screen and (max-width: 1345px) {
  .main {
    width: 88%;
  }
  .penBox {
    width: 18vw;
  }
}
@media screen and (max-width: 1140px) {
  .main {
    background-image: url("../../static/imgs/room/letter.png");
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    height: 50rem;
    min-height: 100vh;
  }
  .bgImg {
    visibility: hidden;
  }
  .rightBox {
    position: absolute;
    left: 51%;
    top: 8%;
    width: 42%;
    height: 50%;
  }
  .imgInputBox {
    left: 119%;
    top: 70%;
  }
  .leave__btn {
    min-width: 3rem;
    min-height: 3rem;
    left: 94%;
  }

  .textArea {
    font-size: 2vw;
  }
  .wordCount {
    top: 84%;
    left: 71%;
  }
}
// <=836px 套用
@media screen and (max-width: 826px) {
  .wordCount {
    top: 100%;
    left: 25%;
  }
  .penBox {
    visibility: hidden;
  }
  .main {
    background-size: contain;
  }
  hr {
    visibility: hidden;
  }
  .textArea,
  .label__btnBox {
    font-size: 1.5vw;
  }
  .imgInputBox {
    position: absolute;
    left: -72%;
    top: -82%;
  }
  .leave__btn {
    min-width: 2rem;
    min-height: 2rem;
    left: 85%;
  }
  .leftBox {
    left: 30%;
    top: 95%;
  }
  .rightBox {
    position: absolute;
    left: 42%;
    top: 17%;
    width: 42%;
    height: 62%;
  }
  .calendarBox {
    opacity: 1;
  }
  .vdp-datepicker__calendar {
    width: 150px;
  }
}
</style>
