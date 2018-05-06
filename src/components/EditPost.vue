<template>
  <div id="edit-post">
    <h3>Edit Post</h3>
    <div class="row">
    <form @submit.prevent="updatePost" class="col-sm-12">
      <div class="row">
        <div class="input-group col-sm-12">
          <input type="text" v-model="name" v-on:keyup="translitFunc()" />
        </div>
      </div>
      <div class="row">
        <div class="input-group col-sm-12">
          <input type="text" v-model="text" />
        </div>
      </div>
      <div class="row">
        <div class="input-group col-sm-12">
          <FileUploader v-on:url="getUrl" />
          <img class="img-fluid" v-if="url" :src="url" alt="" />
        </div>
      </div>
      <div class="row">
        <div class="input-group col-sm-12">
          <input type="text" v-model="post_id" />
        </div>
      </div>
      <button type="submit" class="btn">Submit</button>
      <router-link to="/" class="btn grey">Cancel</router-link>
    </form>
    <div class="fixed_bottom_btn">
      <button @click="deletePost" class="btn">Delete</button>
    </div>
  </div>
  </div>
</template>

<script>
  import { db } from './firebaseInit'
  import FileUploader from './FileUploader'
  import translit from 'cyrillic-to-translit-js'

  export default {
    name: 'edit-post',
    components: {
        FileUploader
    },
    data () {
      return {
        post_id: null,
        name: null,
        text: null,
        url: null
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('posts').where('post_id', '==', to.params.post_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.post_id = doc.data().post_id
            vm.name = doc.data().name
            vm.text = doc.data().text
            vm.url = doc.data().url
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('posts').where('post_id', '==', this.$route.params.post_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.post_id = doc.data().post_id
            this.name = doc.data().name
            this.text = doc.data().text
            this.url = doc.data().url
          })
        })
      },
      translitFunc() {
        this.post_id = translit().transform(this.name, "-").toLowerCase();
      },
      getUrl (url) {
          this.url = url
      },
      updatePost () {
        db.collection('posts').where('post_id', '==', this.$route.params.post_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              post_id: this.post_id,
              name: this.name,
              text: this.text,
              url: this.url
            })
            .then(() => {
              this.$router.push({ name: 'view-post', params: { post_id: this.post_id }})
            });
          })
        })
      },
      deletePost() {
        if (confirm('Are you sure?')) {
          db
            .collection('posts')
            .where('post_id', '==', this.$route.params.post_id)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref.delete();
                this.$router.push('/');
              });
            });
        }
      }
    }
  }
</script>