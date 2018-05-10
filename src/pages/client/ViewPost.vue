<template>
  <article id="view-post" class="container" v-if="post">
    <h1>{{ post.name }}</h1>
    <img class="img-fluid" v-lazy="post.url" :alt="post.name">
    <p class="post-body" v-html="post.text"></p>
    <div class="row justify-content-around">
      <a @click="$router.go(-1)" class="btn btn-outline-primary back-link" tag="button"><i class="fa fa-arrow-circle-left"></i> Назад</a>
    </div>
    <comments :postid="this.$route.params.post_id" />
  </article> 
</template>

<script>
import { db } from '@/components/firebaseInit'
import comments from '@/elements/client/Comments'

export default {
  name: 'view-post',
  components: {
    comments
  },
  computed: {
    post() {
      return this.$store.getters.singlePost(this.$route.params.post_id);
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
