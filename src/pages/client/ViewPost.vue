<template>
  <article id="view-post" class="container" >
    <h1>{{ name }}</h1>
    <img class="img-fluid" v-if="url" :src="url" :alt="name">
    <p class="post-body" v-html="text"></p>
    <div class="row justify-content-around">
      <a @click="$router.go(-1)" class="btn btn-outline-primary back-link" tag="button"><i class="fa fa-arrow-circle-left"></i> Назад</a>
    </div>
  </article> 
</template>

<script>
const _ = require('lodash');
import { db } from '@/components/firebaseInit';
export default {
  name: 'view-post',
  data() {
    return {
      showPage: false,
      post_id: null,
      name: null,
      text: null,
      url: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let post = _.find(this.$store.state.posts, {post_id: this.$route.params.post_id}) || null;
      this.post_id = post.post_id;
      this.name = post.name;
      this.text = post.text;
      this.url = post.url;
    }
  }
};
</script>

<style scoped>
.post-body {
    font-weight: 400;
    font-style: normal;
    text-rendering: optimizeLegibility;
    font-family: "-apple-system",BlinkMacSystemFont,Arial,sans-serif;
    padding-top: 35px;
    padding-bottom: 35px;
    text-align: left;
    display: block;
    font-size: 1.2em;
    color: #35495e;
}
.back-link:hover {
  color: white !important;
  background-color: rgba(0, 123, 255, 0.726);
}
</style>
