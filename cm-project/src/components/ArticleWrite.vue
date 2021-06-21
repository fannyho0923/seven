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
        <!-- 照片匡 -->
        <div class="imgBox">
          <label v-if="!preview" class="pointer label__btnBox"
            ><input
              type="file"
              accept="image/*"
              @change="previewImage"
              class=" input__btn form-control-file"
              id="my-file"
            />點擊新增圖片</label
          >
          <!-- 秀照片區塊 -->
          <div class="imgShowBox" v-if="preview">
            <img
              class="img img-resp"
              :src="preview"
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
export default {
  data() {
    return {
      content: "",
      image: null,
      preview: null,
      preview_list: [],
      image_list: []
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      } else {
        return;
      }
    },
    reset() {
      this.image = null;
      this.preview = null;
      this.image_list = [];
      this.preview_list = [];
    },
    post() {}
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
  height: 100vh;
  background-color: rgba(95, 158, 160, 0.404);
}
/* 編輯文章匡 */
.article__body {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10rem;
  width: 60%;
  height: 36rem;
  background-color: rgba(128, 255, 0, 0.548);
}
/* 文章匡 */
.textBox {
  position: relative;
  width: 50%;
  height: 100%;
  background-color: cornflowerblue;
}
/* 圖片匡 */
.imgBox {
  width: 50%;
  height: 100%;
  background-color: rgb(212, 237, 100);
}
/* 文字輸入匡 */
.textArea {
  max-width: 100%;
  width: 100%;
  height: 100%;
  font-size: 18px;
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
  left: 103%;
  top: 0;
  background-color: pink;
}
/* 秀照片區塊 */
.imgShowBox {
  width: 100%;
  margin-bottom: 1rem;
}
/* 照片 */
.img {
  width: 100%;
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
  width: 60%;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}
</style>
