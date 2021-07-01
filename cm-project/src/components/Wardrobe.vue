<template>
  <div>
    <div class="WardrobeBg">
      <section class="wardrobe__base mx-auto">
        <!-- 左邊選擇物品區塊 -->
        <aside class="leftBox">
          <!-- 左邊標題 -->
          <header class="leftTit">選擇物品</header>
          <!-- 選單 -->
          <nav class="list__base">
            <ul class="list__body">
              <!-- 選取家具項目 -->
              <li
                class="item pointer"
                v-for="item in furnitureList"
                :key="item"
                @click="selectFunction(item)"
              >
                {{ item }}
              </li>
            </ul>
          </nav>
        </aside>
        <!-- 右邊選擇風格區塊 -->
        <aside class="rightBox">
          <!-- 右邊標題 -->
          <header class="rightTit">{{ switchItem }}</header>
          <div>
            <Furniture
              :furnitures="arr"
              :furnitureItem="switchItem"
              @choose="choosed"
            />
          </div>
        </aside>
        <!-- 關閉視窗按鈕 -->
        <div class="pointer leave__btn" @click="leave">
          <img
            class="closeIcon"
            src="../../static/imgs/closeIcon.png"
            alt="closeIcon"
            width="252"
            height="252"
            @click.self="leave"
          />
        </div>
      </section>
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
import Furniture from "@/components/Furniture.vue";
export default {
  data() {
    return {
      switchItem: "物品名稱",
      arr: [],
      furnitureList: Object.values(furnitureEnum),
      wallArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/bgColor/bg_blue.jpg"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/bgColor/bg_pink.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/bgColor/bg_gray.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/bgColor/bg_green.png"
        },
        {
          itemIndex: 5,
          src: "../../static/imgs/room/bgColor/bg_purple.png"
        },
        {
          itemIndex: 6,
          src: "../../static/imgs/room/bgColor/bg_orange.png"
        },
        {
          itemIndex: 7,
          src: "../../static/imgs/room/bgColor/bg_brown.png"
        }
      ],
      closetArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/closetColor/closet_1.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/closetColor/closet_2.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/closetColor/closet_3.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/closetColor/closet_4.png"
        },
        {
          itemIndex: 5,
          src: "../../static/imgs/room/closetColor/closet_5.png"
        },
        {
          itemIndex: 6,
          src: "../../static/imgs/room/closetColor/closet_6.png"
        },
        {
          itemIndex: 7,
          src: "../../static/imgs/room/closetColor/closet_7.png"
        },
        {
          itemIndex: 8,
          src: "../../static/imgs/room/closetColor/closet_8.png"
        }
      ],
      diaryArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/diaryColor/diary_1.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/diaryColor/diary_2.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/diaryColor/diary_3.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/diaryColor/diary_4.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/diaryColor/diary_5.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/diaryColor/diary_6.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/diaryColor/diary_7.png"
        }
      ],
      bedArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/bedColor/bed_brown.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/bedColor/bed_pink.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/bedColor/bed_purpleNor.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/bedColor/bed_red.png"
        },
        {
          itemIndex: 5,
          src: "../../static/imgs/room/bedColor/bed_purple.png"
        },
        {
          itemIndex: 6,
          src: "../../static/imgs/room/bedColor/bed_orange.png"
        },
        {
          itemIndex: 7,
          src: "../../static/imgs/room/bedColor/bed_blue.png"
        }
      ],
      deskArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/deskColor/desk_1.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/deskColor/desk_2.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/deskColor/desk_3.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/deskColor/desk_4.png"
        },
        {
          itemIndex: 5,
          src: "../../static/imgs/room/deskColor/desk_5.png"
        },
        {
          itemIndex: 6,
          src: "../../static/imgs/room/deskColor/desk_6.png"
        },
        {
          itemIndex: 7,
          src: "../../static/imgs/room/deskColor/desk_7.png"
        },
        {
          itemIndex: 8,
          src: "../../static/imgs/room/deskColor/desk_8.png"
        }
      ],
      bookcaseArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/bookcaseColor/bookcase_1.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/bookcaseColor/bookcase_2.png"
        },
        {
          itemIndex: 3,
          src: "../../static/imgs/room/bookcaseColor/bookcase_3.png"
        },
        {
          itemIndex: 4,
          src: "../../static/imgs/room/bookcaseColor/bookcase_4.png"
        },
        {
          itemIndex: 5,
          src: "../../static/imgs/room/bookcaseColor/bookcase_5.png"
        },
        {
          itemIndex: 6,
          src: "../../static/imgs/room/bookcaseColor/bookcase_6.png"
        },
        {
          itemIndex: 7,
          src: "../../static/imgs/room/bookcaseColor/bookcase_7.png"
        },
        {
          itemIndex: 8,
          src: "../../static/imgs/room/bookcaseColor/bookcase_8.png"
        },
        {
          itemIndex: 9,
          src: "../../static/imgs/room/bookcaseColor/bookcase_9.png"
        },
        {
          itemIndex: 10,
          src: "../../static/imgs/room/bookcaseColor/bookcase_10.png"
        },
        {
          itemIndex: 11,
          src: "../../static/imgs/room/bookcaseColor/bookcase_11.png"
        },
        {
          itemIndex: 12,
          src: "../../static/imgs/room/bookcaseColor/bookcase_12.png"
        }
      ],
      decoArr: [
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_1.png"
        },
        {
          itemIndex: 2,
          src: "../../static/imgs/room/decoColor/deco_2.png"
        },
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_3.png"
        },
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_4.png"
        },
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_5.png"
        },
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_6.png"
        },
        {
          itemIndex: 1,
          src: "../../static/imgs/room/decoColor/deco_7.png"
        }
      ]
    };
  },
  components: { Furniture },
  methods: {
    selectFunction(switchItem) {
      this.switchItem = switchItem;
      // console.log(switchItem);
      switch (switchItem) {
        case furnitureEnum.diary:
          // console.log("I am diary");
          this.clickDiary();
          break;
        case furnitureEnum.bookcase:
          // console.log("I am bookcase");
          this.clickBookcase();
          break;
        case furnitureEnum.desk:
          // console.log("I am desk");
          this.clickDesk();
          break;
        case furnitureEnum.clothcase:
          // console.log("I am clothcase");
          this.clickClothcase();
          break;
        case furnitureEnum.bed:
          // console.log("I am bed");
          this.clickBed();
          break;
        case furnitureEnum.decoretion:
          // console.log("I am decoretion");
          this.clickDecoretion();
          break;
        case furnitureEnum.wall:
          // console.log("I am wall");
          this.clickWall();
          break;
        // no default
      }
    },
    // 已選擇使用
    choosed() {
      this.$emit("choose");
    },
    //關閉視窗按鈕
    leave() {
      this.$emit("leave");
    },
    // 點擊日記項目
    clickDiary() {
      this.arr = this.diaryArr;
    },
    // 點擊書櫃項目
    clickBookcase() {
      this.arr = this.bookcaseArr;
    },
    // 點擊書桌項目
    clickDesk() {
      this.arr = this.deskArr;
    },
    // 點擊衣櫃項目
    clickClothcase() {
      this.arr = this.closetArr;
    },
    // 點擊裝飾項目
    clickDecoretion() {
      this.arr = this.decoArr;
    },
    clickWall() {
      this.arr = this.wallArr;
    },
    // 點擊床組項目
    clickBed() {
      this.arr = this.bedArr;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");
* {
  font-family: "sans-serif", sans-serif;
  font-weight: 400;
}
/* 遮罩 */
.WardrobeBg {
  position: absolute;
  left: 0;
  width: 100vw;
  height: 50vw;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
/* 衣櫃彈窗基底 */
.wardrobe__base {
  display: flex;
  position: relative;
  margin-top: 10rem;
  width: 55%;
  /* background-color: blue; */
}
/* 關閉彈窗 */
.leave__btn {
  position: absolute;
  width: 4vw;
  height: 4vw;
  left: 103%;
  /* background-color: rgb(43, 189, 226); */
}
/* 離開按鈕照片 */
.closeIcon {
  width: 100%;
  height: auto;
}
.closeIcon:hover {
  opacity: 0.5;
}
/* 左邊區塊 */
.leftBox {
  width: 38%;
  min-width: 300px;
  /* height: 100%; */
  background-color: #ddbea9;
  border-radius: 10px 0 0 10px;
}
/* 右邊區塊 */
.rightBox {
  width: 62%;
  /* height: 100%; */
  background-color: #ddbea9;
  border-radius: 0 10px 10px 0;
}
/* 左邊標題 */
.leftTit {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 64%;
  min-width: 100px;
  margin-top: 2rem;
  padding: 1.3rem;
  font-size: 2.3vw;
  background-image: url("../../static/imgs/room/leftCat.png");
  background-position: center;
  background-size: cover;
  /* background-color: cornflowerblue; */
}
/* 右邊標題 */
.rightTit {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 41%;
  min-width: 100px;
  margin-top: 2rem;
  padding: 1.3rem;
  font-size: 2.3vw;
  background-image: url("../../static/imgs/room/rightCat.png");
  background-position: center;
  background-size: cover;
  /* background-color: rgb(237, 100, 191); */
}
/* 家具清單 */
.list__base {
  margin-top: 2rem;
  /* background-color: cyan; */
}
.list__body {
  padding: 0;
  /* background-color: cornsilk; */
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
}
/* 家具項目 */
.item {
  background-color: darkcyan;
  width: 100%;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  text-align: center;
  border-radius: 15px;
}
.item:hover {
  background-color: #a8dadc;
  opacity: 0.7;
}
</style>
