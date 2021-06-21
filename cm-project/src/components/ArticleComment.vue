<template>
  <main class="bg">
    <div class="row">
      <div class="base__body mx-auto">
        <!-- 左邊照片 -->
        <aside v-show="arr.img" class="left__area">
          <img
            class="img img-resp"
            :src="arr.img"
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
              </aside>
              <!-- 發文者名字與發文時間 -->
              <aside class="master__info">
                <p class="poster__name">{{ arr.name }}</p>
                <p class="post__date">{{ date }}</p>
              </aside>
            </div>
            <p class="article">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis culpa alias voluptas illum, quam debitis harum adipisci
              repellendus magni vero distinctio esse beatae, deleniti libero
              explicabo blanditiis temporibus optio nobis? Lorem ipsum, dolor
              sit amet consectetur adipisicing elit. Facere ex dolore quod quo
              corporis molestiae iste, exercitationem sunt vel veritatis
              expedita voluptates doloribus rerum non, unde voluptatibus
              consectetur odio voluptate. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Suscipit consectetur sit, tempore doloremque,
              temporibus mollitia dignissimos et dolorum cupiditate omnis
              pariatur quaerat fugit dolores reprehenderit nisi at culpa,
              numquam reiciendis.
            </p>
          </div>
          <!-- 留言區 -->
          <main class="commentBox" id="data-content">
            <div
              class="comment__body"
              v-for="(item, index) in arrTest"
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
                <p class="sentence">
                  {{ arrTest[index].str }}
                </p>
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
export default {
  props: ["arr"],
  data() {
    return {
      str: "",
      date: new Date(),
      arrTest: [
        { src: "../../static/test.jpg", str: "my name is fanny" },
        { src: "../../static/test.jpg", str: "my name is tony" },
        { src: "../../static/test.jpg", str: "my name is cody" },
        { src: "../../static/test.jpg", str: "my name is cake" }
      ]
    };
  },
  updated() {
    this.$nextTick(function() {
      var div = document.getElementById("data-content");
      div.scrollTop = div.scrollHeight;
    });
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
      this.arrTest.push({ src: "../../static/test.jpg", str: this.str });
      this.str = "";
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
  align-items: center;
  width: 47%;
  height: 100%;
  background-color: blueviolet;
}
/* 照片 */
.img {
  width: 100%;
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
</style>
