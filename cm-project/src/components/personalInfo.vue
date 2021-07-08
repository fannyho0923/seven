<template>
  <div class="infoBg">
    <div class="container mx-auto">
      <section class="info__body mx-auto">
        <!-- 左邊頭貼和名字 -->
        <aside class="leftBox">
          <!-- 頭貼 -->
          <div class="avatarBox mx-auto">
            <img
              v-if="roleId"
              class="img"
              :src="'http://35.201.237.18/img/avatar_' + roleId + '.png'"
              alt=""
            />
          </div>
          <!-- 名字 -->
          <div class="nameTag">
            <p v-if="!isEditName" class="name mx-auto">{{ userName }}</p>
            <input
              v-if="isEditName && isOwner"
              class="nameEdit mx-auto"
              type="text"
              v-model="str"
              :placeholder="userName"
              @keyup.enter="checkName"
              autocomplete="false"
            />
            <i
              v-if="!isEditName && isOwner"
              class="pointer edit fas fa-edit"
              @click="editName"
            ></i>
            <div v-if="isEditName && isOwner" class="editBox">
              <i class="pointer check fas fa-check" @click="checkName"></i>
              <i class="pointer unCheck fas fa-times" @click="unCheckName"></i>
            </div>
          </div>
        </aside>
        <!-- 右邊自我介紹,修改密碼,登出 -->
        <aside class="rightBox">
          <label class="info__title">自我介紹</label>
          <!-- 自我介紹表 -->
          <textarea
            v-if="isOwner"
            class="textArea"
            v-model="introduction"
            placeholder="關於我..."
            @click="writeDoc"
          ></textarea>
          <textarea
            v-else
            class="textArea"
            style="outline:none;"
            v-model="introduction"
            readOnly
          ></textarea>
          <!-- 自我介紹編輯確認按鈕 -->
          <div v-if="isEditDoc && isOwner" class="circleCheckBox">
            <div class="pointer circleCheck" @click="writeDone">
              送出<i class="fas fa-check-circle"></i>
            </div>
          </div>
          <!-- 修改密碼以及登出容器 -->
          <div v-if="isOwner" class="toolBox">
            <!-- 修改密碼輸入欄 -->
            <div class="passBox">
              修改密碼
              <input
                class="passEdit1 mx-auto"
                type="password"
                v-model="password1"
                placeholder="新密碼"
                @click="editPassword"
                autocomplete="false"
              />
            </div>
            <!-- 確認密碼輸入欄 -->
            <div class="passBox">
              確認密碼
              <input
                class="passEdit2 mx-auto"
                type="password"
                v-model="password2"
                placeholder="確認新密碼"
                @click="editPassword"
                autocomplete="false"
              />
              <!-- 修改密碼按鈕 -->
              <div class="editPassBox">
                <!-- 修改密碼確認按鈕 -->
                <i
                  class="pointer check fas fa-check"
                  @click="checkNewPassword"
                ></i>
                <!-- 修改密碼取消按鈕 -->
                <i
                  class="pointer unCheck fas fa-times"
                  @click="unCheckPassword"
                ></i>
              </div>
            </div>
            <!-- 按鈕們 -->
            <div class="btns">
              <!-- 登出按鈕 -->
              <div v-if="isOwner" class="pointer logoutBox" @click="logout">
                登出<i class="fas fa-running" @click="logout"></i>
              </div>
              <!-- 搬家按鈕 -->
              <div v-if="isOwner" class="pointer moveBox" @click.self="movePop">
                搬家<i class="fas fa-dove" @click.self="movePop"></i>
              </div>
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
        <!-- 搬家確認框 -->
        <div v-if="showMove" class="confirmMoveBtnBox">
          <p class="confirmMoveSentence">
            您確定要離開這個公寓嘛？<i class="far fa-grimace"></i>
          </p>
          <div class="confirmMoveBtn">
            <div class="yesBtn pointer" @click.self="yesMove">
              <i class="far fa-check-circle" @click.self="yesMove"></i>
              <p @click.self="yesMove">確認</p>
            </div>
            <div class="noBtn pointer" @click.self="noMove">
              <i class="fas fa-times-circle" @click.self="noMove"></i>
              <p @click.self="noMove">再考慮</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { getUserInfo, setNickName, setPw, setAbout } from "@/js/all";
