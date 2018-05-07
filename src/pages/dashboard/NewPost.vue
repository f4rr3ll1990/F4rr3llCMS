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
          post_id: null,
          name: null,
          text: null,
          url: false
        }
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
            name: this.name,
            text: this.text,
            url: this.url
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
