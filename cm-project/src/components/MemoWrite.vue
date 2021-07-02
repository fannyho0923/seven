<template>
  <section class="writeBox">
    <h2 class="writeBox__tit mx-auto">Leave your message</h2>
    <div class="mx-auto write__body">
      <aside class="imgBox">
        <!-- 便條照片 -->
        <img class="img img-resp" :src="memoType.src" alt="memoPic" />
      </aside>
      <article class="articleBox">
        <!-- 給使用者輸入的位置 -->
        <textarea
          class="textarea"
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="content"
          placeholder="write your note here..."
        />
      </article>
    </div>
    <!-- 完成按鈕 -->
    <button
      class="mx-auto ok__btn pointer"
      @keyup.enter="writeDone(memoType.id)"
      @click="writeDone(memoType.id)"
    >
      Done
    </button>
    <!-- 關閉視窗按鈕 -->
    <div class="pointer close__btn" @click="closeWriteBox">
      X
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  props: ["memoType"],
  methods: {
    closeWriteBox() {
      //關閉寫便條視窗
      this.$emit("closeWriteBox");
    },
    writeDone(id) {
      //規定要寫輸入文字
      if (!this.content) {
        alert("請輸入文字");
        return;
      }
      //將使用者輸入文字以及便條id吐出去儲存
      this.$emit("writeDone", this.content, id);
    }
  }
};
</script>

<style scoped>
.writeBox__tit {
  margin-top: 1rem;
  margin-bottom: 0;
}
.writeBox {
  display: flex;
  flex-direction: column;
  width: 60vw;
  height: auto;
  border: solid 2px black;
  background-color: white;
}
.close__btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border: solid 3px black;
  border-radius: 50%;
  font-size: 2rem;
  left: 97.5%;
  top: -6%;
  background-color: white;
}
.write__body {
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: space-around;
  margin: 1rem;
  margin-bottom: 2rem;
}
.textarea {
  resize: none;
}
.img {
  width: 100%;
  height: auto;
}

.ok__btn {
  width: 8%;
  min-width: 70px;
  border: solid 3px rgb(255, 0, 106);
  border-radius: 5px;
  margin-bottom: 2rem;
  background-color: rgba(255, 192, 203, 0.527);
  color: rgb(255, 0, 106);
}
.ok__btn:hover {
  font-weight: 600;
  background-color: pink;
}
</style>
