<template>
  <div id="edit-slide" class="container">
    <h3>Edit slide</h3>
    <div class="row">
    <form @submit.prevent="updateSlide" class="col-sm-12">
      <div class="row">
        <div class="input-group col-sm-12">
          <input type="text" v-model="slide_id" required>
        </div>
      </div>
      <div class="row">
        <div class="input-group col-sm-12">
          <input type="text" v-model="name" required>
        </div>
      </div>
      <div class="row">
        <div class="input-group col-sm-12">
          <input type="text" v-model="text" required>
        </div>
      </div>
      <div class="row">
        <div class="input-group col-sm-12">
          <FileUploader v-on:url="getUrl" />
          <img class="img-fluid" v-if="url" :src="url" alt="">
        </div>
      </div>
      <button type="submit" class="btn">Submit</button>
      <router-link to="/slideredit" class="btn grey">Cancel</router-link>
    </form>
    <div class="fixed_bottom_btn">
      <button @click="deleteSlide" class="btn">Delete</button>
    </div>
  </div>
  </div>
</template>

<script>
  import { db } from '@/components/firebaseInit'
  import FileUploader from '@/elements/dashboard/FileUploader'

  export default {
    name: 'edit-slide',
    components: {
        FileUploader
    },
    data () {
      return {
        slide_id: null,
        name: null,
        text: null,
        url: null
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('slides').where('slide_id', '==', to.params.slide_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.slide_id = doc.data().slide_id
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
        db.collection('slides').where('slide_id', '==', this.$route.params.slide_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.slide_id = doc.data().slide_id
            this.name = doc.data().name
            this.text = doc.data().text
            this.url = doc.data().url
          })
        })
      },
      getUrl (url) {
          this.url = url
      },
      updateSlide () {
        db.collection('slides').where('slide_id', '==', this.$route.params.slide_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              slide_id: this.slide_id,
              name: this.name,
              text: this.text,
              url: this.url
            })
            .then(() => {
              this.$router.push('/slideredit');
            });
          })
        })
      },
      deleteSlide() {
        if (confirm('Are you sure?')) {
          db
            .collection('slides')
            .where('slide_id', '==', this.$route.params.slide_id)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref.delete();
                this.$router.push('/slideredit');
              });
            });
        }
      }
    }
  }
</script>