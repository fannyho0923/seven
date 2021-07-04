<template>
  <main class="container mx-auto">
    <div class="row">
      <div class="home__body">
        <!-- 右邊文字 -->
        <section class="home__btn mx-auto">
          <!-- 使用規則,創建帳號,進入房間按鈕 -->
          <header class="home__title">
            <img
              class="titImg"
              src="../../static/imgs/homeTit.png"
              alt="首頁標題"
              width="570"
              height="128"
            />
          </header>
          <div class="all__btn">
            <p class="pointer btn1" @click.self="watchInfo">使用規則</p>
            <p v-if="!isMember" class="pointer btn2" @click.self="atRegiste">
              創建帳號
            </p>
            <p class="pointer btn3" @click.self="atLogIn">進入公寓</p>
          </div>
        </section>
        <!-- 左邊圖示 -->
        <aside class="home__img mx-auto">
          <img
            class="img img-resp"
            src="../../static/imgs/apartmentPic.png"
            alt="apartmentPic"
            width="200"
            height="100"
          />
        </aside>
      </div>
    </div>
    <!-- 註冊的彈跳視窗 -->
    <div v-if="!this.isRegistered" class="popup">
      <PopupWindow
        :member="false"
        @sentRegiste="supplyRegiste"
        @closePop="closePopupRegiste"
      />
      <!-- @inputDone="inputRegiste" -->
    </div>
    <!-- 登入的彈跳視窗 -->
    <div v-if="this.unLogin" class="popup">
      <PopupWindow
        :member="true"
        @sentLogIn="supplyLogIn"
        @closePop="closePopupLogin"
      />
      <!-- @inputDone="inputLogIn" -->
    </div>
    <!-- 使用說明視窗 -->
    <section v-if="showInfo" class="infoBg">
      <div class="info__body">
        <article class="article">
          <h3 class="articleTit">【什麼是七人一室？】</h3>
          <p class="contentOne">
            七人一室是一個使用網站模式的背包客棧，同時是一個社群交友的空間，它也可以被定位為一個更注重隱私權的臉書。
            <br />
            使用者在陌生社群中記錄自己的生活，如同入住背包客棧中不預期將會遇到各式各樣的室友，
            藉由窺探室友的小世界來了解對方、發展話題。
            <br />研究顯示兩個陌生人相遇的概率是0.00487，
            透過限縮的微型人脈更能夠珍惜在網路世界的萍水相逢，
            建立人際關係、產生如室友般的緊密互動。
            <br />本網站採用匿名方式，讓大家沒有人際關係的壓力，沒有人知道誰是誰
            。玩家可以不用顧慮他人眼光，能自由說出想說的話，更沒有人道德指責或因價值觀不同而開啟筆戰。
            <br />在客棧中您可以隨時選擇搬離，我們會隨機將您加入其他客棧與不同的室友相遇、相處，並且給予全新的頭貼繼續保持匿名性，
            進入新客棧中會保有相同的房間設定和生活紀錄，也就是說，您可以不用重新介紹「你是誰」。
          </p>
          <h3 class="articleTit">【在七人一室中，可以做些什麼？】</h3>
          <p class="contentOne">
            每個玩家註冊後將會隨機加入一個客棧，玩家和客棧中的室友透過文字和相片相互了解。
            客棧中有公共和各自的私人空間，公共空間中有留言冰箱和電視機，可以寫字條及分享影片給室友們。<br />
            房間中主要本體有書櫃、電腦和日記本：<br />書櫃可以透過文字和相片紀錄生活、室友們可以來到彼此空間查看房主的書櫃，並留言回應；
            <br />電腦中存有通訊錄，可以和室友們私訊聊天；
            <br />日記本是自己的私密紀錄，僅有本人可以查看。
            <br />另外，網站還有一些附加的功能
            ，讓入住的玩家們享受其他的樂趣，房內的擺飾可以透過衣櫃進行更換，進入不同室友的領域可以立即透過視覺感受他的個人風格。
            <br />私人空間的相片牆可以展示三張主題照，能夠迅速讓人看到關於玩家的愛好。
            <br /><br /><br />在七人一室中，我們懷念在學生時的住宿時光，希望創建更隱密的社交環境，讓大家在微社交圈中避開網路可能的群眾霸凌，不用受到世俗眼光限制，更能自在的說出想說的話。
            <br />最後，歡迎加入七人一室，請享受你的住宿生活！
          </p>
          <p class="little">開發者：何韋含、廖翊涵 誠摯地邀請您入住</p>
        </article>
      </div>
      <div class="pointer closeInfoBtn" @click.self="closeInfo">X</div>
    </section>
  </main>
</template>

<script>
import PopupWindow from "../components/PopupWindow.vue";
import {
  userSignUp,
  userLogIn,
  userStatus,
  userAddNewGroup,
  userTransferGroup
} from "@/js/all.js";
import Article from "../components/Article.vue";

