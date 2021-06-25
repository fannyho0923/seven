<template>
  <div>
    <!-- 遮罩 -->
    <div class="tvPopupWindow">
      <div class="tv__base mx-auto">
        <!-- 影片及留言容器 -->
        <section class="tv__body mx-auto">
          <!-- 影片容器 -->
          <aside class="leftBox">
            <iframe
              class="ytBox"
              width="560"
              height="480"
              :src="ytSrc"
              title="YouTube video player"
              rel="0"
              loop="1"
              iv_load_policy="3"
              frameborder="0"
              controls="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </aside>
          <!-- 影片列表及上傳容器 -->
          <aside class="rightBox">
            <!-- 影片列表容器 -->
            <div class="playlistBox" id="data-content">
              <PlayCard v-for="(item, index) in playListArr" :key="index" />
            </div>
            <!-- 上傳容器 -->
            <div class="inputBox">
              <input
                class="input"
                type="text"
                placeholder="請貼上ＹｏｕＴｕｂｅ網址"
                v-model="str"
                @keyup.enter="send"
              />
              <div class="pointer sendBtn" @click="send">+</div>
            </div>
          </aside>
          <!-- 關閉視窗按鈕 -->
          <div class="pointer leave__btn" @click.self="leave">Ｘ</div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPublicArticle,
  addPublicArticle,
  deletePublicArticle
} from "@/js/all.js";
import PlayCard from "@/components/PlayCard";
import {} from "@/js/all.js";
export default {
  data() {
    return {
      str: "",
      playListArr: [],
      ytSrc: "https://www.youtube.com/embed/FLGCGc7sAUw"
    };
  },
  components: {
    PlayCard
  },
  create() {},
  updated() {
    this.$nextTick(function() {
      var div = document.getElementById("data-content");
      div.scrollTop = div.scrollHeight;
    });
  },
  methods: {
    //   關閉視窗
    leave() {
      this.$emit("leave");
    },
    // 上傳影片
    send() {
      if (!this.str) {
        return;
      }
      this.playListArr.push(this.str);
      this.str = "";
    }
  }
};
</script>

<style scoped>
/* 彈跳視窗遮影 */
.tvPopupWindow {
  z-index: 6;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 50vw;
  background-color: rgba(8, 8, 8, 0.377);
}
.tv__base {
  width: 85vw;
  margin-top: 12rem;
  height: 30rem;
  background-color: cyan;
}
.tv__body {
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 100%;
  max-height: 30rem;
  background-color: darkgoldenrod;
}
.leftBox {
  position: relative;
  background-color: darkcyan;
  width: 60%;
}
/* yt容器 */
.ytBox {
  width: 100%;
  vertical-align: bottom;
}
/* 影片列表及上傳容器 */
.rightBox {
  padding: 0.5rem;
  position: relative;
  background-color: rgb(0, 32, 139);
  width: 38%;
}
/* 影片列表容器 */
.playlistBox {
  width: 100%;
  height: 90%;
  padding: 0.5rem;
  background-color: darksalmon;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: auto;
  flex-wrap: wrap;
  word-wrap: break-word;
}
/* 上傳容器 */
.inputBox {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 10%;
  background-color: darkkhaki;
}
/* 上傳處 */
.input {
  width: 89%;
}
/* 上傳鈕 */
.sendBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 45px;
  height: 45px;
  font-size: 2rem;
  border: solid 1px black;
}
/* 上傳鈕 */
.sendBtn:hover {
  opacity: 0.5;
}
/* 離開按鈕 */
.leave__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px black;
  /* max-width: 5rem; */
  width: 3.5vw;
  height: 3.5vw;
  font-size: 3.5vw;
  left: 101%;
  top: 0;
  /* background-color: rgb(43, 189, 226); */
}
</style>
