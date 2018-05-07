<template>
  <div id="category">
    <article class="container" v-show="showPage">
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
  data() {
    return {
      posts: [],
      showPage: false
    };
  },
  created() {
    NProgress.start();
    db
      .collection("posts")
      .where('category_id', '==', this.$route.params.category_id)
      .get()
      .then(querySnapshot => {
        // this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            post_id: doc.data().post_id,
            category_id: doc.data().category_id,
            name: doc.data().name,
            text: doc.data().text,
            url: doc.data().url
          };
          this.posts.push(data);
          this.showPage = true;
          NProgress.done();
        });
      });

  },
  mounted() {
  },
  methods: {
      fetchData() {
        this.showPage = false;
        NProgress.start();
        this.posts = [];
        db
        .collection("posts")
        .where('category_id', '==', this.$route.params.category_id)
        .get()
        .then(querySnapshot => {
            // this.loading = false;
            querySnapshot.forEach(doc => {
            const data = {
                post_id: doc.data().post_id,
                category_id: doc.data().category_id,
                name: doc.data().name,
                text: doc.data().text,
                url: doc.data().url
            };
            this.posts.push(data);
            this.showPage = true;
            NProgress.done();
            });
        });
      }
  },
  watch: {
    // в случае изменения маршрута запрашиваем данные вновь
    '$route': 'fetchData'
  },
};
</script>
<style scoped>
  .article-row {
    padding-top: 30px;
  }
</style>
