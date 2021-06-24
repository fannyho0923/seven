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
          <div class="doorBox" v-if="doors">
            <Door v-for="(item, index) in doors" :key="index" :doors="item" />
          </div>
          <!-- 留言冰箱 -->
          <Refrigerator />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { getMembers, getUserInfo } from "@/js/all.js";
import Door from "../components/Door.vue";
import IconList from "../components/IconList.vue";
import Refrigerator from "../views/Refrigerator.vue";
export default {
  components: {
    IconList,
    Door,
    Refrigerator
  },
  created() {
    //取得使用者資訊
    getUserInfo(this.$store.getters.userSeriel)
      .then(res1 => console.log(res1.data))
      .catch(error => console.log(error));
    //取得社群成員資訊
    getMembers(this.$store.getters.userSeriel)
      .then(res2 => {
        console.log(res2.data);
        for (let index = 0; index < array.memberInfos; index++) {
          // 依序將成員寫入房門陣列
          this.members.push(memberInfos[index]);
        }
      })
      .catch(error => console.log(error));
  },
  data() {
    return {
      data: { members: [] },
      // 門的名子照片與頭像
      doors: [
        {
          name: "door1",
          src: "../../static/imgs/doorSkewL.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          name: "door2",
          src: "../../static/imgs/doorSkewL.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          name: "door3",
          src: "../../static/imgs/door.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          name: "door4",
          src: "../../static/imgs/door.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          name: "door5",
          src: "../../static/imgs/door.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          name: "door6",
          src: "../../static/imgs/doorSkewR.png",
          img: "../../static/imgs/avatar.png"
        },
        {
          name: "door7",
          src: "../../static/imgs/doorSkewR.png",
          img: "../../static/imgs/avatar.png"
        }
      ]
    };
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
