<template>
  <main>
    <div class="row">
      <!-- 上排導覽 -->
      <header class="base__head mx-auto">
        <IconList />
      </header>
      <div class=" mx-auto">
        <div class="base__body">
          <!-- 房門 -->
          <Door
            v-for="(item, index) in doors"
            :key="index"
            :doors="item"
            :homeOwner="members[index] ? members[index] : {}"
          />
          <!-- 留言冰箱 -->
          <Refrigerator />
          <!-- 電視 -->
          <Television />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { getMembers, getUserInfo } from "@/js/all.js";
import Door from "../components/Door.vue";
import IconList from "../components/IconList.vue";
import Television from "../components/Television.vue";
import Refrigerator from "../views/Refrigerator.vue";
export default {
  data() {
    return {
      members: {},
      // 門的名子照片與頭像
      doors: [
        {
          id: 1,
          name: "door1",
          src: "../../static/imgs/doorSkewL.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          id: 2,
          name: "door2",
          src: "../../static/imgs/doorSkewL.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          id: 3,
          name: "door3",
          src: "../../static/imgs/door.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          id: 4,
          name: "door4",
          src: "../../static/imgs/door.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          id: 5,
          name: "door5",
          src: "../../static/imgs/door.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          id: 6,
          name: "door6",
          src: "../../static/imgs/doorSkewR.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          id: 7,
          name: "door7",
          src: "../../static/imgs/doorSkewR.png",
          img: "../../static/imgs/avatar.png"
        }
      ]
    };
  },
  components: {
    IconList,
    Door,
    Refrigerator,
    Television
  },
  created() {
    if (this.$store.getters.getNewInfo) {
      alert("請參閱手冊");
      this.$store.commit("ConfirmIsNew", false);
    }
    //取得使用者資訊
    getUserInfo(this.$store.getters.userSeriel)
      .then(res1 => console.log(res1.data))
      .catch(error => console.log(error));
    //取得社群成員資訊
    getMembers(this.$store.getters.userSeriel)
      .then(res2 => {
        console.log(res2.data);
        this.members = res2.data.members;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
.base__body {
  position: relative;
  max-width: 100vw;
  width: 100vw;
  height: 50vw;
  background-image: url("../../static/imgs/bg.jpeg");
  background-position: bottom;
  background-repeat: none;
  /* background-attachment: fixed; */
  background-size: contain;
  left: 0;
}
/* 解決右邊留白 */
.row .base__head {
  position: absolute;
  margin-right: 0;
  z-index: 2;
}
</style>