export default {
  props: { user: { type: [String, Number] }, isOwner: { type: Boolean } },
  data() {
    return {
      roleId: 0,
      doorIndex: 0,
      userName: "",
      introduction: "",
      isEditName: false,
      isEditPassword: false,
      isEditDoc: false,
      str: "",
      password1: "",
      password2: "",
      showMove: false,
      members: []
    };
  },
  created() {
    // 取得玩家資料;
    getUserInfo(this.user)
      .then(res1 => {
        // console.log(res1.data);
        this.roleId = res1.data.roleId;
        this.doorIndex = res1.data.doorIndex;
        this.userName = res1.data.userName;
        this.introduction = res1.data.introduction;
      })
      .catch(error => console.log(error));
  },
  methods: {
    // 搬家視窗
    movePop() {
      this.showMove = true;
    },
    // 確定搬家
    yesMove() {
      this.showMove = false;
      this.$emit("move");
      this.leave();
    },
    // 不搬家
    noMove() {
      this.showMove = false;
    },
    // 關閉視窗
    leave() {
      this.$emit("leave");
    },
    // 更改名字
    editName() {
      this.isEditName = true;
    },
    // 確定更新名字
    checkName() {
      if (!this.str) {
        return;
      } else {
        const nickNameData = {
          userSeriel: this.$store.getters.userSeriel,
          userName: this.str
        };
        setNickName(nickNameData)
          .then(res2 => {
            // console.log(res2.data);
            this.userName = this.str;
            this.isEditName = false;
          })
          .catch(error => console.log(error));
      }
    },
    // 取消編輯名字
    unCheckName() {
      this.isEditName = false;
    },
    // 點擊修改密碼欄位
    editPassword() {
      this.isEditPassword = true;
    },
    // 取消編輯密碼
    unCheckPassword() {
      this.password1 = "";
      this.password2 = "";
      this.isEditPassword = false;
    },
    // 編輯自我介紹
    writeDoc() {
      this.isEditDoc = true;
    },
    // 送出自我介紹
    writeDone() {
      const aboutData = {
        userSeriel: this.$store.getters.userSeriel,
        introduction: this.introduction
      };
      setAbout(aboutData)
        .then(res4 => {
          // console.log(res4);
        })
        .catch(error => console.log(error));
    },
    // 登出
    logout() {
      // 寫入餅乾
      this.$router.push("/home");
      this.$cookies.remove("token");
    },
    // 送出新密碼
    checkNewPassword() {
      if (this.password1 !== this.password2) {
        alert("密碼有誤");
        this.password1 = "";
        this.password2 = "";
        return;
      } else {
        const passwordData = {
          userSeriel: this.$store.getters.userSeriel,
          userPw: this.password1
        };
        setPw(passwordData)
          .then(res3 => {
            // console.log(res3);
            this.password1 = "";
            this.password2 = "";
            alert("密碼更新成功！！");
          })
          .catch(error => console.log(error));
      }
    }
  }
};
</script>

