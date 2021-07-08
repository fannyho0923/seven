<template>
  <main class=" blog__bg">
    <!-- 放文章主要區域 -->
    <section class="blog__body mx-auto">
      <div class="blogBox">
        <div class="articleBox mx-auto">
          <Article
            v-for="(item, index) in articleArr"
            :key="item.postSeriel"
            :arr="articleArr[index]"
            @see="look(index)"
          />
        </div>
        <!-- 關閉視窗按鈕 -->
        <div
          v-if="!isWrite && !isLook"
          class="pointer leave__btn"
          @click="leave"
        >
          <img
            class="closeIcon"
            src="../../static/imgs/closeIcon.png"
            alt="closeIcon"
            width="252"
            height="252"
            @click="leave"
          />
        </div>
        <!-- 新增文章按鈕 -->
        <i
          v-show="isOwner"
          v-if="!isWrite && !isLook"
          class="pointer add__btn fas fa-edit"
          @click="isWrite = true"
        ></i>
      </div>
    </section>
    <!-- 編輯文章彈窗 -->
    <div v-if="isWrite">
      <ArticleWrite @close="closeWriteBox" @post="alreadyPost" />
    </div>
    <!-- 預覽或留言彈窗 -->
    <div v-if="isLook">
      <ArticleContent
        v-if="isLook"
        :arr="articleArr[id]"
        @closeSeeBox="closeLookBox"
        @deleteArticle="deletEessay(articleArr[id].postSeriel)"
        @edit="editArticle"
      />
    </div>
  </main>
</template>

<script>
import {
  getRoomInfo,
  getPrivateArticle,
  deletePrivateArticle
} from "@/js/all.js";
import Article from "@/components/Article.vue";
import ArticleWrite from "@/components/ArticleWrite.vue";
import ArticleContent from "@/components/ArticleContent.vue";
export default {
  data() {
    return {
      id: -1,
      roomId: 0,
      isWrite: false,
      isLook: false,
      isOwner: false,
      articleArr: []
    };
  },
  components: {
    Article,
    ArticleWrite,
    ArticleContent
  },
  created() {
    this.roomId = this.$route.query.id;
    if (this.roomId < 1 || this.roomId > 7) {
      this.$router.push({ path: "/publicArea" });
    }
    // 取得房間資訊
    getRoomInfo(this.roomId, this.$store.getters.userSeriel)
      .then(res1 => {
        // console.log(res1.data.isOwner);
        this.isOwner = res1.data.isOwner;
      })
      .catch(error => console.log(error));
    const data = {
      memberDoorIndex: this.roomId
    };
    //取得文章
    getPrivateArticle(this.$store.getters.userSeriel, data)
      .then(res2 => {
        // console.log(res2);
        this.articleArr = res2.data.postInfos;
      })
      .catch(error => console.log(error));
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
      const id = this.roomId;
      this.$store.commit("Enter", id);
      this.$router.push({ name: "Room", query: { id } });
    },
    // 點擊預覽留言
    look(id) {
      this.isLook = true;
      this.id = id;
    },
    // 文章新增
    alreadyPost(data) {
      this.articleArr.unshift(data);
      this.closeWriteBox();
    },
    // 刪除文章
    deletEessay(postSeriel) {
      deletePrivateArticle(postSeriel)
        .then(res3 => {
          this.closeLookBox();
          this.articleArr.splice(this.id, 1);
        })
        .catch(error => console.log(error));
    },
    // 文章編輯過後的重新更新
    editArticle() {
      const data = {
        memberDoorIndex: this.roomId
      };
      //取得文章
      getPrivateArticle(this.$store.getters.userSeriel, data)
        .then(res2 => {
          // console.log(res2);
          this.articleArr = res2.data.postInfos;
        })
        .catch(error => console.log(error));
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
  width: 80%;
  height: 40rem;
  margin-top: 5.5vw;
  /* background-color: aqua; */
}
.blogBox {
  position: relative;
  display: flex;
  max-width: 100%;
  width: 100%;
  max-width: 1344px;
  height: 90%;
  border-radius: 15px;
  /* background-color: bisque; */
  background-color: #9d8189;
}

/* 撰寫文章 */
.add__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 5vw;
  max-width: 93px;
  max-height: 93px;
  min-width: 50px;
  min-height: 50px;
  font-size: 4rem;
  left: 104%;
  top: 20%;
  color: #ff006ff0;
}
.add__btn:hover {
  opacity: 0.5;
  color: #f74994f0;
}
/* 放文章區域 */
.articleBox {
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 95%;
  overflow-x: hidden;
  overflow-y: auto;
  flex-wrap: wrap;
  word-wrap: break-word;
  padding: 0 0.5rem;
}
/*隐藏滚轮*/
/* .commentBox::-webkit-scrollbar {
  display: none;
} */
/* 捲軸底色 */
.articleBox::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ffc0cb;
}
/* 捲軸寬度 */
.articleBox::-webkit-scrollbar {
  width: 6px;
  background-color: black;
}
/* 捲軸本體顏色 */
.articleBox::-webkit-scrollbar-thumb {
  background-color: #bb6573;
}
/* 離開按鈕 */
.leave__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 5vw;
  max-width: 93px;
  max-height: 93px;
  min-width: 50px;
  min-height: 50px;
  left: 103%;
  top: 0;
}
/* 離開按鈕照片 */
.closeIcon {
  width: 100%;
  height: auto;
}
.closeIcon:hover {
  opacity: 0.5;
}
</style>
