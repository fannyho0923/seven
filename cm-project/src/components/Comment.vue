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
        {{ memoStr }}
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
  /* justify-content: center; */
  align-items: center;
}
.article {
  position: absolute;
  left: 15%;
  max-width: 70%;
  max-height: 70%;
  width: 70%;
  height: 70%;
  margin-top: 1.5rem;
  word-wrap: break-word;
  overflow: hidden;
  /* text-overflow: ellipsis; */
}

.img {
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  height: auto;
}
.base__comment {
  position: relative;
  max-width: 10vw;
  max-height: 10vw;
  min-width: 150px;
  min-height: 150px;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.trash__btn {
  visibility: visible;
  position: absolute;
  left: 80%;
  top: 10%;
}
</style>
