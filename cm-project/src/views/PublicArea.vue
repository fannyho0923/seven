<template>
  <main>
    <div class="row">
      <!-- 上排導覽 -->
      <header class="base__head">
        <IconList @move="goMove" />
      </header>
      <div class=" mx-auto">
        <div class="base__body">
          <!-- 房門 -->
          <Door
            v-for="(item, index) in doors"
            :key="index"
            :doors="item"
            :homeOwner="members[index] ? members[index] : {}"
            @lookInfo="watchInfo"
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
          <!-- 桌遊 -->
          <div class="tableGame">
            <img
              class="tableGameImg"
              src="../../static/imgs/publicRoom/tableGame.png"
              alt="桌遊"
              width="353"
              height="212"
            />
          </div>
          <!-- 黑糖 -->
          <div class="dog">
            <img
              class="dogImg"
              src="../../static/imgs/publicRoom/dog.png"
              alt="黑糖"
              width="385"
              height="773"
            />
          </div>
          <!-- 薯片 -->
          <div class="chips">
            <img
              class="chipsImg"
              src="../../static/imgs/publicRoom/chips.png"
              alt="薯片"
              width="257"
              height="277"
            />
          </div>
          <!-- 倉鼠 -->
          <div class="mice">
            <img
              class="miceImg"
              src="../../static/imgs/publicRoom/mice.png"
              alt="倉鼠"
              width="210"
              height="227"
            />
          </div>
          <!-- 零食 -->
          <div class="snack">
            <img
              class="snackImg"
              src="../../static/imgs/publicRoom/snack.png"
              alt="零食"
              width="263"
              height="241"
            />
          </div>
          <div v-if="showInfo" class="personalInfoBox">
            <PersonalInfo @leave="closeInfo" :user="userID" :isOwner="false" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { getMembers, getUserInfo, userTransferGroup } from "@/js/all.js";
import Door from "../components/Door.vue";
import IconList from "../components/IconList.vue";
import Television from "../components/Television.vue";
import Refrigerator from "../views/Refrigerator.vue";
import PersonalInfo from "@/components/PersonalInfo.vue";
export default {
  data() {
    return {
      userID: "",
      showInfo: false,
      members: [],
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
    Television,
    PersonalInfo
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
        let j = 0;
        for (let i = 0; i < this.doors.length; i++) {
          res2.data.hasMember[i]
            ? this.members.push(res2.data.members[j++])
            : this.members.push(null);
        }
        console.log(this.members);
      })
      .catch(error => console.log(error));
  },
  methods: {
    // 查看玩家資訊
    watchInfo(data) {
      if (!data) {
        return;
      }
      this.userID = data;
      this.showInfo = true;
    },
    // 關閉玩家資訊
    closeInfo() {
      this.showInfo = false;
    },
    // 搬家
    goMove() {
      // 打api：搬到新的社群
      userTransferGroup(this.$store.getters.userSeriel)
        .then(res => {
          console.log(res.data);
          if (res.data) {
            //取得使用者資訊
            getUserInfo(this.$store.getters.userSeriel)
              .then(res1 => console.log(res1.data))
              .catch(error => console.log(error));
            //取得社群成員資訊
            getMembers(this.$store.getters.userSeriel)
              .then(res2 => {
                console.log(res2.data);
                console.log(res2.data.members);
                this.members = res2.data.members;
              })
              .catch(error => console.log(error));
          }
        })
        .catch(error => console.log(error));
    }
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
  z-index: 6;
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
/* 桌遊 */
.tableGame {
  position: absolute;
  left: 68%;
  top: 81%;
  width: 11%;
  height: 35%;
}
.tableGameImg {
  max-width: 100%;
  height: auto;
  max-height: 100%;
}
/* 薯片 */
.chips {
  position: absolute;
  left: 76%;
  top: 76%;
  width: 3%;
  height: 8%;
}
.chipsImg {
  max-width: 100%;
  height: auto;
  max-height: 100%;
}
/* 零食 */
/* .snack {
  position: absolute;
  left: 69%;
  top: 79%;
  width: 11%;
  height: 35%;
}
.snackImg {
  max-width: 100%;
  height: auto;
  max-height: 100%;
} */
/* 黑糖 */
.dog {
  position: absolute;
  left: 26%;
  top: 75%;
  width: 4%;
  height: 14%;
}
.dogImg {
  max-width: 100%;
  height: auto;
  max-height: 100%;
}
/* 倉鼠 */
.mice {
  position: absolute;
  left: 63%;
  top: 80%;
  width: 4%;
  height: 8%;
}
.miceImg {
  max-width: 100%;
  height: auto;
  max-height: 100%;
}
</style>
