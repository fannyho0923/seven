<template>
  <div>
    <div class="furnitureBg">
      <!-- 圖片預覽以及左右按鈕區塊 -->
      <div class="typeBox mx-auto">
        <div class="left__btn" @click="isPre = true">
          <img
            class="leftBtn__img pointer"
            src="../../static/imgs/room/leftBtn.png"
            alt="左邊按鈕"
            width="224"
            height="346"
          />
        </div>
        <div class="imgBox mx-auto">
          <!-- <div v-for="(item, index) in furnitures" :key="index"> -->
          <img class="furnitureImg " :src="furnitures[count].src" alt="" />
          <!-- </div> -->
        </div>
        <div class="right__btn" @click="isNext = true">
          <img
            class="rightBtn__img pointer"
            src="../../static/imgs/room/rightBtn.png"
            alt="右邊按鈕"
            width="224"
            height="346"
          />
        </div>
      </div>
      <div class="choose__btn pointer mx-auto" @click="use">套用</div>
    </div>
  </div>
</template>

<script>
const furnitureEnum = {
  diary: "日記",
  bookcase: "書櫃",
  desk: "書桌",
  clothcase: "衣櫃",
  bed: "床組",
  decoretion: "裝飾",
  wall: "牆壁"
};
import {
  setWall,
  setCloset,
  setBed,
  setBookcase,
  setDesk,
  setDiary,
  setDecorate
} from "@/js/all";
export default {
  data() {
    return {
      count: 0,
      isNext: false,
      isPre: false
    };
  },
  watch: {
    isNext() {
      if (this.isNext) {
        this.isNext = false;
        // console.log("next");
        if (this.count === this.furnitures.length - 1) {
          this.count = 0;
          return;
        }
        this.count++;
      }
    },
    isPre() {
      if (this.isPre) {
        this.isPre = false;
        // console.log("pre");
        if (this.count === 0) {
          this.count = this.furnitures.length - 1;
          return;
        }
        this.count--;
      }
    }
  },
  props: {
    furnitures: {
      type: Array
    },
    furnitureItem: {
      type: String
    }
  },
  created() {
    // console.log("========");
    // console.log(this.furnitures);
  },
  methods: {
    // 套用按鈕
    use() {
      switch (this.furnitureItem) {
        case furnitureEnum.diary:
          console.log("I am diary");
          this.useDiary();
          break;
        case furnitureEnum.bookcase:
          this.useBookcase();
          break;
        case furnitureEnum.desk:
          this.useDesk();
          break;
        case furnitureEnum.clothcase:
          this.useCloset();
          break;
        case furnitureEnum.bed:
          this.useBed();
          break;
        case furnitureEnum.decoretion:
          this.useDeco();
          break;
        case furnitureEnum.wall:
          this.useWall();
          break;
        // no default
      }
    },
    // 打更換牆壁api
    useWall() {
      const wallData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setWall(wallData).then(res => {
        console.log(res.data);
      });
    },
    // 打更換床api
    useBed() {
      const bedData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setBed(bedData).then(res => {
        console.log(res.data);
      });
    },
    // 打更換日記api
    useDiary() {
      const diaryData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setDiary(diaryData).then(res => {
        console.log(res.data);
      });
    },
    // 打更換書櫃api
    useBookcase() {
      const bookcaseData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setBookcase(bookcaseData).then(res => {
        console.log(res.data);
      });
    },
    // 打更換書桌api
    useDesk() {
      const deskData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setDesk(deskData).then(res => {
        console.log(res.data);
      });
    },
    // 打更換衣櫃api
    useCloset() {
      const closetData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setCloset(closetData).then(res => {
        console.log(res.data);
      });
    },
    // 打更換裝飾api
    useDeco() {
      const decoData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setDecorate(decoData).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>

<style scoped>
.furnitureBg {
  /* position: relative; */
  /* min-width: 200px;
  min-height: 200px; */
}
.furniture__body {
  position: absolute;
  display: flex;
  /* width: 100%; */
  /* background-color: violet; */
}
/* 放預覽和左右按鈕的容器 */
.typeBox {
  display: flex;
  margin-top: 2rem;
  width: 80%;
  background-color: darkgray;
}
/* 照片 */
.furnitureImg {
  width: 23vw;
  height: 23vw;
  object-fit: contain;
  /* opacity: 0; */
}
/* 左邊按鈕容器 */
.left__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4vw;
}
/* 左邊按鈕照片 */
.leftBtn__img {
  width: 100%;
  height: auto;
}
.leftBtn__img:hover {
  opacity: 0.7;
}
/* 右邊按鈕 */
.right__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4vw;
}
/* 右邊按鈕照片 */
.rightBtn__img {
  width: 100%;
  height: auto;
}
.rightBtn__img:hover {
  opacity: 0.7;
}
/* 放照片容器 */
.imgBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23vw;
  height: 23vw;
  background-color: #efd3d7;
}
/* 套用按鈕 */
.choose__btn {
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  min-width: 50px;
  width: 10%;
  min-width: 30px;
  font-size: 1.5vw;
  border: solid 1px black;
  border-radius: 10%;
  background-color: darksalmon;
}
.choose__btn:hover {
  opacity: 0.5;
}
.furnitureImg {
  width: 100%;
}
</style>
