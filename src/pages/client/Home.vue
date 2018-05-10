<template>
<div id="home">
  <carousel :scrollPerPage="true" :perPageCustom="[[480, 1]]" v-if="loaded" >
    <slide class="home-slide" v-for="slide in slides" v-bind:key="slide.id" v-lazy:background-image="slide.url">
      <div class="slide-inner">
        <h2 class="slide-head">{{ slide.name }}</h2>
        <p class="slide-text">{{ slide.text }}</p>
      </div>
    </slide>
  </carousel>
  <article class="container" v-if="loaded">
    <div class="row article-row">
      <post-card v-for="post in posts" :key="post.post_id" :post="post" />
    </div>
  </article>
</div>
</template>

<script>
import { db } from '@/components/firebaseInit'
import { Carousel, Slide } from 'vue-carousel'
import PostCard from '@/elements/client/PostCard'

export default {
  name: "home",
  components: {
    Carousel,
    Slide,
    PostCard
  },
  computed: {
    loaded() {
      return this.$store.state.loaded;
    },
    posts() {
      return this.$store.state.posts;
    },
    slides() {
      return this.$store.state.slides;
    }
  }
};
</script>
<style scoped>
.VueCarousel-slide {
  height: 40vh;
  background-size: cover;
  background-position: center;
}
 .home-slide[lazy=loading] {
    background-size: contain;
    background-repeat: no-repeat;
  }
.slide-inner {
  margin-top: 6%;
  margin-left: 3%;
  color: rgb(224, 223, 223);
  font-family: 'Marmelad', sans-serif;
}
.slide-head {
  font-size: 4em;
}

article {
  margin-top: 50px;
}
</style>
