<template>
  <form class="login__form" @submit.prevent="inputDone">
    <div class="inputBox">
      <label class="pop__tit">請輸入資訊</label>
      <br />
      <label v-if="!member">nickName</label>
      <input
        v-if="!member"
        type="text"
        v-model="nickName"
        placeholder="限 5-15 字"
        minlength="5"
        maxlength="15"
        required
      />
      <br v-if="!member" />
      <br v-if="!member" />
      <label>User Name</label>
      <input
        v-if="member"
        type="text"
        v-model="userName"
        minlength="6"
        maxlength="20"
        required
      />
      <input
        v-else
        type="text"
        v-model="userName"
        placeholder="限 6-20 字"
        minlength="6"
        maxlength="20"
        required
      />
      <br />
      <br />
      <label>Password</label>
      <input
        v-if="member"
        type="password"
        v-model="password"
        minlength="6"
        maxlength="20"
        required
      />
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
      <button v-if="member" type="submit" @click="atClick">Log in</button>
      <button v-else type="submit" @click="atClick">finish</button>
    </div>
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
    atClick() {
      if (!this.member) {
        return;
      }
      // console.log(this.userName + "," + this.password);
      this.$emit("sent", this.userName, this.password);
    },
    inputDone() {
      this.$emit("inputDone", this.nickName);
    },
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
