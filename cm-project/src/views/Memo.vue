<template>
  <main class=" mx-auto ">
    <div class="row  mx-auto">
      <div class="imgBox">
        <img
          class="img figure img-resp"
          src="@/assets/imgs/memoImg/fridge.png"
          alt="bg"
          width="800"
          height="600"
        />
        <!-- 便條顯示區塊 -->
        <div class="commentBox mx-auto" v-if="commentArr.length">
          <!-- 便條 -->
          <Comment
            v-for="(item, index) in commentArr"
            :key="index"
            :memoStr="commentArr[index].postText"
            :memoSrc="memos[commentArr[index].posterType - 1].src"
            :memoDeg="memos[commentArr[index].posterType - 1].deg"
            :memoIndex="index"
            @deleteMemo="delete_Memo(commentArr[index].postSeriel, index)"
          />
        </div>
        <!-- 離開本頁和新增留言按鈕 -->
        <aside v-if="!isShow && !isChosed" class="btn">
          <!-- 離開本頁按鈕 -->
          <i class="close__btn fas fa-window-close pointer" @click="goBack"></i>
          <!-- 新增便條按鈕 -->
          <i
            class="add__lab fas fa-plus-circle pointer"
            @click="popupSelection"
          ></i>
        </aside>
      </div>
      <div v-if="isShow" class="set-bg">
        <!-- 選擇便條樣式彈窗 -->
        <div class="popup">
          <MemoSelector
            class="popup__selectBox"
            :memoArr="memos"
            @close="closeSelectorPopup"
            @checkMemo="chooseMemo"
          />
        </div>
      </div>
      <!-- 已選擇完便條會自動跳出 -->
      <div v-if="isChosed" class="set-bg">
        <!-- 撰寫便條彈窗 -->
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
import {
  getPublicArticle,
  addPublicArticle,
  deletePublicArticle
} from "@/js/all.js";
import MemoSelector from "../components/MemoSelector.vue";
import MemoWrite from "../components/MemoWrite.vue";
import Comment from "../components/Comment.vue";
export default {
  data() {
    return {
      isShow: false,
      isChosed: false,
      memoId: 1,
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
  created() {
    // 打api查看看板
    getPublicArticle(this.$store.getters.userSeriel)
      .then(res1 => {
        this.commentArr = res1.data.postInfos;
      })
      .catch(error => console.log(error));
  },
  components: { MemoSelector, MemoWrite, Comment },
  methods: {
    //回到交誼廳
    goBack() {
      this.$router.push("/publicArea");
    },
    //打開選擇便條的彈跳視窗
    popupSelection() {
      this.isShow = true;
    },
    //關掉選擇便條的彈跳視窗
    closeSelectorPopup() {
      this.isShow = false;
    },
    //關掉編輯便條的彈跳視窗
    closeWritePopup() {
      this.isChosed = false;
    },
    //選擇便條樣式
    chooseMemo(id) {
      this.memoId = id;
      this.isShow = false;
      this.isChosed = true;
    },
    //將使用者輸入的內容儲存到陣列
    copyContent(str, id) {
      if (!str || !id) {
        return;
      }
      const addMemoData = {
        userSeriel: this.$store.getters.userSeriel,
        boardType: 1,
        posterType: id,
        postText: str
      };
      // 打api:新增文章
      addPublicArticle(addMemoData)
        .then(res2 => {
          if (res2.data.result) {
            // 打api查看看板
            getPublicArticle(this.$store.getters.userSeriel)
              .then(res1 => {
                this.commentArr = res1.data.postInfos;
              })
              .catch(error => console.log(error));
          }
        })
        .catch(error => console.log(error));
      this.closeWritePopup();
    },
    //刪除便條功能
    delete_Memo(postSeriel, index) {
      // console.log(postSeriel);
      deletePublicArticle(postSeriel)
        .then(res3 => {
          // console.log(res3);
          if (res3.data.result) {
            this.commentArr.splice(index, 1);
          }
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
.row {
  max-width: 800px;
  margin-top: 5rem;
}
/* 冰箱照片 */
.img {
  width: 100%;
}
/* 回到交誼廳按鈕以及新稱便條按鈕的容器 */
.btn {
  position: relative;
  left: 5%;
  min-width: 65px;
}
/* 冰箱照片容器 */
.imgBox {
  display: flex;
  margin-right: 2rem;
}
/* 回到交誼廳按鈕*/
.close__btn {
  position: absolute;
  font-size: 4rem;
  color: #bb6573;
}
.close__btn:hover {
  opacity: 0.5;
}
/* 新增便條內容的容器 */
.add__lab {
  position: absolute;
  top: 19%;
  font-size: 4rem;
  color: #f783ac;
}
.add__lab:hover {
  opacity: 0.5;
}
/* 彈跳視窗 */
.popup {
  position: absolute;
  left: 0;
  top: 0;
  width: 80vw;
  height: 5px;
  display: flex;
  flex-direction: row;
}
/* 選擇便條的彈跳視窗 */
.popup__selectBox {
  background-color: white;
  position: absolute;
  right: 0;
  top: 15vw;
}
/* 設定彈跳視窗背景不要按到父層 */
.set-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
/* 編輯便條的彈跳視窗  */
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
  margin-top: 1.2rem;
  transform: translateX(2.5%);
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  /* text-overflow: ellipsis; */
}
/*隐藏滚轮*/
/* .commentBox::-webkit-scrollbar {
  display: none;
} */
/* 捲軸底色 */
.commentBox::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ffc0cb;
}
/* 捲軸寬度 */
.commentBox::-webkit-scrollbar {
  width: 6px;
  background-color: black;
}
/* 捲軸本體顏色 */
.commentBox::-webkit-scrollbar-thumb {
  background-color: #bb6573;
}
</style>
