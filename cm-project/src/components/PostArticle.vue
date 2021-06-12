<template>
  <div id="editor">
    <main class=" container mx-auto">
      <header class="header text-center">Blog</header>
      <div class="base__body text-center">
        <div class="base__tit">
          <label class="label">標題</label>
          <input type="text" v-model="title" required />
        </div>
        <label>內容</label>
        <textarea v-model="content"></textarea>
        <button type="submit" @:click="add()">存檔</button>
      </div>
      <div class="mx-auto text-center">
        <input
          type="file"
          accept="image/*"
          @change="previewImage"
          class="form-control-file"
          id="my-file"
        />
      </div>

      <p>{{ title }}</p>
      <p>{{ content }}</p>
    </main>
    <section v-if="preview">
      <img :src="preview" />
      <p>file name: {{ image.name }}</p>
      <p>size: {{ image.size / 1024 }}KB</p>
    </section>
    <button @click="reset">Clear imgs</button>
  </div>
</template>

<script>
import Header from "./Header.vue";
export default {
  components: { Header },
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
      }
    },
    previewMultiImage: function(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = e => {
            this.preview_list.push(e.target.result);
          };
          this.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
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
  background-color: antiquewhite;
}
.container {
  background-color: white;
}
.label {
}
.base__body {
}
.base__tit {
  display: block;
}
</style>
