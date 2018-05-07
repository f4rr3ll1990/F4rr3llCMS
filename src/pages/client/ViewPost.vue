<template>
<div class="container">
  <div id="view-post" class="row" v-show="showPage">
    <div class="col-sm-12">
      <img class="img-fluid" v-if="url" :src="url" :alt="name">
      <h4>{{name}}</h4>
      <p v-html="text"></p>
    </div>

    <a @click="$router.go(-1)" class="btn">Back</a>
    

  </div>
</div>
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
