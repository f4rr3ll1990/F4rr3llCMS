<template>
<div class="container">
  <div id="new-post">
    <h3>New Post</h3>
    <div class="row">
    <form @submit.prevent="savePost" class="col-sm-12" novalidate>
      <div class="row">
        <div class="input-field col-sm-12">
          <input type="text" v-model="name" v-on:keyup="translitFunc()">
          <label>Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col-sm-12">
          <input type="text" v-model="description" />
          <label>Description</label>
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
        <div class="input-field col-sm-12">
          <wysiwyg v-model="text" />
          <label>Text</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col-sm-12">
          <FileUploader v-on:url="getUrl" />
          <img v-if="url" :src="url" alt="">
        </div>
      </div>
      <div class="row">
        <div class="input-field col-sm-12">
          <input type="text" v-model="post_id">
          <label>Post URL#</label>
        </div>
      </div>
      <button type="submit" class="btn">Submit</button>
      <router-link to="/" class="btn grey">Cancel</router-link>
    </form>
  </div>
  </div>
</div>
</template>

<script>
    import { db } from '@/components/firebaseInit'
    import FileUploader from '@/elements/dashboard/FileUploader'
    import translit from 'cyrillic-to-translit-js'

    export default {
      name: 'new-post',
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
          url: false,
          date: null
        }
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
      methods: {
        getUrl (url) {
          this.url = url
        },
        translitFunc() {
          this.post_id = translit().transform(this.name, "-").toLowerCase();
        },
        savePost () {
          db.collection('posts').add({
            post_id: this.post_id,
            category_id: this.category_id,
            name: this.name,
            description: this.description,
            text: this.text,
            url: this.url,
            date: Date.now()
          })
          .then(docRef => {
            console.log('Client added: ', docRef.post_id)
            this.$router.push('/')
          })
          .catch(error => {
            console.error('Error adding post: ', error)
          })
        }
      }
    }
</script>
<style src="../../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css"></style>
