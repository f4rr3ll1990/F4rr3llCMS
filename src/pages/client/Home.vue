<template>
<div id="home">
  <carousel :scrollPerPage="true" :perPageCustom="[[480, 1]]" v-if="loaded" >
    <slide v-for="slide in slides" v-bind:key="slide.id" v-bind:style="{ backgroundImage: 'url(' + slide.url + ')' }" />
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
  min-height: 50px;
  background-size: cover;
  background-position: center;
}
</style>
