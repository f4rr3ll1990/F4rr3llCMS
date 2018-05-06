<template>
  <div id="edit-category" class="container">
    <h3>Edit Category</h3>
    <div class="row">
    <form @submit.prevent="updateCategory" class="col-sm-12">
      <div class="row">
        <div class="input-group col-sm-12">
          <input type="text" v-model="name" v-on:keyup="translitFunc()" />
        </div>
      </div>
      <div class="row">
        <div class="input-group col-sm-12">
          <input type="text" v-model="category_id" />
        </div>
      </div>
      <button type="submit" class="btn">Submit</button>
      <router-link to="/" class="btn grey">Cancel</router-link>
    </form>
    <div class="fixed_bottom_btn">
      <button @click="deleteCategory" class="btn">Delete</button>
    </div>
  </div>
  </div>
</template>

<script>
  import { db } from './firebaseInit'
  import translit from 'cyrillic-to-translit-js'

  export default {
    name: 'edit-category',
    data () {
      return {
        category_id: null,
        name: null
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('categories').where('category_id', '==', to.params.category_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.category_id = doc.data().category_id
            vm.name = doc.data().name
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('categories').where('category_id', '==', this.$route.params.category_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.category_id = doc.data().category_id
            this.name = doc.data().name
          })
        })
      },
      translitFunc() {
        this.category_id = translit().transform(this.name, "-").toLowerCase();
      },
      updateCategory () {
        db.collection('categories').where('category_id', '==', this.$route.params.category_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              category_id: this.category_id,
              name: this.name
            })
            .then(() => {
              this.$router.push('/dashboard-categories')
            });
          })
        })
      },
      deleteCategory() {
        if (confirm('Are you sure?')) {
          db
            .collection('categories')
            .where('category_id', '==', this.$route.params.category_id)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref.delete();
                this.$router.push('/dashboard-categories');
              });
            });
        }
      }
    }
  }
</script>