<template>
  <main>
    <div
      class="memberBox"
      style="{'backgroundImage':'url(../../static/imgs/room/nameTagGreen.png)'}"
      @click="chooseChat"
    >
      <!-- 頭像 -->

      <aside class="head">
        <img
          class="avatarImg  pointer"
          :src="
            'http://35.201.237.18/img/avatar_' + memberArr.memberRole + '.png'
          "
          alt="memberPic"
          width="100"
          height="100"
        />
      </aside>
      <!-- 名字 -->
      <aside class="name">
        <label class="pointer">{{ memberArr.memberName }}</label>
      </aside>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      avatarSrc: ""
    };
  },
  props: ["memberArr", "num"],
  created() {},
  computed: {
    // 名條顏色
    displayColor() {
      this.num = parseInt(num);
      if (num % 3 == 2) {
        return "backgroundImage: 'url('+../../static/imgs/room/nameTagGreen.png+')'";
      }
      if (num % 3 == 0) {
        return "backgroundImage: ../../static/imgs/room/nameTagBlue.png";
      }
    }
  },
  methods: {
    chooseChat() {
      this.$emit("chooseChat");
    }
  }
};
</script>

<style scoped>
/* 放頭像和名字容器 */
.memberBox {
  background-image: url("../../static/imgs/room/nameTagRed.png");
  background-repeat: none;
  background-size: cover;
  background-position: bottom;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  /* background-color: slateblue; */
  overflow: hidden;
}
/* 頭像框 */
.head {
  width: 3.6vw;
  height: 3.6vw;
  border: solid 1px red;
  border-radius: 50%;
  overflow: hidden;
}
/* 照片 */
.avatarImg {
  max-width: 100%;
  width: 100%;
  object-fit: contain;
  object-position: top;
}
/* 名字 */
.name {
  width: 55%;
  max-height: 3vw;
  height: 2.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5vw;
}
</style>
