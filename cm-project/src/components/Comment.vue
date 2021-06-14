<template>
  <div class="base__comment set-inlineBlock">
    <div class="commentBox set-inlineBlock">
      <img
        class="img img-resp"
        :src="memoSrc"
        alt="memoPic"
        width="100"
        height="100"
      />
      <div
        :style="{ transform: 'rotate(' + memoDeg + 'deg)' }"
        class="article set-inlineBlock"
      >
        {{ memoStr }}{{ memoDeg }}
      </div>
      <div
        class="trash__btn"
        :style="{ transform: 'rotate(' + memoDeg + 'deg)' }"
      >
        <img
          src="../../static/imgs/memoImg/mini_trash.png"
          alt="mini_trash"
          width="20"
          height="20"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { memoStr: String, memoSrc: String, memoDeg: Number }
};
</script>

<style scoped>
.commentBox {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.article {
  position: absolute;
  left: 15%;
  max-width: 70%;
  max-height: 70%;
  width: 70%;
  height: 70%;
  margin-top: 1rem;
  word-wrap: break-word;
  overflow: hidden;
  /* text-overflow: ellipsis; */
}
.commentBox {
  width: 10vw;
  height: 10vw;
}
.img {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  /* max-height: 100%; */
}
.base__comment {
  position: relative;
  /* background-color: salmon; */
}
/* .trash__show {
  visibility: visible;
} */
.trash__btn {
  visibility: visible;
  position: absolute;
  left: 80%;
  top: 10%;
}
</style>
