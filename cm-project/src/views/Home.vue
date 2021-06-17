<template>
  <main class="container mx-auto">
    <div class="row">
      <div class="home__body">
        <section class="home__btn">
          <!-- 使用規則,創建帳號,進入房間按鈕 -->
          <header class="home__title"><h1>SEVEN</h1></header>
          <div class="all__btn">
            <p class="pointer btn1">使用規則</p>
            <p v-if="!isMember" class="pointer btn2" @click.self="atClick">
              創建帳號
            </p>
            <p class="pointer btn3" @click.self="enter">進入公寓</p>
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
        :member="isMember"
        @sent="supply"
        @inputDone="inputFine"
        @closePop="closePopup"
      />
    </div>
    <!-- 登入的彈跳視窗 -->
    <div v-if="this.unLogin" class="popup">
      <PopupWindow
        :member="isMember"
        @sent="supply"
        @inputDone="inputOK"
        @closePop="closePopupLogin"
      />
    </div>
  </main>
</template>

<script>
import PopupWindow from "../components/PopupWindow.vue";
// import { userSignUp, userLogIn } from "@/js/all.js";

export default {
  data() {
    return {
      isRegistered: true,
      unLogin: false,
      isMember: true,
      pass: false,
      nickName: "",
      userName: 0,
      password: 0
    };
  },
  created() {
    // this.axios.get("http://35.201.237.18/Group/2").then(res => {
    //   console.log(res);
    // });
  },

  components: { PopupWindow },
  // created() {
  //   userLogIn({
  //     id: sdfs,
  //     pw: "123456789"
  //   })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err); //response攔截器會先執行，除非你漏接了，才會進到catch
  //     });
  // },
  methods: {
    //點擊註冊
    atClick() {
      this.isRegistered = false;
    },
    //關閉註冊彈跳視窗
    closePopup() {
      this.isRegistered = true;
    },
    //關閉登入彈跳視窗
    closePopupLogin() {
      this.unLogin = false;
    },
    //送出註冊資料
    inputFine(str) {
      alert("歡迎" + " " + str + " " + "入住");
      this.isRegistered = true;
      this.isMember = true;
      this.unLogin = false;
    },
    //送出登入資料
    inputOK() {
      // alert("歡迎回家");
      this.unLogin = false;
      // this.login();
      // this.$router.push("/publicArea");
    },
    //檢查是否已登入過
    enter() {
      if ($cookies.get("token") === "ImLogin") {
        this.$router.push("/publicArea");
        return;
      }
      if (!this.unLogin && this.isMember && this.isRegistered && this.pass) {
        this.$router.push("/publicArea");
        return;
      }
      if (!this.isMember) {
        alert("sorry~您尚未有帳號，請點選創建帳號");
        this.isRegistered = false;
      }
      if (!this.unLogin) {
        alert("麻煩您先登入");
        this.unLogin = true;
      }
    },
    supply(str, str2) {
      this.userName = str;
      this.password = str2;
      console.log(this.userName + "," + this.password);
      this.login();
    },
    // SignUp() {
    //   userSignUp({
    //     id: this.userName,
    //     pw: this.password,
    //     userName: this.nickName
    //   })
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err); //response攔截器會先執行，除非你漏接了，才會進到catch
    //     });
    // },
    login() {
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
      if (this.userName == "abcdef" && this.password == "123456") {
        this.$cookies.set("token", "ImLogin", 60 * 60 * 24 * 14);
        this.pass = true;
      }
      if (this.pass) {
        // enter
        this.$router.push("/publicArea");
      } else {
        alert("login failed");
      }
    }
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
