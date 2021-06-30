<template>
  <!-- 房門圖 -->
  <div :class="doors.name" class="set-inlineBlock base__door">
    <img
      class="img img-resp"
      :src="doors.src"
      alt=""
      width="147"
      height="328"
    />
    <!-- 房門頭像 -->
    <div v-if="homeOwner.memberRole" class="pointer circle" :style="displayId">
      <img
        class="pointer img__avatar"
        :src="
          'http://35.201.237.18/img/avatar_' + homeOwner.memberRole + '.png'
        "
        alt="avatar"
        width="100"
        height="100"
        @click.self="enterRoom"
      />
    </div>
    <!-- 名牌 -->
    <div v-if="homeOwner.memberRole" class="nameTagBox">
      <img
        class="pointer nameTagImg"
        src="../../static/imgs/publicRoom/nameTag.png"
        alt="nameTag"
        width="100"
        height="72"
      />
      <label class="nameLab">{{ homeOwner.memberName }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    doors: {
      type: Object
    },
    homeOwner: {
      type: Object
    }
  },
  computed: {
    // 頭像高度
    displayId() {
      if (this.doors.id <= 2) {
        return "top: 26.5%; left:20%;";
      }
      if (this.doors.id >= 6) {
        return "top:26%";
      } else {
        return "top:20%";
      }
    }
  },
  methods: {
    //進入房間
    enterRoom() {
      if (!this.homeOwner.memberName) {
        alert("此為空房！");
        return;
      } else {
        const id = this.homeOwner.memberDoorIndex;
        this.$store.commit("Enter", this.homeOwner.memberDoorIndex);
        this.$router.push({ name: "Room", query: { id } });
      }
    }
  }
};
</script>

<style scoped>
.base__door {
  position: absolute;
  width: 10%;
  height: auto;
}
/* 門照片 */
.img {
  max-width: 100%;
  width: 100%;
}
/* 頭像的相框 */
.circle {
  position: absolute;
  max-width: 50px;
  max-height: 50px;
  min-width: 5px;
  min-height: 5px;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  left: 22%;
  top: 25%;
  box-shadow: 0 0 7px gray;
  /* overflow: hidden; */
}
/* 頭像照片 */
.img__avatar {
  position: relative;
  z-index: 5;
  max-width: 100%;
  object-fit: contain;
  object-position: top;
}
.img__avatar:hover {
  opacity: 0.7;
}
/* 名片容器 */
.nameTagBox {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 1%;
  top: 38%;
  width: 70%;
  object-fit: contain;
  object-position: top;
  overflow: hidden;
  z-index: 2;
}
/* 名片照片 */
.nameTagImg {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 20%;
  vertical-align: bottom;
  object-fit: contain;
  /* background-color: cornflowerblue; */
}
/* 名片字 */
.nameLab {
  text-align: center;
  z-index: 3;
  /* max-width: 70%; */
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  /* left: 33%; */
  top: 46%;
  font-size: 1.2vw;
  overflow: hidden;
  /* background-color: cyan; */
}
/* 門的位置 */
.door1 {
  left: 0.5%;
  top: 50%;
}
.door2 {
  left: 11%;
  top: 39%;
}
.door3 {
  left: 24%;
  top: 42%;
}
.door4 {
  left: 38%;
  top: 42%;
}
.door5 {
  left: 52%;
  top: 42%;
}
.door6 {
  left: 79.5%;
  top: 40%;
}
.door7 {
  left: 90%;
  top: 52%;
}
</style>
