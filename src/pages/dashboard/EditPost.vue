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
          <input type="text" v-model="description" />
        </div>
      </div>
      <div class="row">
        <div class="input-field col-sm-12">
          <select name="category" v-model="category_id">
            <option v-for="cat in categories" :key="cat.category_id" :value="cat.category_id">{{ cat.name }}</option>
          </select>
          <label>Category</label>
        </div>
      </div>
      <div class="row">
        <div class="input-group col-sm-12">
          <wysiwyg v-model="text" />
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
  import { db } from '@/components/firebaseInit'
  import FileUploader from '@/elements/dashboard/FileUploader'
  import translit from 'cyrillic-to-translit-js'

  export default {
    name: 'edit-post',
    components: {
        FileUploader
    },
    data () {
      return {
        categories: [],
        post_id: null,
        category_id: null,
        name: null,
        description: null,
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
            vm.category_id = doc.data().category_id
            vm.description = doc.data().description
            vm.text = doc.data().text
            vm.url = doc.data().url
          })
        })
      });
    },
    created() {
      db
        .collection("categories")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              category_id: doc.data().category_id,
              name: doc.data().name
            };
            this.categories.push(data);
          });
        });
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('posts').where('post_id', '==', this.$route.params.post_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.post_id = doc.data().post_id
            this.category_id = doc.data().category_id
            this.name = doc.data().name
            this.description = doc.data().description
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
              category_id: this.category_id,
              description: this.description,
              text: this.text,
              url: this.url,
              date: Date.now()
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
<style src="../../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css"></style>