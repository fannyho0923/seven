<template>
  <main class="bg">
    <div class="row">
      <div class="base__body mx-auto">
        <!-- 左邊照片 -->
        <aside v-show="arr.postImg" class="left__area">
          <img
            class="img img-resp"
            :src="arr.postImg"
            alt="testPic"
            width="200"
            height="200"
          />
        </aside>
        <!-- 右邊文章以及留言 -->
        <aside class="right__area">
          <!-- 文章區 -->
          <div class="articleBox">
            <!-- 發文者資訊 -->
            <div class="posterInfoBox">
              <!-- 發文者頭像 -->
              <aside class="posterAvatarBox">
                <img
                  class="posterImg img-resp "
                  :src="
                    'http://35.201.237.18/img/avatar_' +
                      arr.posterRoleId +
                      '.png'
                  "
                  alt="memberPic"
                  width="200"
                  height="200"
                />
                <!-- 垃圾桶 -->
                <div v-if="isOwner" class="trash__btn" @click="deleteArticle">
                  <img
                    class="pointer"
                    src="../../static/imgs/memoImg/mini_trash.png"
                    alt="mini_trash"
                    width="20"
                    height="20"
                  />
                </div>
              </aside>
              <!-- 發文者名字與發文時間 -->
              <aside class="master__info">
                <p class="poster__name">{{ arr.posterNickName }}</p>
                <p class="post__date">{{ arr.postTime }}</p>
              </aside>
            </div>
            <p class="article">
              {{ arr.postText }}
            </p>
          </div>
          <!-- 留言區 -->
          <main class="commentBox" id="data-content">
            <ArticleComment
              v-for="(item, index) in commentArr"
              :key="index"
              :data="commentArr[index]"
              @deleteTheComment="
                deleteAComment(commentArr[index].commentSeriel, index)
              "
            />
          </main>
          <!-- 輸入框 -->
          <label class="lab__input">
            <input
              class="input"
              type="text"
              v-model="str"
              @keyup.enter="send"
            />
          </label>
        </aside>
        <!-- 關閉視窗按鈕 -->
        <div class="pointer leave__btn" @click="leave">Ｘ</div>
      </div>
    </div>
  </main>
</template>

<script>
import { getComment, addComment, deleteComment, getRoomInfo } from "@/js/all";
import ArticleComment from "@/components/ArticleComment.vue";
export default {
  props: {
    arr: {
      type: Object
    }
  },
  data() {
    return {
      str: "",
      commentArr: {},
      isUpdate: false,
      isOwner: false,
      roomId: 0,
      roleID: ""
    };
  },
  components: {
    ArticleComment
  },
  updated() {
    // if (this.isUpdate) {
    //   this.$nextTick(function() {
    //     var div = document.getElementById("data-content");
    //     div.scrollTop = div.scrollHeight;
    //   });
    // }
  },
  created() {
    // 查看留言
    getComment(this.arr.postSeriel, this.$store.getters.userSeriel)
      .then(res1 => {
        // console.log(res1);
        this.commentArr = res1.data.commentInfos;
      })
      .catch(error => console.log(error));
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
  },
  methods: {
    // 關閉彈窗
    leave() {
      this.$emit("closeSeeBox");
    },
    // 傳送留言
    send() {
      if (!this.str) {
        return;
      }
      const commentData = {
        postSeriel: this.arr.postSeriel,
        userSeriel: this.$store.getters.userSeriel,
        commentTxt: this.str
      };
      // console.log(commentData);
      addComment(commentData)
        .then(res2 => {
          if (res2.data.result) {
            // 查看留言
            getComment(this.arr.postSeriel, this.$store.getters.userSeriel)
              .then(res1 => {
                // console.log(res1);
                this.commentArr = res1.data.commentInfos;
              })
              .catch(error => console.log(error));
          }
        })
        .catch(error => console.log(error));
      this.str = "";
      this.isUpdate = true;
    },
    // 刪除文章
    deleteArticle() {
      this.$emit("deleteArticle");
    },
    // 刪除留言
    deleteAComment(commentSeriel, index) {
      deleteComment(commentSeriel)
        .then(res3 => console.log(res3.data))
        .catch(error => console.log(error));
      this.commentArr.splice(index, 1);
      this.isUpdate = false;
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
/* 背景遮罩 */
.bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  /* background-color: rgba(95, 158, 160, 0.488); */
}
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
  top: 0;
  background-color: rgb(43, 189, 226);
}
/* 預覽留言框 */
.base__body {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 7.5rem;
  width: 70%;
  height: 36.5rem;
  background-color: rgb(252, 240, 172);
  padding: 2rem;
  border-radius: 15px;
  background-image: url("../../static/imgs/room/flowerBg.png");
  background-size: cover;
}
/* 左邊照片區 */
.left__area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 47%;
  height: 100%;
  background-color: #d7e3fcba;
}
/* 照片 */
.img {
  max-width: 100%;
  max-height: 100%;
}
/* 右邊文章和留言區 */
.right__area {
  position: relative;
  width: 47%;
  height: 100%;
  /* background-color: rgb(226, 43, 165); */
}
/* 文字區 */
.articleBox {
  width: 100%;
  height: 50%;
  background-color: #edf2fb;
  overflow-x: hidden;
  overflow-y: auto;
  flex-wrap: wrap;
  word-wrap: break-word;
}
/* 留言區 */
.commentBox {
  /* background-image: url("../../static/imgs/room/flowerBg.png"); */
  /* background-size: cover; */
  width: 100%;
  height: 42%;
  background-color: #abc4ff;
  overflow-x: hidden;
  overflow-y: auto;
  flex-wrap: wrap;
  word-wrap: break-word;
  padding-top: 0.5rem;
}
/* 文章 */
.article {
  padding: 1rem;
  margin: 0;
}
/* 留言 */
.comment {
  margin: 0;
}

/* 右邊輸入框標籤 */
.lab__input {
  position: absolute;
  /* left: 40%;
  top: 90%; */
  width: 100%;
  height: 6.5%;
  background-color: steelblue;
}
/* 輸入input標籤 */
.input {
  max-height: 100%;
  width: 90%;
  height: 83%;
  font-size: 2vw;
  /* background-color: transparent; */
  /* border: transparent; */
}
/* 發文者資訊 */
.posterInfoBox {
  display: flex;
  align-items: center;
  background-color: #b8b8ff;
}
/* 發文者頭像框 */
.posterAvatarBox {
  overflow: hidden;
  width: 3.5vw;
  height: 3.5vw;
  min-width: 40px;
  min-height: 40px;
  margin: 0.5rem;
  background-color: rgb(241, 127, 127);
  border-radius: 50%;
}
/* 發文者名字 */
.poster__name {
  font-size: 1.6rem;
  margin: 0;
}
.post__date {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
}
/* 垃圾桶按鈕 */
.trash__btn {
  visibility: visible;
  position: absolute;
  left: 101%;
  top: -3%;
  /* background-color: cyan; */
}
.trash__btn:hover {
  opacity: 0.5;
}
</style>
