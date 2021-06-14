<template>
  <section class="text-center selectorBox">
    <h2 class="selectorBox__tit mx-auto">Select the type of note</h2>
    <div class="set-memos">
      <div
        class=" set-inlineBlock memoBox"
        v-for="(item, index) in memoArr"
        :key="index"
      >
        <img
          @click="checkMemo(memoArr[index].id)"
          class="pointer img-resp"
          :src="memoArr[index].src"
          alt="memoPic"
          width="100"
          height="100"
        />
        <div class="pointer close__btn" @click="close">
          X
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["memoArr"],
  methods: {
    close() {
      this.$emit("close");
    },
    checkMemo(id) {
      this.$emit("checkMemo", id);
    }
  }
};
</script>

<style scoped>
.selectorBox__tit {
  margin-top: 1rem;
  margin-bottom: 0;
}
.selectorBox {
  display: flex;
  flex-wrap: wrap;
  width: 60vw;
  height: auto;
  border: solid 2px black;
}
.memoBox {
  max-width: 100px;
  max-height: 100px;
  margin: 1rem;
}
.img-resp {
  max-width: 100%;
  max-height: 100%;
}
.img-resp:hover {
  opacity: 0.5;
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

.set-memos {
  padding-bottom: 1rem;
}
</style>
