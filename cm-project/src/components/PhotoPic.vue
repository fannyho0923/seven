<template>
  <div class="photoBox">
    <img v-if="imgUrl" class="img" :src="imgUrl" alt="照片" />
    <label v-if="!imgUrl && isOwner" class="pointer label__btnBox"
      ><input
        type="file"
        accept="image/*"
        @change="previewImage"
        class=" input__btn"
        id="my-file"
        ref="files"/>點擊新增圖片<i class="far fa-image"></i
    ></label>
    <button v-if="isOwner && imgUrl" class="pointer trashBtn" @click="reset">
      清除照片<i class="fas fa-trash-alt"></i>
    </button>
  </div>
</template>

<script>
import { setImg, setPhoto, deletePhoto, getRoomInfo } from "@/js/all";
export default {
  data() {
    return {
      img: null,
      imgUrl: this.photo,
      isOwner: false
    };
  },
  created() {
    this.roomId = this.$route.query.id;
    // 取得房間資訊
    getRoomInfo(this.roomId, this.$store.getters.userSeriel)
      .then(res4 => {
        this.isOwner = res4.data.isOwner;
      })
      .catch(error => console.log(error));
  },
  props: ["photo", "photoIndex"], // 上傳圖片
  methods: {
    //   api打新增照片獲取url
    previewImage() {
      // 宣告一個變數來儲存我們找到的圖片
      const uploadedFile = this.$refs.files.files[0];
      // 把圖片轉換成 FromData，先宣告一個變數是我們的 new FormData()
      const formData = new FormData();
      // 利用 append 的方式將我們的圖片塞入
      formData.append("file", uploadedFile);
      // 打api：上傳圖片取得imgPath
      setImg(formData)
        .then(res1 => {
          if (!res1.data.result) {
            return;
          }
          // 將圖片路徑記下來
          this.imgUrl = res1.data.imgPath;
          console.log(this.imgUrl);
          // 打aip上傳
          const photoData = {
            userSeriel: this.$store.getters.userSeriel,
            photoIndex: this.photoIndex,
            postImgPath: this.imgUrl
          };
          setPhoto(photoData).then(res2 => console.log(res2));
        })
        .catch(error => console.log(error));
    },
    // 清除照片
    reset() {
      this.imgUrl = null;
      deletePhoto(this.photoIndex, this.$store.getters.userSeriel)
        .then(res3 => console.log(res3.data))
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
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
/* 照片 */
.img {
  width: 100%;
  height: auto;
  max-height: 100%;
}
/* 放選取照片按鈕以及照片區塊 */
.photoBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 清除按鈕 */
.trashBtn {
  position: absolute;
  top: 102%;
  background-color: #457b9d;
  border-color: #1d3557;
  color: #1d3557;
  box-shadow: none;
  border-radius: 10px;
}
.trashBtn:hover {
  opacity: 0.5;
  background-color: #a8dadc;
}
</style>
