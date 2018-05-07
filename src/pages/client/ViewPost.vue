<template>
  <article id="view-post" class="container" v-show="showPage">
    <h1>{{ name }}</h1>
    <img class="img-fluid" v-if="url" :src="url" :alt="name">
    <p class="post-body" v-html="text"></p>
    <div class="row justify-content-around">
      <a @click="$router.go(-1)" class="btn btn-outline-primary back-link" tag="button"><i class="fa fa-arrow-circle-left"></i> Назад</a>
    </div>
  </article> 
</template>

<script>
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
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    db
      .collection('posts')
      .where('post_id', '==', to.params.post_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.post_id = doc.data().post_id;
            vm.name = doc.data().name;
            vm.text = doc.data().text;
            vm.url = doc.data().url;
            vm.showPage = true;
            NProgress.done();
          });
        });
      });
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      db
        .collection('posts')
        .where('post_id', '==', to.params.post_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.post_id = doc.data().post_id;
            this.name = doc.data().name;
            this.text = doc.data().text;
            this.url = doc.data().url;
          });
        });
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
