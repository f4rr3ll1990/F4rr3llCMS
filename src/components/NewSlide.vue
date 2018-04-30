<template>
  <div id="newslide">
    <h3>New Slide</h3>
    <div class="row">
    <form @submit.prevent="saveSlide" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="name" required>
          <label>Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="txtarea" v-model="text" required></textarea>
          <label>Text</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <FileUploader v-on:url="getUrl" />
          <img v-if="url" :src="url" alt="">
        </div>
      </div>
      <button type="submit" class="btn">Submit</button>
      <router-link to="/" class="btn grey">Cancel</router-link>
    </form>
  </div>
  </div>
</template>

<script>
    import { db } from './firebaseInit'
    import FileUploader from './FileUploader'

    export default {
      name: 'newslide',
      components: {
        FileUploader
      },
      data () {
        return {
          name: null,
          text: null,
          url: false
        }
      },
      methods: {
        getUrl (url) {
          this.url = url
        },
        saveSlide () {
          db.collection('slides').add({
            name: this.name,
            text: this.text,
            url: this.url
          })
          .then(docRef => {
            console.log('Client added: ', docRef.id)
            this.$router.push('/')
          })
          .catch(error => {
            console.error('Error adding post: ', error)
          })
        }
      }
    }
</script>
