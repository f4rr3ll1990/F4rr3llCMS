<template>
<div id="home">
  <carousel :scrollPerPage="true" :perPageCustom="[[480, 1]]" v-if="showSlider">
    <slide v-for="slide in slides" v-bind:key="slide.id" v-bind:style="{ backgroundImage: 'url(' + slide.url + ')' }" />
  </carousel>
  <article class="container" v-show="showPage">
    <div class="row article-row">
      <post-card v-for="post in posts" :key="post.post_id" :post="post" />
    </div>
  </article>
</div>
</template>

<script>
import { db } from "@/components/firebaseInit";
import { Carousel, Slide } from "vue-carousel";
import PostCard from '@/elements/client/PostCard'

export default {
  name: "home",
  components: {
    Carousel,
    Slide,
    PostCard
  },
  data() {
    return {
      posts: [],
      slides: [],
      loading: 0,
      showPage: false,
      showSlider: false
    };
  },
  beforeCreate() {},
  created() {
    NProgress.start();

    db
      .collection("posts")
      .get()
      .then(querySnapshot => {
        // this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            post_id: doc.data().post_id,
            category_id: doc.data().category_id,
            name: doc.data().name,
            description: doc.data().description,
            url: doc.data().url,
            date: doc.data().date
          };
          this.posts.push(data);

          this.stateLoading();
        });
      });

    db
      .collection("slides")
      .get()
      .then(querySnapshot => {
        // this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            name: doc.data().name,
            text: doc.data().text,
            url: doc.data().url
          };
          this.slides.push(data);
          this.showSlider = true;
          this.stateLoading();
        });
      });
  },
  mounted() {
    this.stateLoading();
  },
  methods: {
    stateLoading() {
      this.loading++;
      if (this.loading == 3) {
        this.showPage = true;
        NProgress.done();
      }
    }
  }
};
</script>
<style scoped>
.VueCarousel-slide {
  min-height: 50px;
  background-size: cover;
  background-position: center;
}
</style>
