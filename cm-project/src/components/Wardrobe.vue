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
          <header class="rightTit">物品風格名稱</header>
          <div>
            <Furniture :item="wallArr[count]" />
          </div>
        </aside>
        <!-- 關閉視窗按鈕 -->
        <div class=" pointer leave__btn" @click.self="leave">Ｘ</div>
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
      count: 0,
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
      ]
    };
  },
  components: { Furniture },
  methods: {
    selectFunction(switchItem) {
      console.log(switchItem);
      switch (switchItem) {
        case furnitureEnum.wall:
          console.log("I am wall");
          this.clickWall();
          break;
        // no default
      }
    },
    //關閉視窗按鈕
    leave() {
      this.$emit("leave");
    },

    clickWall() {}
  }
};
</script>

<style scoped>
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
  margin-top: 7rem;
  width: 80%;
  background-color: blue;
}
/* 關閉彈窗 */
.leave__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px black;
  width: 3.5vw;
  height: 3.5vw;
  font-size: 3.5vw;
  left: 101%;
  top: 0;
  /* background-color: rgb(43, 189, 226); */
}
/* 左邊區塊 */
.leftBox {
  width: 45%;
  height: 100%;
  background-color: burlywood;
}
/* 右邊區塊 */
.rightBox {
  width: 55%;
  height: 100%;
  background-color: chartreuse;
}
/* 左邊標題 */
.leftTit {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  font-size: 2vw;
  background-color: cornflowerblue;
}
/* 右邊標題 */
.rightTit {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  font-size: 2vw;

  background-color: rgb(237, 100, 191);
}
/* 家具清單 */
.list__base {
  margin-top: 2rem;
  background-color: cyan;
}
.list__body {
  padding: 0;
  background-color: cornsilk;
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
  /* margin: 0.5rem; */
  background-color: darkcyan;
  width: 100%;
  margin-bottom: 0.3rem;
  text-align: center;
}
.item:hover {
  opacity: 0.7;
}
</style>
