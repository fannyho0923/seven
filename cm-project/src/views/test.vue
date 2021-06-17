<template>
  <div>
    <main>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG&autoplay=0&rel=0"
        title="YouTube video player"
        rel="0"
        loop="1"
        iv_load_policy="3"
        frameborder="0"
        controls="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <!-- 無法禁用相關視頻。相反，如果該rel參數設置為0，則相關視頻將來自與剛剛播放的視頻相同的頻道。 -->
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/Ed1NhR3CaAQ?controls=0&autoplay=0"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <!-- <object width="425" height="350"><param name="movie" value="http://www.youtube.com/v/ZA22WSVlCZ4"></param><embed src="http://www.youtube.com/watch?v=ZA22WSVlCZ4" type="application/x-shockwave-flash" width="425" height="350"></embed></object> -->
      <!-- https://youtu.be/7V6Um5U2iH8 -->
      <!-- https://www.youtube.com/embed/7V6Um5U2iH8 -->
      <!-- https://www.youtube.com/watch?v=7V6Um5U2iH8 -->
      <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/7V6Um5U2iH8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
    </main>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide
        img-src="https://picsum.photos/1024/480/?image=58"
      ></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          eros felis, tincidunt a tincidunt eget, convallis vel est. Ut
          pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
    </b-carousel>

    <p class="mt-4">
      Slide #: {{ slide }}<br />
      Sliding: {{ sliding }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>
