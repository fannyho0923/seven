<template>
  <main class="main mx-auto">
    <header><h1 class="text-center">Chat</h1></header>
    <div class="row mx-auto">
      <!-- 背景照片容器 -->
      <div class="imgBox">
        <!-- 背景照片 -->
        <img
          class="computerImg img-resp"
          src="../../static/imgs/room/computer.png"
          alt="computerPic"
          width="552"
          height="458"
        />
        <!-- 電腦螢幕畫面 -->
        <section class="screen">
          <!-- 左邊好友畫面 -->
          <header class="text-center">
            <label class="left__tit">Members</label>
          </header>
          <aside class="left__screen">
            <Member
              v-for="(item, index) in members"
              :key="index"
              class="pointer member"
              :style="{ top: add * (index + 1) + '%' }"
              :memberArr="item"
            />
          </aside>
          <!-- 右邊聊天內容 -->
          <header class="text-center">
            <label class="right__tit">Chat content</label>
          </header>
          <aside class="right__screen">
            <!-- 對話顯示 -->
            <div class="chat__content">
              <div
                class="sentence"
                v-for="(item, index) in strArr"
                :key="index"
              >
                <p class="text">
                  {{ strArr[index] }}
                </p>
              </div>
            </div>
            <!-- 輸入框 -->
            <label class="lab__input">
              <input
                class="input"
                type="text"
                v-model="str"
                @keyup.enter="send"
              />
            </label>
          </aside>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import Member from "@/components/Member.vue";
export default {
  data() {
    return {
      str: "",
      strArr: [],
      add: 14,
      members: [
        {
          src: "../../static/imgs/avatar.png",
          name: "fanny"
        },
        {
          src: "../../static/imgs/avatar.png",
          name: "cody"
        },
        {
          src: "../../static/imgs/avatar.png",
          name: "tony"
        },
        {
          src: "../../static/imgs/avatar.png",
          name: "ben"
        },
        {
          src: "../../static/imgs/avatar.png",
          name: "mila"
        },
        {
          src: "../../static/imgs/avatar.png",
          name: "paul"
        }
      ]
    };
  },
  methods: {
    send() {
      if (!this.str) {
        return;
      }
      this.strArr.push(this.str);
      this.str = "";
    }
  },
  components: {
    Member
  }
};
</script>

<style scoped>
.main {
  position: relative;
  width: 70%;
  background-color: grey;
}
.row {
  position: relative;
  width: 90%;
  background-color: khaki;
}
/* 背景照片容器 */
.imgBox {
  position: relative;
  max-width: 100%;
  background-color: pink;
  transform: translateX(4%);
}
/* 背景照片 */
.computerImg {
  width: 100%;
}
/* 電腦螢幕背景 */
.screen {
  /* position: absolute;
  width: 85.5%;
  height: 62%;
  background-color: powderblue;
  left: 4.7%;
  top: 4.9%; */
  position: relative;
  width: 87.6%;
  height: 62%;
  background-color: powderblue;
  left: 3.6%;
  top: -95.2%;
  border-radius: 3px;
  display: flex;
}
/* 左邊好友螢幕 */
.left__screen {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 40%;
  height: 100%;
  background-color: rosybrown;
}
/* 右邊好友螢幕 */
.right__screen {
  width: 60%;
  height: 95%;
  /* background-color: rgb(188, 185, 143); */
}
/* 左邊標題 */
.left__tit {
  width: 40%;
  position: absolute;
  height: 10%;
  font-size: 2vw;
  left: 0;
  top: 0;
  border-radius: 3px 0 0 0;
  background-color: rgb(205, 244, 96);
}
/* 右邊標題 */
.right__tit {
  width: 60%;
  position: absolute;
  height: 10%;
  font-size: 2vw;
  left: 40%;
  top: 0;
  border-radius: 0 3px 0 0;
  background-color: sandybrown;
}
/* 公寓成員 */
.member {
  position: absolute;
  top: 15%;
  width: 35%;
}
/* 右邊輸入框標籤 */
.lab__input {
  position: absolute;
  left: 40%;
  top: 90%;
  width: 60%;
  height: 10%;
  background-color: steelblue;
}
.input {
  max-height: 100%;
  width: 90%;
  height: 100%;
  font-size: 2vw;
  background-color: transparent;
  border: transparent;
}
.chat__content {
  position: absolute;
  left: 40%;
  top: 10%;
  width: 60%;
  height: 80%;
  background-color: violet;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: auto;
  flex-wrap: wrap;
  word-wrap: break-word;
}
/* 送出的話 */
.sentence {
  /* white-space: pre-wrap;
  word-break: break-all; */
  width: 100%;
  font-size: 2vw;
  left: 40%;
  top: 10%;
  /* background-color: rgb(163, 39, 163); */
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row-reverse;
}
.text {
  position: relative;
  max-width: 50%;
  width: fit-content;
  background-color: rgb(39, 117, 163);
  margin-bottom: 0;
  border-radius: 10px 0 10px 10px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-right: 1.2vw;
}
.text::after {
  content: "";
  border-color: rgb(39, 117, 163) transparent transparent transparent;
  border-style: solid;
  /* 設定邊框大小可拼湊出任意形狀的三角形 */
  border-width: 1.2vw 1.2vw 0px 0px;
  /* 設定 width、height 可更好理解原理 */
  width: 0px;
  height: 0px;
  position: absolute;
  left: 99%;
  top: calc(50% — 6px);
}
</style>
