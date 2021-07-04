<template>
  <main class="bg">
    <div class="row">
      <div class="base__body mx-auto">
        <!-- 左邊照片 -->
        <aside v-show="arr.postImg" class="left__area">
          <img
            class="photoImg img-resp"
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
              </aside>
              <!-- 發文者名字與發文時間 -->
              <aside class="master__info">
                <p class="poster__name">{{ arr.posterNickName }}</p>
                <p class="post__date">{{ arr.postTime }}</p>
              </aside>
              <i
                v-if="isOwner"
                class="ellipsis pointer fas fa-ellipsis-v"
                @click.self="useTool"
              ></i>
              <nav v-if="isOwner && isTool" class="nav">
                <ul class="ul">
                  <!-- 編輯文章按鈕 -->
                  <li class="pointer li" @click="edit">
                    編輯文章<i class="icon far fa-edit"> </i>
                  </li>
                  <!-- 刪除文章按鈕 -->
                  <li class="pointer li" @click="deleteArticle">
                    刪除文章<i class="icon far fa-trash-alt"></i>
                  </li>
                </ul>
              </nav>
            </div>
            <textarea
              v-if="!isEdit"
              v-model="content"
              class="article mx-auto"
              readonly
            >
            </textarea>
            <textarea
              v-if="isEdit"
              v-model="content"
              class="editArticle mx-auto"
            >
            </textarea>
            <!-- 送出編輯文字 -->
            <div v-if="isEdit" class="postBtn pointer" @click="post">儲存</div>
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
            <i class="plane pointer far fa-paper-plane" @click="send"></i>
          </label>
        </aside>
        <!-- 關閉視窗按鈕 -->
        <div class="pointer leave__btn" @click="leave">
          <img
            class="closeIcon"
            src="../../static/imgs/closeIcon.png"
            alt="closeIcon"
            width="252"
            height="252"
            @click="leave"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {
  getComment,
  addComment,
  deleteComment,
  getRoomInfo,
  editArticle
} from "@/js/all";
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
      roleID: "",
      content: this.arr.postText,
      isTool: false,
      isEdit: false
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
    // 編輯文章
    edit() {
      this.isEdit = true;
      this.isTool = false;
    },
    // 編輯完送出
    post() {
      this.isEdit = false;
      if (!this.content) {
        return;
      }
      // 打api編輯文章
      const articleData = {
        postSeriel: this.arr.postSeriel,
        postText: this.content
      };
      // 編輯文章
      editArticle(articleData)
        .then(res1 => {
          console.log(res1);
          this.$emit("edit");
        })
        .catch(error => console.log(error));
    },
    // 顯示或關閉編輯和刪除按鈕
    useTool() {
      if (this.isTool) {
        this.isTool = false;
      } else {
        this.isTool = true;
      }
    },
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
  width: 5vw;
  height: 5vw;
  min-width: 50px;
  min-height: 50px;
  left: 103%;
  top: 0;
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

/* 預覽留言框 */
.base__body {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 7.5rem;
  width: 70%;
  height: 36.5rem;
  /* background-color: rgb(252, 240, 172); */
  background-color: #f0efeb;
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
.photoImg {
  max-width: 90%;
  min-width: 70%;
  max-height: 100%;
  object-fit: contain;
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
/* 純看文章 */
.article {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  background-color: transparent;
  width: 95%;
  height: 66%;
  resize: none;
  border-color: transparent;
  font-size: 1.5vw;
  line-height: 1.5rem;
  outline: none;
  color: #6930c3;
}
/* 編輯文章 */
.editArticle {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  background-color: transparent;
  width: 95%;
  height: 60%;
  resize: none;
  border-color: transparent;
  font-size: 1.5vw;
  line-height: 1.5rem;
  color: #6930c3;
}
/* 編輯送出文章 */
.postBtn {
  position: absolute;
  padding: 0.2rem;
  display: flex;
  width: fit-content;
  left: 89%;
  top: 45%;
  background-color: #8f8df3;
  justify-content: center;
  border-radius: 5px;
  align-items: center;
}
.postBtn:hover {
  opacity: 0.5;
}
/* 留言 */
.comment {
  margin: 0;
}

/* 右邊輸入框標籤 */
.lab__input {
  display: flex;
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
  margin-right: 0.4rem;
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

/* 飛機按鍵 */
.plane {
  font-size: 2rem;
}
.plane:hover {
  opacity: 0.5;
}
/* 編輯刪除按鈕 */
.ellipsis {
  width: 1.2vw;
  height: 1.2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 95%;
}
.ellipsis:hover {
  opacity: 0.5;
}
.nav {
  position: absolute;
  left: 80%;
  top: 9%;
  background-color: rgba(156, 151, 151, 0.849);
  border-radius: 5px;
}
.ul {
  list-style: none;
  width: max-content;
  padding: 0;
  margin: 0.5rem;
  /* text-align: left; */
  /* display: flex; */
  /* justify-content: left; */
}
.li {
  margin-bottom: 0.5rem;
}
.li:hover {
  color: rgba(255, 255, 255, 0.788);
}
.icon {
  margin-left: 0.2rem;
}
</style>
