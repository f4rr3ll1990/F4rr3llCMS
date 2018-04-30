<template>
  <div id="home" class="row">
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
export default {
  name: "home",
  data() {
    return {
      posts: [],
      loading: true
    };
  },
  created() {
    db
      .collection("posts")
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            post_id: doc.data().post_id,
            name: doc.data().name,
            text: doc.data().text,
            url: doc.data().url
          };
          this.posts.push(data);
        });
      });
  }
};
</script>