<template>
  <div>
    <!-- 圖片預覽以及左右按鈕區塊 -->
    <div class="typeBox mx-auto">
      <div class="left__btn" @click="isPre = true">
        <img
          v-if="furnitures.length"
          class="leftBtn__img pointer"
          src="../../static/imgs/room/leftBtn.png"
          alt="左邊按鈕"
          width="224"
          height="346"
        />
      </div>
      <div class="imgBox mx-auto">
        <img
          v-if="furnitures.length"
          class="furnitureImg "
          :src="furnitures[count].src"
          alt=""
        />
      </div>
      <div class="right__btn" @click="isNext = true">
        <img
          v-if="furnitures.length"
          class="rightBtn__img pointer"
          src="../../static/imgs/room/rightBtn.png"
          alt="右邊按鈕"
          width="224"
          height="346"
        />
      </div>
    </div>
    <div
      v-if="furnitures.length"
      class="choose__btn pointer mx-auto"
      @click="use"
    >
      套用
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
      this.$emit("choose");
    },
    // 打更換牆壁api
    useWall() {
      const wallData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setWall(wallData)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => console.log(error));
    },
    // 打更換床api
    useBed() {
      const bedData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setBed(bedData)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => console.log(error));
    },
    // 打更換日記api
    useDiary() {
      const diaryData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setDiary(diaryData)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => console.log(error));
    },
    // 打更換書櫃api
    useBookcase() {
      const bookcaseData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setBookcase(bookcaseData)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => console.log(error));
    },
    // 打更換書桌api
    useDesk() {
      const deskData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setDesk(deskData)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => console.log(error));
    },
    // 打更換衣櫃api
    useCloset() {
      const closetData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setCloset(closetData)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => console.log(error));
    },
    // 打更換裝飾api
    useDeco() {
      const decoData = {
        userSeriel: this.$store.getters.userSeriel,
        itemIndex: this.count + 1
      };
      setDecorate(decoData)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
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
  width: 90%;
  /* background-color: darkgray; */
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
  min-width: 22vw;
  min-height: 22vw;
  width: 22vw;
  height: 22vw;
  background-color: #efd3d7;
  border-radius: 15px;
  margin: 0.5rem;
  padding: 0.3rem;
}
/* 照片 */
.furnitureImg {
  width: 22vw;
  height: 22vw;
  object-fit: contain;
  /* opacity: 0; */
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
  border: solid 2px rgba(0, 0, 0, 0.459);
  border-radius: 5px;
  background-color: #fff1e6;
}
.choose__btn:hover {
  opacity: 0.5;
}
.furnitureImg {
  width: 100%;
}
</style>
