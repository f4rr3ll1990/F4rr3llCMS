<template>

  <div class="container">
    <div id="category" class="row" >
      <div class="col-lg-4 col-sm-6 portfolio-item" v-for="post in posts" v-bind:key="post.post_id">
        <div class="card h-100">
          <router-link v-bind:to="{ name: 'view-post', params: { category_id: post.category_id, post_id: post.post_id }}">
            <img class="card-img-top" :src="post.url" alt="">
          </router-link>
          <div class="card-body">
            <h4 class="card-title">
              <router-link v-bind:to="{ name: 'view-post', params: { category_id: post.category_id, post_id: post.post_id }}">
                {{post.name}}
              </router-link>
            </h4>
            <p class="card-text" v-html="post.text"></p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { db } from "./firebaseInit";

export default {
  name: "category",
  data() {
    return {
      posts: []
    };
  },
  created() {
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
        });
      });

  },
  mounted() {
  },
  methods: {
      fetchData() {
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

</style>
