<template>
  <div id="category">
    <article class="container" >
      <div class="row article-row">
        <post-card v-for="post in posts" :key="post.post_id" :post="post" />
      </div>
    </article>
  </div>
</template>

<script>
import { db } from "@/components/firebaseInit";
import PostCard from '@/elements/client/PostCard'


export default {
  name: "category",
  components: {
    PostCard
  },
  computed: {
    posts() {
      return this.$store.getters.categoryPosts(this.$route.params.category_id);
      // let state = this.$store.state.posts;
      // let filterposts = _.filter(state, {category_id: this.$route.params.category_id}) || null;
      // return filterposts;
    }
  }
};
</script>
<style scoped>
  .article-row {
    padding-top: 30px;
  }
</style>
