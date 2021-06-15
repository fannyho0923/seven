<template>
  <main class="container mx-auto ">
    <div class="row  mx-auto">
      <div class="imgBox">
        <img
          class="img figure img-resp"
          src="../../static/imgs/memoImg/fridge.png"
          alt="bg"
          width="800"
          height="600"
        />
        <div class="commentBox mx-auto">
          <Comment
            v-for="(item, index) in commentArr"
            :key="index"
            :memoStr="commentArr[index].str"
            :memoSrc="memos[commentArr[index].id - 1].src"
            :memoDeg="memos[commentArr[index].id - 1].deg"
          />
        </div>
        <aside v-if="!isShow && !isChosed" class="set-inlineBlock btn">
          <div class="set-inlineBlock close__btn" @click="goBack">
            <label class="pointer close__lab" @click="goBack">X</label>
          </div>
          <div class="set-inlineBlock    add__memo">
            <label class="pointer add__lab" @click="popupSelection">+</label>
          </div>
        </aside>
      </div>
      <section class="base__body"></section>

      <div v-if="isShow" class="set-bg">
        <div class="popup">
          <MemoSelector
            class="popup__selectBox"
            :memoArr="memos"
            @close="closeSelectorPopup"
            @checkMemo="chooseMemo"
          />
        </div>
      </div>
      <div v-if="isChosed" class="set-bg">
        <div class="popup">
          <MemoWrite
            class="popup__writeBox"
            :memoType="memos[memoId - 1]"
            @writeDone="copyContent"
            @closeWriteBox="closeWritePopup"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import MemoSelector from "../components/MemoSelector.vue";
import MemoWrite from "../components/MemoWrite.vue";
import Comment from "../components/Comment.vue";
export default {
  data() {
    return {
      isShow: false,
      isChosed: false,
      memoId: 0,
      commentImgSrc: "",
      commentArr: [],
      memos: [
        { id: 1, src: "../../static/imgs/memoImg/post-1.png", deg: 3 },
        { id: 2, src: "../../static/imgs/memoImg/post-2.png", deg: -5 },
        { id: 3, src: "../../static/imgs/memoImg/post-3.png", deg: -3 },
        { id: 4, src: "../../static/imgs/memoImg/post-4.png", deg: 10 },
        { id: 5, src: "../../static/imgs/memoImg/post-5.png", deg: -5 },
        { id: 6, src: "../../static/imgs/memoImg/post-6.png", deg: 7 },
        { id: 7, src: "../../static/imgs/memoImg/post-7.png", deg: 4 },
        { id: 8, src: "../../static/imgs/memoImg/post-8.png", deg: -15 },
        { id: 9, src: "../../static/imgs/memoImg/post-9.png", deg: -12 },
        { id: 10, src: "../../static/imgs/memoImg/post-10.png", deg: -3 },
        { id: 11, src: "../../static/imgs/memoImg/post-11.png", deg: 7 },
        { id: 12, src: "../../static/imgs/memoImg/post-12.png", deg: 0 },
        { id: 13, src: "../../static/imgs/memoImg/post-13.png", deg: 6 }
      ]
    };
  },
  components: { MemoSelector, MemoWrite, Comment },
  methods: {
    goBack() {
      this.$router.push("/publicArea");
    },
    popupSelection() {
      this.isShow = true;
    },
    closeSelectorPopup() {
      this.isShow = false;
    },
    closeWritePopup() {
      this.isChosed = false;
    },
    chooseMemo(id) {
      this.memoId = id;
      this.isShow = false;
      this.isChosed = true;
    },
    copyContent(str, id) {
      this.commentArr.push({ str, id });
      this.closeWritePopup();
    }
  }
};
</script>

<style scoped>
.img {
  width: 110%;
}
.row {
  max-width: 800px;
  margin-top: 5rem;
}
.btn {
  position: relative;
  /* background-color: aqua; */
  right: -1%;
  top: 1%;
}
.imgBox {
  display: flex;
  margin-right: 2rem;
}
.close__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px black;

  margin-bottom: 1.5rem;
}
.close__lab {
  min-width: 60px;
  min-height: 60px;
  font-size: 2.4rem;
}
.add__lab {
  min-width: 60px;
  min-height: 60px;
  font-size: 2.5rem;
  color: white;
  background-color: black;
  border-radius: 50%;
}
.popup {
  position: absolute;
  left: 0;
  top: 0;
  /* background-color: rgb(247, 153, 12); */
  width: 80vw;
  height: 5px;
  display: flex;
  flex-direction: row;
}
.popup__selectBox {
  background-color: white;
  position: absolute;
  right: 0;
  top: 15vw;
}
.set-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  /* background-color: tomato   ; */
}
.popup__writeBox {
  position: absolute;
  right: 0;
  top: 15vw;
}
/* rwd要再修改 */
.commentBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  max-width: 766px;
  max-height: 35rem;
  width: 83%;

  height: 65vw;
  /* height: 50%; */
  /* background-color: #0b7575; */

  /* opacity: 0.5; */
  margin-top: 1.2rem;
  transform: translateX(2.5%);
  word-wrap: break-word;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: auto;
}
.commentBox::-webkit-scrollbar-thumb {
  background-color: #f10cd3;
  border-radius: 3px;
}
</style>
