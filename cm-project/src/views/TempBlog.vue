<template>
  <div class="base" id="editor">
    <main class=" container mx-auto">
      <div class="close__btn"><p>Ｘ</p></div>
      <!-- <header class="header text-center">Blog</header> -->
      <div class="base__body text-center">
        <div class="base__tit mx-auto">
          <label class="label__tit">標題</label>
          <input class="input__tit" type="text" v-model="title" />
        </div>
        <div class="post__btnBox mx-auto text-center">
          <label class="pointer input__btnBox"
            ><input
              type="file"
              accept="image/*"
              @change="previewImage"
              class=" input__btn form-control-file"
              id="my-file"
            />＋新增圖片</label
          >
          <p v-if="preview" class="file__name">file name: {{ image.name }}</p>

          <button class="pointer" @click="reset">Clear imgs</button>
        </div>
        <div class="articleBox">
          <div class="article_left set-inlineBlock">
            <section class="post__preview" v-if="preview">
              <!-- <img class="img-resp" src="../static/test.jpg" alt="" /> -->
              <img class="img-resp" :src="preview" />
              <!-- <p>size: {{ image.size / 1024 }}KB</p> -->
            </section>
          </div>
          <div class="article_right set-inlineBlock">
            <textarea class="textarea" v-model="content"></textarea>
          </div>
        </div>
      </div>
      <button class="pointer post__btn" @:click="add()">發布</button>
      <p>{{ title }}</p>
      <p style="white-space: pre-wrap;">{{ content }}</p>
    </main>
  </div>
</template>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
// import Header from "./Header.vue";
export default {
  components: {},
  data() {
    return {
      title: "",
      content: "",
      image: null,
      preview: null,
      preview_list: [],
      image_list: []
    };
  },
  created() {
    this.$http.get("../static/data.json").then(response => {
      console.log(response.data);
    });
  },
  computed: {},
  methods: {
    previewImage: function(event) {
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
    reset: function() {
      this.image = null;
      this.preview = null;
      this.image_list = [];
      this.preview_list = [];
    }
    // add: function() {
    //   this.$http
    //     .post("../add/data", {
    //       Title: this.title,
    //       Content: this.content
    //     })
    //     .then(response => {
    //       console.log(JSON.parse(response.data));
    //     });
    // }
  }
};
</script>

<style>
.header {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 5rem;
}
body {
  background-color: rgba(128, 128, 128, 0.2);
}
.container {
  max-width: 600px;
  width: 600px;
  background-color: white;
  padding: 0.5rem;
  border-radius: 10px;
}
.label__tit {
  max-width: 100%;
  color: gray;
  /* background-color: greenyellow; */

  /* border-style: solid;
  border-width: 1px; */
}
.base__body {
  margin-top: -2rem;
}
.base__tit {
  /* background-color: green; */
  /* display: flex;
  justify-content: center; */
  max-width: 100%;
  width: max-content;
  display: block;
  font-size: 2.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.input__tit {
  max-width: 100%;
  text-align: center;
}
.articleBox {
  margin-bottom: 1rem;
  height: 20rem;
}
.article_left {
  display: flex;
  align-items: center;
  /* border-style: solid; */
  box-shadow: 0px 0px 5px gray;
  left: 0;
  max-width: 40%;
  width: 40%;
  padding: 0.5rem;
  margin-right: 0.5rem;
}
.article_right {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-style: solid; */
  box-shadow: 0px 0px 5px gray;
  right: 0;
  max-width: 60%;
  width: 60%;
  padding: 0.5rem;
}
.textarea {
  max-width: 100%;
  width: 100%;
  height: 100%;
  font-size: 18px;
  resize: none;
}
.articleBox {
  display: flex;
}
.post__btnBox {
  margin-bottom: 1.5rem;
}
.post__btn {
  max-width: 100%;
  width: 100%;
  height: 2rem;
}
.post__preview {
  /* background-color: aquamarine; */
  max-width: 100%;
  width: 100%;
  height: auto;
}
.input__btnBox {
  /* background-color: hotpink; */
  border: solid 1px rgba(128, 128, 128, 0.445);
  padding: 0.3rem 0.5rem;
}
.input__btn {
  /* opacity: 0.5; */
  display: none;
}
.base {
  display: flex;
  margin-top: 10%;
  margin-bottom: 10%;
  /* top: -; */
}
.close__btn {
  position: relative;
  /* right: 50%; */

  display: flex;
  max-width: 30px;
  max-height: 30px;
  width: 100%;
  height: 100%;
  border: solid 1px rgba(128, 128, 128, 0.4);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  top: -3.5%;
  left: 99%;
  background-color: rgb(181, 179, 179);
}
.file__name {
  display: block;
}
</style>