export default {
  data() {
    return {
      //判斷是否註冊
      isRegistered: true,
      //註冊時要輸入名稱
      nickName: "",
      //判斷是否登入
      unLogin: false,
      //註冊與登入時都要輸入帳密
      userName: "",
      password: "",
      //判斷是否已有會員
      isMember: false,
      //判斷帳密輸入是否正確
      pass: false,
      showInfo: false
    };
  },
  components: { PopupWindow, Article },
  methods: {
    //點擊註冊
    atRegiste() {
      this.isRegistered = false;
    },
    //點擊登入
    atLogIn() {
      this.unLogin = true;
    },
    //關閉註冊彈跳視窗
    closePopupRegiste() {
      this.isRegistered = true;
    },
    //關閉登入彈跳視窗
    closePopupLogin() {
      this.unLogin = false;
    },
    //註冊檢查
    supplyRegiste(nickName, userName, mail, password) {
      if (nickName && userName && password) {
        const RegisteData = JSON.stringify({
          userId: userName,
          userPw: password,
          userName: nickName,
          email: mail
        });
        console.log(RegisteData);
        userSignUp(RegisteData)
          .then(res => {
            // console.log(res);
            if (res.data.result) {
              this.closePopupRegiste();
              this.isMember = true;
              this.unLogin = false;
              alert("歡迎" + " " + nickName + " " + "入住");
            } else {
              alert(res.data.resultMessenge);
              return;
            }
          })
          .catch(error => console.log(error));
      } else {
        alert("輸入錯誤");
      }
    },
    //登入檢查->會丟給我 userSeriel (使用者流水號)
    supplyLogIn(userName, password) {
      if (!userName || !password) {
        alert("輸入錯誤");
        return;
      }
      const LoginData = JSON.stringify({
        userId: userName,
        userPw: password
      });
      userLogIn(LoginData)
        .then(res2 => {
          // console.log(res2.data);
          if (res2.data.result) {
            // 將帳號寫入全域(Vuex)
            this.$store.commit("Login", res2.data.userSeriel);
            // 寫入餅乾
            this.$cookies.set("token", res2.data.userSeriel, 60 * 60 * 24 * 14);
            // 驗證社群狀態
            userStatus(this.$store.getters.userSeriel)
              .then(res3 => {
                console.log(res3.data);
                // 未加入社群(-1)
                if (res3.data.status == -1) {
                  // 全域(Vuex)設定此為第一次加入
                  this.$store.commit("ConfirmIsNew", true);
                  // 打api：新社群
                  userAddNewGroup(this.$store.getters.userSeriel)
                    .then(res4 => {
                      console.log(res4.data);
                      if (res4.data) {
                        console.log("打api：新社群");
                        this.$router.push("/publicArea");
                        return;
                      }
                    })
                    .catch(error => console.log(error));
                }
                // 已過期(2)
                if (res3.data.status == 2) {
                  // 打api：搬到新的社群
                  userTransferGroup(this.$store.getters.userSeriel)
                    .then(res5 => {
                      console.log(res5.data);
                      if (res5.data) {
                        this.$router.push("/publicArea");
                        return;
                      }
                    })
                    .catch(error => console.log(error));
                }
                //正常(1)
                if (res3.data.status == 1) {
                  // 直接進入
                  // enter
                  this.$router.push("/publicArea");
                  return;
                }
              })
              .catch(error => console.log(error));

            // console.log(this.$store.getters.userSeriel);
            this.pass = true;
            // 關掉登入彈窗
            this.closePopupLogin();
          } else {
            alert("login failed");
            return;
          }
        })
        .catch(error => console.log(error));
    },
    // 查看使用說明
    watchInfo() {
      this.showInfo = true;
    },
    // 關閉使用說明
    closeInfo() {
      this.showInfo = false;
    }
  }
};
</script>

<style scoped>
.titImg {
  width: 100%;
  object-fit: contain;
}

.close {
  display: none;
}

.popup {
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  margin-left: 25%;
  margin-top: 19rem;
  width: 47%;
  justify-content: center;
  opacity: 0.8;
}
/* 彈跳視窗 */
.login__form {
  width: 52%;
  z-index: 3;
  background-color: rgb(246, 248, 247);
  display: flex;
  border: solid 2.5px black;
  padding: 2rem;
  border-radius: 15px;
  justify-content: center;
  margin: 0;
}
.container {
  height: 10rem;
  margin-top: 5rem;
}
.home__body {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  flex-wrap: wrap;
}
/* 右邊字 */
.home__btn {
  max-width: 50%;
  min-width: 330px;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  /* background-color: cyan; */
}
/* 左邊圖容器 */
.home__img {
  max-width: 50%;
  width: 40%;
  /* background-color: darkblue; */
}

.img {
  max-width: 100%;
  width: 100%;
  height: auto;
}
.btn1,
.btn2,
.btn3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.home__title {
  font-size: 3rem;
  margin: 0;
  font-weight: 200;
}

.infoBg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 40rem;
  margin-top: 7rem;
  /* background-color: pink; */
  /* opacity: 0.5; */
}
/* 使用說明 */
.info__body {
  position: relative;
  left: 20%;
  width: 60%;
  height: 100%;
  background-color: white;
  opacity: 0.9;
  border-radius: 15px;
  border: solid 5px;
  overflow-x: hidden;
  overflow-y: auto;
  flex-wrap: wrap;
  word-wrap: break-word;
}
/* 關閉使用說明視窗 */
.closeInfoBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 78%;
  top: -6%;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: solid 5px;
  font-size: 4rem;
  background-color: white;
}
/* 文章容器 */
.article {
  font-size: 1.8rem;
  padding: 1.2rem;
  letter-spacing: 0.5rem;
  overflow: hidden;
}
.articleTit {
  letter-spacing: 0.2rem;
}
/* 第一段 */
.contentOne {
  font-size: 1.5rem;
  text-align: justify;
}
/* 結語 */
.little {
  letter-spacing: 0;
  font-size: 1rem;
}
</style>
