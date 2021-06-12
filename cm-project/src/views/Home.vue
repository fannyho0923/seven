<template>
  <main class="container mx-auto">
    <div class="row">
      <div class="home__body">
        <section class="home__btn">
          <header class="home__title"><h1>SEVEN</h1></header>
          <div class="all__btn">
            <p class="pointer btn1">使用規則</p>
            <p class="pointer btn2" @click.self="atClick">創建帳號</p>
            <p class="pointer btn3">進入公寓</p>
          </div>
        </section>
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
    <div v-if="this.isPop" class="popup">
      <PopupWindow
        :member="isMember"
        @sent="supply"
        @toLogin="login"
        @closePop="closePopup"
      />
    </div>
  </main>
</template>

<script>
import PopupWindow from "../components/PopupWindow.vue";

export default {
  data() {
    return {
      isPop: false,
      isMember: true
    };
  },
  components: { PopupWindow },
  methods: {
    atClick() {
      this.isPop = true;
    },
    closePopup() {
      this.isPop = false;
    },
    supply() {},
    login(str) {
      //-- write login authencation logic here! --
      let auth = true;

      if (auth) {
        alert("歡迎" + " " + str + " " + "入住");
        this.isPop = false;

        // this.$router.push("/publicArea");
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
