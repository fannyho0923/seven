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
              <PlayCard
                class="pointer"
                v-for="(item, index) in playlistArr"
                :key="index"
                :playlist="playlistArr[index]"
                @change="changeYT(playlistArr[index].postYT)"
                @deleteVedio="deleteYT(playlistArr[index].postSeriel, index)"
              />
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
              <i
                class="sendBtn pointer fas fa-caret-square-right"
                @click="send"
              ></i>
            </div>
          </aside>
          <!-- 關閉視窗按鈕 -->
          <i class="leave__btn fas fa-window-close pointer" @click="leave"></i>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { getVedio, addVedio, deleteVedio } from "@/js/all.js";
import PlayCard from "@/components/PlayCard";
import {} from "@/js/all.js";
export default {
  data() {
    return {
      alreadySend: false,
      str: "",
      playlistArr: [],
      ytSrc: "https://www.youtube.com/embed/EK1UKUtnoWU"
    };
  },
  components: {
    PlayCard
  },
  created() {
    // 打api查看看板
    getVedio(this.$store.getters.userSeriel)
      .then(res1 => {
        console.log(res1.data);
        this.playlistArr = res1.data.postInfos;
      })
      .catch(error => console.log(error));
  },
  updated() {
    if (this.alreadySend) {
      this.$nextTick(function() {
        var div = document.getElementById("data-content");
        div.scrollTop = div.scrollHeight;
      });
      this.alreadySend = false;
    }
  },

  methods: {
    // 切換影片
    changeYT(ytSrc) {
      this.ytSrc = ytSrc;
    },
    //   關閉視窗
    leave() {
      this.$emit("leave");
    },
    // 上傳影片
    send() {
      if (!this.str) {
        return;
      } else {
        console.log(this.str);
        var NewArray = new Array();
        var NewArray = this.str.split("v=");
        var ytString = NewArray[1];
        var NewArray2 = new Array();
        var NewArray2 = ytString.split("&");
        ytString = NewArray2[0];
        console.log(NewArray2[0]);

        // 打api取影片名字
        this.$http
          .get("https://youtube.googleapis.com/youtube/v3/videos", {
            params: {
              key: "AIzaSyDSwnIBbiwK2s3MdBS5je4yCsTeQPkIiP8",
              part: "snippet",
              id: ytString
            }
          })
          .then(res4 => {
            console.log(res4.data.items[0].snippet.title);
            if (res4.status === 200) {
              const addVedioData = {
                userSeriel: this.$store.getters.userSeriel,
                boardType: 2,
                postYT: ytString,
                postTitle: res4.data.items[0].snippet.title
              };
              // 打api上傳影片
              addVedio(addVedioData)
                .then(res2 => {
                  console.log(res2.data.result);
                  if (res2.data.result) {
                    // 打api更新查看看板
                    getVedio(this.$store.getters.userSeriel)
                      .then(res1 => {
                        console.log(res1.data);
                        this.playlistArr = res1.data.postInfos;
                        this.title = res1.data.postTitle;
                      })
                      .catch(error => console.log(error));
                  }
                })
                .catch(error => console.log(error));
              this.str = "";
            }
          })
          .catch(error => console.log(error));
      }
      this.alreadySend = true;
    },

    // 刪除影片
    deleteYT(postSeriel, index) {
      deleteVedio(postSeriel)
        .then(res3 => {
          console.log(res3.data);
          if (res3.data.result) {
            this.playlistArr.splice(index, 1);
          }
        })
        .catch(error => console.log(error));
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
  /* background-color: cyan; */
}
.tv__body {
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 100%;
  max-height: 30rem;
  /* background-color: darkgoldenrod; */
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
  padding: 0 0.5rem 0.5rem 0.5rem;
  position: relative;
  /* background-color: rgb(0, 32, 139); */
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
  width: 103%;
  height: 10%;
  /* background-color: darkkhaki; */
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
  font-size: 3rem;
  margin-left: 0rem;
  color: red;
}
/* 上傳鈕 */
.sendBtn:hover {
  opacity: 0.8;
  color: rgb(241, 86, 112);
}
/* 離開按鈕 */
.leave__btn {
  position: absolute;
  width: 3.5vw;
  height: 3.5vw;
  font-size: 3.5vw;
  left: 102%;
  top: 0;
  color: #ee6c4d;
  /* background-color: rgb(43, 189, 226); */
}
.leave__btn:hover {
  color: #fed9b7;
}
</style>
