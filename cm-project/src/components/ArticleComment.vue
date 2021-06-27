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
                  src="../../static/test.jpg"
                  alt="memberPic"
                  width="200"
                  height="200"
                />
                <!-- 垃圾桶 -->
                <div class="trash__btn" @click="deleteArticle">
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
            <div
              class="comment__body"
              v-for="(item, index) in commentArr"
              :key="index"
            >
              <!-- 頭像 -->
              <aside class="avatarBox">
                <img
                  class="avatarImg img-resp "
                  src="../../static/test.jpg"
                  alt="memberPic"
                  width="200"
                  height="200"
                />
              </aside>
              <!-- 留言內容 -->
              <aside class="sentenceBox">
                <div
                  class="sentence"
                  @mouseenter="showCommentTrash = true"
                  @mouseleave="showCommentTrash = false"
                >
                  <p class="commenter">
                    {{ commentArr[index].commentUserNickName }}
                  </p>
                  <p class="commentTxt">{{ commentArr[index].commentTxt }}</p>
                  <!-- 垃圾桶 -->
                  <div
                    v-if="showCommentTrash"
                    class="comment__trash"
                    @click="
                      deleteTheComment(commentArr[index].commentSeriel, index)
                    "
                  >
                    <img
                      class="pointer"
                      src="../../static/imgs/memoImg/mini_trash.png"
                      alt="mini_trash"
                      width="20"
                      height="20"
                    />
                  </div>
                </div>
              </aside>
            </div>
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
//查看留言
// export const getComment = (postSeriel, userSeriel) => {
//   return req("get", `/Comment/${postSeriel}/${userSeriel}`);
// };
//新增留言
// export const addComment = data => {
//   return req("post", "/Comment/", data);
// };
//刪除留言
// export const deleteComment = commentSeriel => {
//   return req("patch", `/Comment/Delete/${commentSeriel}`);
// };
import { getComment, addComment, deleteComment } from "@/js/all";
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
      showCommentTrash: false
      // arrTest: [
      //   { src: "../../static/test.jpg", str: "my name is fanny" },
      //   { src: "../../static/test.jpg", str: "my name is tony" },
      //   { src: "../../static/test.jpg", str: "my name is cody" },
      //   { src: "../../static/test.jpg", str: "my name is cake" }
      // ]
    };
  },
  updated() {
    if (this.isUpdate) {
      this.$nextTick(function() {
        var div = document.getElementById("data-content");
        div.scrollTop = div.scrollHeight;
      });
    }
  },
  created() {
    // 查看留言
    getComment(this.arr.postSeriel, this.$store.getters.userSeriel).then(
      res1 => {
        // console.log(res1);
        this.commentArr = res1.data.commentInfos;
      }
    );
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
      addComment(commentData).then(res2 => {
        if (res2.data.result) {
          // 查看留言
          getComment(this.arr.postSeriel, this.$store.getters.userSeriel).then(
            res1 => {
              // console.log(res1);
              this.commentArr = res1.data.commentInfos;
            }
          );
        }
      });
      this.str = "";
      this.isUpdate = true;
    },
    // 刪除文章
    deleteArticle() {
      this.$emit("deleteArticle");
    },
    // 刪除留言
    deleteTheComment(commentSeriel, index) {
      deleteComment(commentSeriel).then(res3 => console.log(res3.data));
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
  margin-top: 10rem;
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
  background-color: blueviolet;
}
/* 照片 */
.img {
  max-width: 100%;
  max-height: 100%;
}
/* 右邊文章和留言區 */
.right__area {
  width: 47%;
  height: 100%;
  background-color: rgb(226, 43, 165);
}
/* 文字區 */
.articleBox {
  width: 100%;
  height: 50%;
  background-color: burlywood;
  overflow-x: hidden;
  overflow-y: auto;
  flex-wrap: wrap;
  word-wrap: break-word;
}
/* 留言區 */
.commentBox {
  background-image: url("../../static/imgs/room/flowerBg.png");
  background-size: cover;
  width: 100%;
  height: 42%;
  background-color: rgb(166, 252, 255);
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
/* 頭像和留言容器 */
.comment__body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* background-color: rgb(147, 180, 70); */
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  /* border: solid 0.1px black; */
  margin-bottom: 0.3rem;
}

/* 頭像框 */
.avatarBox {
  width: 3.6vw;
  height: 3.2vw;
  border: solid 1px red;
  background-color: red;
  border-radius: 50%;
  overflow: hidden;
}
/* 頭像照片 */
.avatarImg {
  max-width: 100%;
  max-height: 100%;
}
/* 顯示的留言框 */
.sentenceBox {
  width: 80%;
  /* border: solid 1px; */
  /* background-color: rgb(228, 67, 8); */
  padding: 0;
}
/* 顯示的留言 */
.sentence {
  /* width: 55%;
  max-height: 3vw;
  height: 2.5vw;
  border: solid 1px;
  display: flex;
  justify-content: center;
  align-items: center; */
  position: relative;
  width: fit-content;
  font-size: 1.3vw;
  background-color: darksalmon;
  border: solid 1px black;
  border-radius: 10px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

/* 右邊輸入框標籤 */
.lab__input {
  /* position: absolute; */
  /* left: 40%;
  top: 90%; */
  width: 100%;
  height: 8%;
  background-color: steelblue;
}
/* 輸入input標籤 */
.input {
  max-height: 100%;
  width: 90%;
  height: 100%;
  font-size: 2vw;
  /* background-color: transparent; */
  /* border: transparent; */
}
/* 發文者資訊 */
.posterInfoBox {
  display: flex;
  align-items: center;
  background-color: brown;
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
  left: 92%;
  top: 5%;
  background-color: cyan;
}
.trash__btn:hover {
  opacity: 0.5;
}
/* 刪除留言 */
.comment__trash {
  visibility: visible;
  position: absolute;
  left: 91%;
  top: -32%;
}
.comment__trash:hover {
  opacity: 0.5;
}
/* 留言者名字 */
.commenter {
  margin: 0;
  padding: 0;
  font-size: 0.7vw;
  /* background-color: blanchedalmond; */
}
.commentTxt {
  margin-top: 0;
  padding-top: 0;
}
</style>
