<template>
  <main class="container mx-auto">
    <div class="row">
      <div class="home__body">
        <section class="home__btn">
          <!-- 使用規則,創建帳號,進入房間按鈕 -->
          <header class="home__title"><h1>SEVEN</h1></header>
          <div class="all__btn">
            <p class="pointer btn1">使用規則</p>
            <p v-if="!isMember" class="pointer btn2" @click.self="atRegiste">
              創建帳號
            </p>
            <p class="pointer btn3" @click.self="atLogIn">進入公寓</p>
          </div>
        </section>
        <!-- 左邊圖示 -->
        <aside class="home__img">
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
      pass: false
    };
  },
  // created() {
  // http://35.201.237.18/Group/2
  // http://35.201.237.18/SignUp
  // this.axios.post("http://35.201.237.18/SignUp", {}).then(res => {
  //   console.log(res);
  // });
  // },

  components: { PopupWindow },
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

    //檢查是否已登入過
    // enter() {
    //   if ($cookies.get("token") === "ImLogin") {
    //     this.$router.push("/publicArea");
    //     return;
    //   }
    //   if (!this.unLogin && this.isMember && this.isRegistered && this.pass) {
    //     this.$router.push("/publicArea");
    //     return;
    //   }
    //   if (!this.isMember) {
    //     alert("sorry~您尚未有帳號，請點選創建帳號");
    //     this.isRegistered = false;
    //   }
    //   if (!this.unLogin) {
    //     alert("麻煩您先登入");
    //     this.unLogin = true;
    //   }
    // },
    // foo() {
    //   const data = JSON.stringify({
    //     userId: "test222",
    //     userPw: "fanny222",
    //     userName: "fanny222"
    //   });
    //   userSignUp(data).then(res => {
    //     console.log(res.data);
    //   });
    // },
    //註冊檢查
    supplyRegiste(nickName, userName, password) {
      const RegisteData = JSON.stringify({
        userId: userName,
        userPw: password,
        userName: nickName
      });
      console.log(RegisteData);
      userSignUp(RegisteData).then(res => {
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
      });
    },
    //登入檢查->會丟給我 userSeriel (使用者流水號)
    supplyLogIn(userName, password) {
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
            // 驗證社群狀態
            userStatus(this.$store.getters.userSeriel)
              .then(res3 => {
                console.log(res3.data);
                // 未加入社群(-1)
                if (res3.data.status == -1) {
                  // 打api：新社群
                  userAddNewGroup(this.$store.getters.userSeriel).then(res4 =>
                    console.log(res4.data)
                  );
                }
                // 已過期(2)
                if (res3.data.status == 2) {
                  // 打api：搬到新的社群
                  userTransferGroup(this.$store.getters.userSeriel).then(res5 =>
                    console.log(res5.data)
                  );
                }
                //正常(1)
                if (res3.data.status == 1) {
                  // 直接進入
                  // enter
                  this.$router.push("/publicArea");
                }
              })
              .catch(error => console.log(error));
            // 寫入餅乾
            this.$cookies.set("token", res2.data.userSeriel, 60 * 60 * 24 * 14);
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
    }
    // login() {
    //-- write login authencation logic here! --
    // userLogIn({
    //   id: this.userName,
    //   pw: this.password
    // })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err); //response攔截器會先執行，除非你漏接了，才會進到catch
    //   });
    // if (this.userName == "abcdef" && this.password == "123456") {
    //   this.$cookies.set("token", "ImLogin", 60 * 60 * 24 * 14);
    //   this.pass = true;
    // }
    // if (this.pass) {
    // enter
    //   this.$router.push("/publicArea");
    // } else {
    //   alert("login failed");
    // }
    // }
  }
};
</script>

<style scoped>
.close {
  display: none;
}

.popup {
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  margin-left: 23%;
  margin-top: 17rem;
  width: 50%;
  justify-content: center;
  opacity: 0.8;
}
.login__form {
  width: 60%;
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
}
.home__btn {
  max-width: 50%;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
}
.home__img {
  max-width: 50%;
  width: 40%;
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
</style>
