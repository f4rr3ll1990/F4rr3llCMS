<template>
<div class="container">
  <div id="dashboard" class="row">
    <div class="col-sm-10">
        <router-link to="/new" class="btn">
            <i class="fa fa-plus"></i> Создать пост
        </router-link>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Text</th>
                <th scope="col">Image</th>
                <th scope="col">Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" v-bind:key="post.id">
                    <td>
                        {{post.post_id}}
                    </td>
                    <td>
                        {{post.name}}
                    </td>
                    <td>
                        {{post.description}}
                    </td>
                    <td>
                        <img class="img-fluid" :src="post.url" alt="">
                    </td>
                    <td>
                        <router-link v-bind:to="{ name: 'edit-post', params: { post_id: post.post_id }}" class="btn">
                            <i class="fa fa-pencil"></i>
                        </router-link>
                    </td>
                </tr>        
            </tbody>
        </table>
    </div>
    <DashSidebar />
  </div>
</div>
</template>

<script>
import { db } from "@/components/firebaseInit";
import DashSidebar from "@/elements/dashboard/DashSidebar";
export default {
  name: "dashboard",
  components: {
      DashSidebar
  },
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
            description: doc.data().description,
            url: doc.data().url
          };
          this.posts.push(data);
        });
      });
  }
};
</script>

<style scoped>
    .img-fluid {
        max-height: 10vh;
    }
</style>
