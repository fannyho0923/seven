<template>
  <div class="main mx-auto">
    <div class="row mx-auto">
      <!-- 背景照片容器 -->
      <div class="imgBox">
        <!-- 背景照片 -->
        <img
          class="computerImg img-resp"
          src="@/assets/imgs/room/computer.png"
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
              class="pointer member"
              :key="index"
              :style="{ top: add * (index + 1) + '%' }"
              :memberArr="item"
              :num="index + 1"
              @chooseChat="
                chat(members[index].memberSeriel, members[index].memberName)
              "
            />
          </aside>
          <!-- 右邊聊天內容 -->
          <header class="text-center">
            <label class="right__tit">{{ memberName }}</label>
          </header>
          <aside class="right__screen">
            <!-- 對話顯示 -->
            <div id="data-list-content" class="chat__content">
              <div
                :class="{
                  sentence: chatArr[index].fromPartner == false,
                  sentence2: chatArr[index].fromPartner == true
                }"
                v-for="(item, index) in chatArr"
                :key="index"
              >
                <p
                  :class="{
                    text: chatArr[index].fromPartner == false,
                    text2: chatArr[index].fromPartner == true
                  }"
                >
                  {{ chatArr[index].messengeTxt }}
                </p>
              </div>
            </div>
            <!-- 輸入框 -->
            <label class="lab__input">
              <input
                class="input"
                type="text"
                v-model="str"
                placeholder="請輸入訊息"
                autofocus
              />
              <i class="plane pointer far fa-paper-plane" @click="send"></i>
            </label>
          </aside>
        </section>
        <i class="apple fab fa-apple"></i>
      </div>
      <!-- 關閉視窗按鈕 -->
      <div class="pointer leave__btn" @click="leave">
        <img
          class="closeIcon"
          src="@/assets/imgs/otherImg/closeIcon.png"
          alt="closeIcon"
          width="252"
          height="252"
          @click="leave"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Member from "@/components/Member.vue";
