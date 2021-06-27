<template>
  <main>
    <div class="row">
      <!-- 上排導覽 -->
      <header class="base__head">
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
          <div class="handDrawn">
            <img
              class="handDrawnImg"
              src="../../static/imgs/publicRoom/handDrawn.png"
              alt="掛衣架"
              width="127"
              height="345"
            />
          </div>
          <div class="hangingPainting">
            <img
              class="hangingPaintingImg"
              src="../../static/imgs/publicRoom/hangingPainting.png"
              alt="壁畫"
              width="638"
              height="188"
            />
          </div>
          <div class="tableBox">
            <img
              class="tableImg"
              src="../../static/imgs/publicRoom/table.png"
              alt="餐桌"
              width="319"
              height="267"
            />
          </div>
          <div class="clock">
            <img
              class="clockImg"
              src="../../static/imgs/publicRoom/clock.png"
              alt="時鐘"
              width="158"
              height="193"
            />
          </div>
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
  background-image: url("../../static/imgs/bg.jpg");
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
/* 餐桌 */
.tableBox {
  position: absolute;
  left: 43%;
  top: 68%;
  width: 20%;
}
.tableImg {
  max-width: 100%;
  height: auto;
}
/* 壁畫 */
.hangingPainting {
  position: absolute;
  left: 24.5%;
  top: 3%;
  width: 50%;
}
.hangingPaintingImg {
  max-width: 100%;
  width: 100%;
  height: auto;
}
/* 掛衣架 */
.handDrawn {
  position: absolute;
  z-index: 3;
  left: 18%;
  top: 43%;
  width: 8%;
  height: 35%;
}
.handDrawnImg {
  max-width: 100%;
  height: auto;
  max-height: 100%;
}
/* 時鐘 */
.clock {
  position: absolute;
  left: 86%;
  top: 18%;
  width: 8%;
  height: 35%;
}
.clockImg {
  max-width: 100%;
  height: auto;
  max-height: 100%;
}
</style>