<style scoped>
/* 遮罩 */
.infoBg {
  position: absolute;
  width: 100vw;
  height: 50vw;
  background-color: rgba(0, 0, 0, 0.466);
}
/* 地基 */
.container {
  padding: 0;
  max-width: 100%;
  width: 60%;
  margin-top: 15rem;
  /* height: 20rem; */
  /* background-color: whitesmoke; */
}
.info__body {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  max-width: 1000px;
  background-color: teal;
  min-width: 300px;
  /* height: 20rem; */
  border-radius: 15px;
  padding: 1rem;
  flex-wrap: wrap;
}
/* 左邊頭貼跟姓名 */
.leftBox {
  text-align: center;
  width: 47%;
  min-width: 150px;
  /* background-color: thistle; */
}
/* 右邊頭貼跟姓名 */
.rightBox {
  width: 47%;
  min-width: 182px;
  background-color: tomato;
  border-radius: 15px;
  padding: 0.5rem;

  /* height: 14.8vw; */
}
/* 頭貼框 */
.avatarBox {
  min-width: 150px;
  min-height: 150px;
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  overflow: hidden;
  object-fit: contain;
  /* background-color: violet; */
  margin-bottom: 1.5rem;
  box-shadow: 0 0 15px;
}
/* 照片 */
.img {
  width: 100%;
  vertical-align: bottom;
}
.nameTag {
  display: flex;
  justify-content: center;
  min-width: 150px;
  max-width: 1000%;
  height: 3.5em;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: yellow;
  border-radius: 15px;
}
.name {
  /* width: 10vw; */
  /* background-color: blueviolet; */
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 2em;
}
.nameEdit {
  width: 90%;
  margin: 0;
  font-size: 2em;
}
/* 密碼輸入 */
.passEdit1 {
  width: 60%;
  margin-left: 7px;
  font-size: 1em;
  background-color: rgba(169, 169, 169, 0.315);
  border-color: transparent;
}
/* 確認密碼輸入 */
.passEdit2 {
  width: 60%;
  margin: 0;
  padding: 0;
  font-size: 1em;
  background-color: rgba(169, 169, 169, 0.315);
  border-color: transparent;
}
/* 修改名字的確認取消按鍵 */
.editBox {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 18px;
  font-size: 1vw;
}
/* 修改密碼的確認取消按鍵 */
.editPassBox {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 18px;
  font-size: 1vw;
}
.edit {
  position: absolute;
  /* display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
  /* background-color: coral; */
  font-size: 1vw;
  left: 45%;
  /* top: 85%; */
}
.edit:hover {
  opacity: 0.5;
}
.check:hover {
  opacity: 0.5;
}
.unCheck:hover {
  opacity: 0.5;
}
/* 離開按鈕 */
.leave__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3vw;
  height: 3vw;
  min-width: 50px;
  min-height: 50px;
  left: 95.5%;
  top: -11%;
  /* background-color: rgb(43, 189, 226); */
}
/* 離開按鈕照片 */
.closeIcon {
  width: 100%;
  height: auto;
}
.closeIcon:hover {
  opacity: 0.5;
}
/* 自我介紹標題 */
.info__title {
  margin: 0.5rem;
  font-size: 1.5rem;
}
/* 文字輸入匡 */
.textArea {
  max-width: 92%;
  width: 92%;
  height: 5em;
  font-size: 1.2vw;
  resize: none;
  background-color: transparent;
  border-style: none;
  margin: 0.5rem;
}
/* 捲軸底色 */
.textArea::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f79c13;
}
/* 捲軸寬度 */
.textArea::-webkit-scrollbar {
  width: 6px;
  background-color: black;
}
/* 捲軸本體顏色 */
.textArea::-webkit-scrollbar-thumb {
  background-color: #f85701;
}
.toolBox {
  margin: 0.5rem;
}
.circleCheckBox {
  display: flex;
  flex-direction: row-reverse;
}
/* 編輯自我介紹確認案件 */
.circleCheck {
  display: inline-block;
  margin-right: 0.5rem;
  border: solid 0.5px;
  border-radius: 5px;
  padding: 0.2em;
  font-size: 0.7em;
}
.circleCheck:hover {
  opacity: 0.5;
}
/* 修改密碼容器 */
.passBox {
  min-width: 192px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1vw;
  margin-bottom: 0.2rem;
  white-space: nowrap;
}
/* 登出和搬家按鈕 */
.btns {
  /* background-color: coral; */
  margin-top: 0.5rem;
}
/* 登出按鈕 */
.logoutBox {
  display: inline-block;
  border: solid 0.6px;
  border-radius: 15px;
  padding: 0.2rem;
  font-size: 0.8em;
}
.logoutBox:hover {
  opacity: 0.5;
}
/* 搬家按鈕 */
.moveBox {
  margin-left: 1rem;
  display: inline-block;
  border: solid 0.6px;
  border-radius: 15px;
  padding: 0.2rem;
  font-size: 0.8em;
}
.moveBox:hover {
  opacity: 0.5;
}
/* 確認搬家容器 */
.confirmMoveBtnBox {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 19vw;
  height: 14vw;
  min-width: 150px;
  min-height: 100px;
  border-radius: 10px;
  background-color: #def;
}
/* 確認搬家句子 */
.confirmMoveSentence {
  margin-top: 1rem;
  font-size: 1.3vw;
  color: #014f86;
}
/* 確定跟考慮搬家按鈕容器 */
.confirmMoveBtn {
  display: flex;
  width: 80%;
  justify-content: space-evenly;
}
/* 確定按鈕 */
.yesBtn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5vw;
  color: #003049;
}
.yesBtn:hover {
  color: #489fb5;
}
/* 再考慮按鈕 */
.noBtn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5vw;
  color: #003049;
}
.noBtn:hover {
  color: #669bbc;
}
</style>