import { getChatList, sentChat, getChat } from "@/js/all";
export default {
  data() {
    return {
      timer: null,
      partnerUserSeriel: -1,
      members: [],
      fromPartner: false,
      str: "", // 我打的話
      chatArr: [],
      memberName: "請選擇聊天對象",
      strArr: [
        { id: "1", str: "yyy" },
        { id: "1", str: "ooo" },
        { id: "1", str: "rrr" },
        { id: "1", str: "aaa" }
      ],
      otherArr: [
        { id: "2", str: "hihi" },
        { id: "2", str: "yoyo" },
        { id: "2", str: "ioio" }
      ],
      roomId: 0,
      isSay: false,
      add: 14 //好友位移
    };
  },
  created() {
    this.roomId = this.$route.query.id;
    getChatList(this.$store.getters.userSeriel)
      .then(res1 => {
        // console.log(res1.data);
        this.members = res1.data.members;
      })
      .catch(error => console.log(error));
  },
  updated() {
    if (!this.isSay) {
      return;
    }
    this.$nextTick(function() {
      var div = document.getElementById("data-list-content");
      div.scrollTop = div.scrollHeight;
      this.isSay = false;
    });
  },
  methods: {
    // 開始去定時抓取聊天記錄
    start() {
      if (this.timer) {
        return;
      }
      this.timer = setInterval(() => this.getChatRecord(), 1500);
    },
    // 結束定時抓取聊天記錄
    end() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    //   送出我打的話
    send() {
      if (!this.str || this.partnerUserSeriel == -1) {
        return;
      }
      const sendData = {
        userSeriel: this.$store.getters.userSeriel,
        partnerUserSeriel: this.partnerUserSeriel,
        messengeTxt: this.str
      };
      this.isSay = true;
      sentChat(sendData)
        .then(res2 => {
          // console.log(res2.data);
        })
        .catch(error => console.log(error));
      this.chatArr.push({
        memberSeriel: this.partnerUserSeriel,
        memberName: this.memberName,
        messengeTxt: this.str,
        fromPartner: false
      });
      this.str = "";
    },
    // 離開本頁
    leave() {
      this.end();
      const id = this.roomId;
      this.$store.commit("Enter", id);
      this.$router.push({ name: "Room", query: { id } });
    },
    //選擇聊天
    chat(partnerUserSeriel, memberName) {
      this.partnerUserSeriel = partnerUserSeriel;
      getChat(this.$store.getters.userSeriel, this.partnerUserSeriel).then(
        res3 => {
          // console.log(res3.data.messenges);
          this.chatArr = res3.data.messenges;
          this.memberName = memberName;
          // console.log(this.memberName);
          this.start();
        }
      );
    },
    getChatRecord() {
      getChat(this.$store.getters.userSeriel, this.partnerUserSeriel).then(
        res3 => {
          // console.log(res3.data.messenges);
          this.chatArr = res3.data.messenges;
          // console.log(this.memberName);
        }
      );
    }
  },
  components: {
    Member
  }
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");
* {
  font-family: "Varela Round", sans-serif;
} */
.main {
  position: relative;
  width: 60%;
  /* background-color: grey; */
}
.row {
  margin-top: 4.5rem;
  position: relative;
  width: 90%;
  /* background-color: khaki; */
}
/* 背景照片容器 */
.imgBox {
  position: relative;
  max-width: 100%;
  /* background-color: pink; */
  transform: translateX(4%);
}
/* 背景照片 */
.computerImg {
  width: 100%;
}
/* 電腦螢幕背景 */
.screen {
  position: absolute;
  width: 87.6%;
  height: 62%;
  background-color: powderblue;
  background-position: center;
  left: 3.6%;
  top: 4.8%;
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
  background-color: rgb(231, 176, 176);
}
/* 右邊好友螢幕 */
.right__screen {
  width: 60%;
  height: 95%;
  /* background-color: rgb(188, 185, 143); */
}
/* 左邊標題 */
.left__tit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  position: absolute;
  height: 10%;
  font-size: 2vw;
  left: 0;
  top: 0;
  border-radius: 3px 0 0 0;
  color: rgb(96, 190, 244);
  background-color: rgb(248, 104, 104);
  /* background-color: rgba(243, 231, 213, 0.838); */
}
/* 右邊標題 */
.right__tit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  position: absolute;
  height: 10%;
  font-size: 2vw;
  left: 40%;
  top: 0;
  border-radius: 0 3px 0 0;
  color: rgb(248, 104, 104);
  background-color: rgb(96, 190, 244);
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
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  font-size: 1.2vw;
  background-color: transparent;
  border: transparent;
}
/* 傳送鍵 */
.plane {
  font-size: 2vw;
}
/* 整片聊天內容 */
.chat__content {
  background-image: url("../../static/imgs/room/flowerBg.png");
  position: absolute;
  left: 40%;
  top: 10%;
  width: 60%;
  height: 78%;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: auto;
  flex-wrap: wrap;
  word-wrap: break-word;
  padding-top: 0.5rem;
}
/* 捲軸底色 */
.chat__content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #95b3f8;
}
/* 捲軸寬度 */
.chat__content::-webkit-scrollbar {
  width: 6px;
  background-color: black;
}
/* 捲軸本體顏色 */
.chat__content::-webkit-scrollbar-thumb {
  background-color: #0f54f7;
}
/* 送出的對話容器 */
.sentence {
  width: 100%;
  font-size: 1.2vw;
  left: 40%;
  top: 10%;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: top;
  flex-direction: row-reverse;
}
/* 收到的對話容器 */
.sentence2 {
  width: 100%;
  font-size: 1.2vw;
  left: 40%;
  top: 10%;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
}
/* 我方輸入的文字內容 */
.text {
  position: relative;
  max-width: 50%;
  width: fit-content;
  background-color: rgb(39, 117, 163);
  margin-top: 0;
  margin-bottom: 0;
  border-radius: 10px 0 10px 10px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-right: 1.1vw;
}
/* 我方聊天框三角形 */
.text::after {
  content: "";
  border-color: rgb(39, 117, 163) transparent transparent transparent;
  border-style: solid;
  /* 設定邊框大小可拼湊出任意形狀的三角形 */
  border-width: 1.1vw 1.1vw 0px 0px;
  /* 設定 width、height 可更好理解原理 */
  width: 0px;
  height: 0px;
  position: absolute;
  left: 96%;
  top: 0;
  /*top: calc(50% — 6px);*/
}
/* 對方留言內容 */
.text2 {
  position: relative;
  max-width: 50%;
  width: fit-content;
  background-color: rgb(153, 187, 207);
  margin-top: 0;
  margin-bottom: 0;
  border-radius: 0 10px 10px 10px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-left: 1.1vw;
}
/* 對方聊天框三角形 */
.text2::before {
  content: "";
  border-left: 0px solid transparent;
  border-top: 0px solid transparent;
  border-bottom: 1.1vw solid transparent;
  border-right: 1.1vw solid rgb(153, 187, 207);
  position: absolute;
  left: -1vw;
  top: 0;
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
  top: -6%;
}
/* 離開按鈕照片 */
.closeIcon {
  width: 100%;
  height: auto;
}
.closeIcon:hover {
  opacity: 0.5;
}
/* 蘋果標示 */
.apple {
  position: absolute;
  left: 45%;
  top: 71%;
  font-size: 4vw;
}
</style>
