<template>
  <main class=" blog__bg">
    <!-- <div class="bgBox">
      <img
        class="bgImg img-resp"
        src="../../static/imgs/room/blogBg.jpeg"
        alt="bgPic"
        width="1000"
        height="718"
      />
    </div> -->
    <!-- 標題 -->
    <header class="blog__head text-center">
      <h1 class="set-inlineBlock">Blog</h1>
    </header>
    <!-- 放文章主要區域 -->
    <section class="blog__body mx-auto">
      <div class="blogBox">
        <div class="articleBox mx-auto">
          <Article
            v-for="(item, index) in articleArr"
            :key="index"
            @see="look(index)"
          />
        </div>
        <!-- 左邊按鈕 -->
        <!-- <div class="pointer leftBox set-inlineBlock"></div> -->
        <!-- 右邊按鈕 -->
        <!-- <div class="pointer rightBox set-inlineBlock"></div> -->
        <!-- 關閉視窗按鈕 -->
        <div
          v-if="!isWrite && !isLook"
          class="pointer leave__btn"
          @click="leave"
        >
          Ｘ
        </div>
        <!-- 新增文章按鈕 -->
        <div
          v-if="!isWrite && !isLook"
          class="pointer add__btn"
          @click="isWrite = true"
        >
          ＋
        </div>
      </div>
    </section>
    <!-- 編輯文章彈窗 -->
    <div v-if="isWrite">
      <ArticleWrite @close="closeWriteBox" />
    </div>
    <!-- 預覽或留言彈窗 -->
    <div v-if="isLook">
      <ArticleComment
        v-if="isLook"
        :arr="articleArr[this.id]"
        @closeSeeBox="closeLookBox"
      />
    </div>
  </main>
</template>

<script>
import Article from "@/components/Article.vue";
import ArticleWrite from "@/components/ArticleWrite.vue";
import ArticleComment from "@/components/ArticleComment.vue";
export default {
  data() {
    return {
      isWrite: false,
      isLook: false,
      articleArr: [
        {
          src: "../../static/test.jpg",
          str: "my name is tony",
          img: "../../static/test.jpg",
          name: "tony"
        },
        {
          src: "../../static/test.jpg",
          str: "my name is cody",
          img: "",
          name: "cody"
        },
        {
          src: "../../static/test.jpg",
          str: "my name is cake",
          img: "../../static/test.jpg",
          name: "cake"
        },
        {
          src: "../../static/test.jpg",
          str: "my name is fanny",
          img: "",
          name: "fanny"
        },
        {
          src: "../../static/test.jpg",
          str: "my name is ann",
          img: "../../static/test.jpg",
          name: "ann"
        }
      ]
    };
  },
  components: {
    Article,
    ArticleWrite,
    ArticleComment
  },
  methods: {
    // 離開編輯狀態
    closeWriteBox() {
      this.isWrite = false;
    },
    // 離開預覽狀態
    closeLookBox() {
      this.isLook = false;
    },
    // 離開本頁
    leave() {
      this.$router.push("/room");
    },
    // 點擊預覽留言
    look(id) {
      this.isLook = true;
      this.id = id;
    }
  }
};
</script>

<style scoped>
/* 背景照片 */
.bgImg {
  width: 100%;
  max-height: 100vh;
}
/* 標頭 */
.blog__head {
  margin-top: 3rem;
}
/* 文章主要畫面 */
.blog__body {
  position: relative;
  display: flex;
  align-items: center;
  width: 70%;
  height: 40rem;
  /* background-color: aqua; */
}
.blogBox {
  display: flex;
  max-width: 100%;
  width: 100%;
  height: 90%;
  border-radius: 15px;
  background-color: bisque;
}
/* 左右按鍵 */
/* .leftBox {
  position: absolute;
  left: -50px;
  top: 50%;
  transform: translateY(-2.5rem);
  border: 3rem solid;
  border-color: transparent #fbb034 transparent transparent;
}
.rightBox {
  position: absolute;
  right: -50px;
  top: 50%;
  transform: translateY(-2.5rem);
  width: 0;
  height: 0;
  border: 3rem solid;
  border-color: transparent transparent transparent #fbb034;
} */

/* 離開按鈕 */
.leave__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px black;
  max-width: 5rem;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 4rem;
  left: 103%;
  top: 5%;
  background-color: rgb(43, 189, 226);
}
/* 撰寫文章 */
.add__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px black;
  max-width: 5rem;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 4rem;
  left: 103%;
  top: 20%;
  background-color: rgb(247, 189, 244);
}
/* 放文章區域 */
.articleBox {
  display: flex;
  justify-content: space-around;
  /* background-color: rgb(226, 43, 186); */
  position: relative;
  width: 95%;
  overflow-x: hidden;
  overflow-y: auto;
  flex-wrap: wrap;
  word-wrap: break-word;
}
</style>
