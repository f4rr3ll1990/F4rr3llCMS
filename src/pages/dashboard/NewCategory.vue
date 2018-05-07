<template>
<div class="container">
  <div id="new-category">
    <h3>New Category</h3>
    <div class="row">
    <form @submit.prevent="saveCategory" class="col-sm-12" novalidate>
      <div class="row">
        <div class="input-field col-sm-12">
          <input type="text" v-model="name" v-on:keyup="translitFunc()">
          <label>Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col-sm-12">
          <input type="text" v-model="category_id">
          <label>Category URL#</label>
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
    import translit from 'cyrillic-to-translit-js'

    export default {
      name: 'new-category',
      data () {
        return {
          category_id: null,
          name: null
        }
      },
      methods: {
        translitFunc() {
          this.category_id = translit().transform(this.name, "-").toLowerCase();
        },
        saveCategory () {
          db.collection('categories').add({
            category_id: this.category_id,
            name: this.name
          })
          .then(docRef => {
            console.log('Client added: ', docRef.post_id)
            this.$router.push('/dashboard-categories')
          })
          .catch(error => {
            console.error('Error adding category: ', error)
          })
        }
      }
    }
</script>
