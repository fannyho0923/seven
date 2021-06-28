<template>
  <div>
    <div
      class="comment__body"
      @mouseenter="showCommentTrash = true"
      @mouseleave="showCommentTrash = false"
    >
      <!-- 頭像 -->
      <aside class="avatarBox">
        <img
          class="avatarImg img-resp "
          :src="
            'http://35.201.237.18/img/avatar_' + data.commentUserRoleId + '.png'
          "
          alt="memberPic"
          width="200"
          height="200"
        />
      </aside>
      <!-- 留言容器 -->
      <aside
        class="sentenceBox"
        @mouseenter="showCommentTrash = true"
        @mouseleave="showCommentTrash = false"
      >
        <div class="sentence">
          <!-- 留言者名稱 -->
          <p class="commenter">
            {{ data.commentUserNickName }}
          </p>
          <!-- 留言內容 -->
          <p class="commentTxt">{{ data.commentTxt }}</p>
          <!-- 垃圾桶 -->
          <div
            v-if="showCommentTrash && isOwner"
            class="comment__trash"
            @mouseenter="showCommentTrash = true"
            @mouseleave="showCommentTrash = false"
            @click="deleteTheComment"
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
  </div>
</template>

<script>
import { getRoomInfo } from "@/js/all";

export default {
  data() {
    return {
      showCommentTrash: false,
      isOwner: false,
      roomId: 0
    };
  },
  props: {
    data: {
      type: Object
    }
  },
  created() {
    this.roomId = this.$route.query.id;
    if (this.roomId < 1 || this.roomId > 7) {
      this.$router.push({ path: "/publicArea" });
    }
    // 取得房間資訊
    getRoomInfo(this.roomId, this.$store.getters.userSeriel).then(res1 => {
      this.isOwner = res1.data.isOwner;
    });
  },
  methods: {
    //   刪除留言
    deleteTheComment() {
      this.$emit("deleteTheComment");
    }
  }
};
</script>

<style scoped>
/* 顯示的留言框 */
.sentenceBox {
  width: 80%;
  padding: 0;
}
/* 顯示的留言 */
.sentence {
  position: relative;
  width: fit-content;
  font-size: 1.3vw;
  background-color: darksalmon;
  border: solid 1px black;
  border-radius: 10px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
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
  height: 3.6vw;
  /* border: solid 1px red;
  background-color: red; */
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 5px;
}
/* 頭像照片 */
.avatarImg {
  max-width: 100%;
  max-height: 100%;
}
/* 留言者名字 */
.commenter {
  margin: 0;
  padding: 0;
  font-size: 0.7vw;
  /* background-color: blanchedalmond; */
}
/* 留言內容 */
.commentTxt {
  margin-top: 0;
  padding-top: 0;
  margin-bottom: 0;
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
</style>
