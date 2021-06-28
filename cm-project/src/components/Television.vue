<template>
  <div>
    <div class="tvBox">
      <img
        class="tvImg pointer"
        src="../../static/imgs/publicRoom/tv.png"
        alt="TVPic"
        width="309"
        height="288"
        @click="tvPopup"
      />
    </div>
    <div v-if="isPop">
      <TvPopupWindow @leave="closePopup" />
    </div>
  </div>
</template>

<script>
import TvPopupWindow from "@/components/TvPopupWindow";
export default {
  data() {
    return {
      isPop: false
    };
  },

  components: { TvPopupWindow },
  methods: {
    tvPopup() {
      this.isPop = true;
    },
    // 關閉彈窗
    closePopup() {
      this.isPop = false;
    }
  }
};
</script>

<style scoped>
/* 電視照片框 */
.tvBox {
  z-index: 5;
  position: absolute;
  width: 15vw;
  height: auto;
  left: 1%;
  top: 13%;
  transform: rotate(-2deg);
}
/* 電視照片 */
.tvImg {
  max-width: 100%;
  height: auto;
}
</style>
