<template>
  <!-- @submit.prevent="inputDone" -->
  <form class="login__form">
    <div class="inputBox">
      <label class="pop__tit">請輸入資訊</label>
      <br />
      <!-- 不是會員才顯示 -->
      <!-- 暱稱 -->
      <label v-if="!member">暱稱</label>
      <input
        v-if="!member"
        type="text"
        v-model="nickName"
        placeholder="限 1-10 字"
        minlength="1"
        maxlength="10"
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
      <!-- 不是會員就要輸入郵件 -->
      <label v-if="!member || isForget">郵件</label>
      <!-- 是會員就直接輸入帳號 -->
      <input
        v-if="!member || isForget"
        type="mail"
        v-model="mail"
        :placeholder="mailString"
        required
      />
      <br v-if="!member && !isForget" />
      <br v-if="!member && !isForget" />
      <div v-if="isForget" class="getBox">
        <button
          v-if="isForget"
          type="submit"
          class="pointer"
          @click.prevent="getMail"
        >
          取得
        </button>
      </div>
      <label>密碼</label>
      <!-- 是會員就直接輸入密碼 -->
      <input
        v-if="member"
        type="password"
        v-model="password"
        minlength="6"
        maxlength="20"
        required
        @keyup.enter.self="atClickLogIn"
      />
      <!-- 不是會員會有創建密碼提示 -->
      <input
        v-if="!member"
        type="password"
        v-model="password"
        placeholder="限 6-20 字"
        minlength="6"
        maxlength="20"
        required
        @keyup.enter.self="atClickRegiste"
      />
      <br />
      <br />
      <label v-if="!member">確認密碼</label>
      <input
        v-if="!member"
        type="password"
        v-model="password2"
        placeholder="限 6-20 字"
        minlength="6"
        maxlength="20"
        required
      />
      <br v-if="!member" />
      <br v-if="!member" />
      <!-- 是會員按鈕會顯示:登入 -->
      <div class="btnBox">
        <button
          v-if="member"
          class="forgetBtn pointer"
          type="submit"
          @click.prevent="forget"
        >
          忘記密碼
        </button>
        <button
          v-if="member"
          class="pointer"
          type="submit"
          @click.prevent="atClickLogIn"
        >
          登入
        </button>
        <!-- 不是會員按鈕會顯示:完成 -->
        <button
          v-else
          type="submit"
          class="pointer"
          @click.prevent="atClickRegiste"
        >
          完成
        </button>
      </div>
    </div>
    <!-- 關閉視窗 -->
    <div class="pointer close__btn " @click="closePop">
      <label class="pointer  close__label" @click="closePop">X</label>
    </div>
  </form>
</template>

<script>
import { userForget } from "@/js/all";
export default {
  data() {
    return {
      userName: "",
      password: "",
      password2: "",
      nickName: "",
      mail: "",
      isForget: false,
      mailString: "請填寫郵件"
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
      if (this.password !== this.password2) {
        alert("密碼錯誤");
        return;
      }
      this.$emit(
        "sentRegiste",
        this.nickName,
        this.userName,
        this.mail,
        this.password
      );
    },
    //關閉彈跳視窗
    closePop() {
      this.$emit("closePop");
    },
    // 忘記密碼按鈕
    forget() {
      this.isForget = true;
      this.mailString = "請填寫郵件獲取密碼";
    },
    // 取得郵件
    getMail() {
      if (!this.userName || !this.mailString) {
        return;
      }
      if (!this.userName) {
        alert("請輸入帳號");
        return;
      }
      if (!this.mailString) {
        alert("請輸入郵件");
        return;
      }
      const forgetData = {
        userId: this.userName,
        email: this.mail
      };
      // 打api獲取密碼
      userForget(forgetData)
        .then(res => {
          console.log(res);
          if (res.data.result) {
            郵件已寄出, 請檢查信箱;
          }
        })
        .catch(error => console.log(error));
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
/* 登入按鈕容器 */
.btnBox {
  display: flex;
  justify-content: flex-end;
  /* background-color: cadetblue; */
}
/* 忘記密碼按鈕 */
.forgetBtn {
  margin-right: 1rem;
}
/* 取得密碼按鈕容器 */
.getBox {
  margin: 0.5rem 0 0.5rem 0;
}
</style>
