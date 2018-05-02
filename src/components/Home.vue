<template>
  <div id="home" class="row" v-show="showPage">
    <div class="col-sm-12">
      <carousel :scrollPerPage="true" :perPageCustom="[[480, 1]]" v-if="showSlider">
        <slide v-for="slide in slides" v-bind:key="slide.id" v-bind:style="{ backgroundImage: 'url(' + slide.url + ')' }" >
        </slide>
      </carousel>
    </div>
    <div class="col-lg-4 col-sm-6 portfolio-item" v-for="post in posts" v-bind:key="post.id">
      <div class="card h-100">
        <router-link v-bind:to="{ name: 'view-post', params: { post_id: post.post_id }}">
          <img class="card-img-top" :src="post.url" alt="">
        </router-link>
        <div class="card-body">
          <h4 class="card-title">
            <router-link v-bind:to="{ name: 'view-post', params: { post_id: post.post_id }}">
              {{post.name}}
            </router-link>
          </h4>
          <p class="card-text">{{post.text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "./firebaseInit";
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: "home",
  components: {
    Carousel,
    Slide
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
  beforeCreate() {
    
  },
  created() {
    NProgress.start();
    db
      .collection("posts")
      .get()
      .then(querySnapshot => {
        // this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            post_id: doc.data().post_id,
            name: doc.data().name,
            text: doc.data().text,
            url: doc.data().url
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
      if(this.loading == 3) {        
        this.showPage = true;
        NProgress.done();
      }
    }
  }
};
</script>
<style scoped>
  .VueCarousel-slide {
    height: 25vh;
    background-size: cover;
    background-position: center;
  }
</style>
