<template>
  <!-- @submit.prevent="inputDone" -->
  <form class="login__form">
    <div class="inputBox">
      <label class="pop__tit">請輸入資訊</label>
      <br />
      <!-- 不是會員才顯示 -->
      <label v-if="!member">暱稱</label>
      <input
        v-if="!member"
        type="text"
        v-model="nickName"
        placeholder="限 1-20 字"
        minlength="1"
        maxlength="20"
        required
      />
      <br v-if="!member" />
      <br v-if="!member" />
      <!-- 無論是否為會員都要輸入帳密 -->
      <label>帳號</label>
      <!-- 是會員就直接輸入帳號 -->
      <input
        v-if="member"
        type="text"
        v-model="userName"
        minlength="4"
        maxlength="20"
        required
      />
      <!-- 不是會員會有創建帳號提示 -->
      <input
        v-else
        type="text"
        v-model="userName"
        placeholder="限 4-20 字"
        minlength="4"
        maxlength="20"
        required
      />
      <br />
      <br />
      <label>密碼</label>
      <!-- 是會員就直接輸入密碼 -->
      <input
        v-if="member"
        type="password"
        v-model="password"
        minlength="6"
        maxlength="20"
        required
      />
      <!-- 不是會員會有創建密碼提示 -->
      <input
        v-else
        type="password"
        v-model="password"
        placeholder="限 6-20 字"
        minlength="6"
        maxlength="20"
        required
      />
      <br />
      <br />
      <!-- 是會員按鈕會顯示:登入 -->
      <button v-if="member" type="submit" @click.prevent="atClickLogIn">
        Log in
      </button>
      <!-- 不是會員按鈕會顯示:完成 -->
      <button v-else type="submit" @click.prevent="atClickRegiste">
        finish
      </button>
    </div>
    <!-- 關閉視窗 -->
    <div class="pointer close__btn " @click="closePop">
      <label class="pointer  close__label" @click="closePop">X</label>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      password: "",
      nickName: ""
    };
  },
  props: ["member"],
  methods: {
    //登入
    atClickLogIn() {
      this.$emit("sentLogIn", this.userName, this.password);
    },
    //註冊
    atClickRegiste() {
      this.$emit("sentRegiste", this.nickName, this.userName, this.password);
    },
    //關閉彈跳視窗
    closePop() {
      this.$emit("closePop");
    }
  }
};
</script>

<style scoped>
.inputBox {
  text-align: right;
  font-size: 1.5vw;
}
.pop__tit {
  display: block;
  text-align: center;
  letter-spacing: 0.5em;
}
.close__btn {
  position: absolute;
  left: 77.5%;
  top: -4%;
  width: 35px;
  height: 35px;
  border: solid 2.5px black;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.close__label {
  font-size: 1.5rem;
}
</style>
