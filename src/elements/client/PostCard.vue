<template>
    <div class="col-sm-4 post">
        <div class="post-wrap">
            <router-link v-bind:to="{ name: 'view-post', params: { category_id: post.category_id, post_id: post.post_id }}">
                <img class="img-fluid" v-lazy="post.url" :alt="post.name">
                <h3>{{ post.name }}</h3>
                <p>{{ post.description }}</p>
                <span>{{ post.date | moment("dddd, DD MMMM YY HH:mm Z") }}</span>
            </router-link>
        </div>
    </div> 
</template>

<script>
export default {
  name: "post-card",
  props: ["post"]
};
</script>

<style scoped>
.post h3,
.post p,
.post span {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 350;
  color: #35495e;
  letter-spacing: 1px;
  padding: 15px;
}
.post-wrap {
  box-shadow: 0 2px 2px #aaa;
  padding: 0 0 25px 0;
}
.post-wrap:hover {
  box-shadow: 1px 3px 2px #aaa;
}
h3 {
  text-align: center;
  display: block;
}
a:hover {
  color: #35495e;
  text-decoration: none !important;
}
</style>


