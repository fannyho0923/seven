<template>
  <section class="bg">
    <aside class="base">
      <div class="article__body mx-auto">
        <!-- 文字匡 -->
        <div class="textBox">
          <textarea
            class="textArea"
            v-model="content"
            placeholder="寫點什麼..."
          ></textarea>
        </div>
        <!-- 照片框 -->
        <div class="imgBox">
          <label v-if="!preview" class="pointer label__btnBox"
            ><input
              type="file"
              accept="image/*"
              @change="previewImage"
              class=" input__btn form-control-file"
              id="my-file"
              ref="files"
            />點擊新增圖片</label
          >
          <!-- 秀照片區塊 -->
          <div class="imgShowBox" v-if="imgUrl">
            <img
              class="img"
              :src="imgUrl"
              alt="UserPic"
              width="100"
              height="100"
            />
          </div>
          <button v-if="preview" class="pointer" @click="reset">
            清除照片
          </button>
        </div>
        <!-- 關閉視窗按鈕 -->
        <div class="pointer close__btn" @click="close">Ｘ</div>
      </div>
      <button
        type="submit"
        class=" mx-auto  set-inlineBlock post__btn"
        @click.prevent="post"
      >
        發布
      </button>
    </aside>
  </section>
</template>

<script>
import { addPrivateArticle, setImg, getPrivateArticle } from "@/js/all.js";
export default {
  data() {
    return {
      content: "",
      image: null,
      preview: null,
      preview_list: [],
      image_list: [],
      imgUrl: ""
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    // 清除照片
    reset() {
      this.image = null;
      this.preview = null;
      this.image_list = [];
      this.preview_list = [];
    },
    // 上傳圖片
    previewImage() {
      // console.log(this.$refs.files.files[0]);
      // 宣告一個變數來儲存我們找到的圖片
      const uploadedFile = this.$refs.files.files[0];
      // 把圖片轉換成 FromData，先宣告一個變數是我們的 new FormData()
      const formData = new FormData();
      // 利用 append 的方式將我們的圖片塞入
      formData.append("file", uploadedFile);
      // 打api：上傳圖片取得imgPath
      setImg(formData).then(res4 => {
        if (!res4.data.result) {
          return;
        }

        // 將圖片路徑記下來
        this.imgUrl = res4.data.imgPath;
      });
    },
    post() {
      if (!this.content) {
        return;
      }
      // 打api上傳文章
      const articleData = {
        userSeriel: this.$store.getters.userSeriel,
        boardType: 3,
        memberDoorIndex: this.$store.getters.doorIndex,
        postImg: this.imgUrl,
        postText: this.content
      };
      // 發文
      addPrivateArticle(articleData).then(res1 => {
        if (res1.data.result) {
          this.content = "";
          this.preview = "";
          console.log(this.imgUrl);
          this.$emit("post", articleData);
        }
      });
    }
  }
};
</script>

<style scoped>
/* 背景遮罩 */
.bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 50vw;
  background-color: rgba(5, 5, 5, 0.404);
}
/* 編輯文章匡 */
.article__body {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10rem;
  width: 60%;
  height: 36rem;
  /* background-color: rgba(128, 255, 0, 0.548); */
}
/* 文章匡 */
.textBox {
  position: relative;
  width: 50%;
  height: 40%;
  background-color: cornflowerblue;
}
/* 圖片匡 */
.imgBox {
  width: 50%;
  height: 60%;
  background-color: rgb(212, 237, 100);
}
/* 文字輸入匡 */
.textArea {
  max-width: 100%;
  width: 100%;
  height: 100%;
  font-size: 1.5vw;
  resize: none;
}
/* 離開按鈕 */
.close__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px black;
  max-width: 5rem;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 4rem;
  left: 80%;
  top: 0;
  background-color: pink;
}
/* 秀照片區塊 */
.imgShowBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85%;
  margin-bottom: 0.5rem;
}
/* 照片 */
.img {
  width: 100%;
  height: auto;
  max-height: 100%;
}
/* 放選取照片按鈕以及照片區塊 */
.imgBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 新增照片的input(要透明) */
.input__btn {
  display: none;
}
/* 代替新增照面input */
.label__btnBox {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
  width: 100%;
  height: 100%;
  color: rgb(77, 73, 73);
}
/* 整個編輯器以及發布按鈕 */
.base {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.post__btn {
  margin-top: 1rem;
  width: 30%;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}
</style>
