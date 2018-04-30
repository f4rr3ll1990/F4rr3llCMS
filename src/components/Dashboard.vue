<template>
  <div id="dashboard" class="row">
    <div class="col-lg-4 col-sm-6 portfolio-item" v-for="post in posts" v-bind:key="post.id">
      <div class="card h-100">
        <div class="card-body">
          <h4 class="card-title">
            <router-link v-bind:to="{ name: 'edit-post', params: { post_id: post.post_id }}" class="btn">
                <i class="fa fa-pencil"></i>      
                {{post.name}}
            </router-link>
          </h4>
        </div>
      </div>
    </div>
    <div class="fixed_bottom_btn">
      <router-link to="/new" class="btn">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { db } from "./firebaseInit";
export default {
  name: "dashboard",
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