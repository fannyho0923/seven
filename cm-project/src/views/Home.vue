<template>
  <main class="container mx-auto">
    <div class="row">
      <div class="home__body">
        <section class="home__btn">
          <h1 class="home__title">SEVEN</h1>
          <lable class="pointer btn1">使用規則</lable>
          <lable class="pointer btn2">創建帳號</lable>
          <lable class="pointer btn3">進入公寓</lable>
        </section>
        <aside class="home__img">
          <img
            class="img-resp"
            src="../../static/imgs/apartmentPic.png"
            alt=""
          />
        </aside>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  /* background-color: teal; */
  height: 10rem;
  margin-top: 2rem;
}
.home__body {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.home__btn {
  max-width: 50%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
}
.home__img {
  max-width: 50%;
  width: 40%;
}

.btn1,
.btn2,
.btn3 {
  font-size: 2rem;
  margin-bottom: 2rem;
}
.home__title {
  margin-top: 0;
  font-size: 4rem;
  margin-bottom: 4rem;
  font-weight: 400;
}
</style>
