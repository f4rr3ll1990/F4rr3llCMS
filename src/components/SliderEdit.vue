<template>
  <div id="slideredit" class="row">
    <div class="col-sm-10">
        <router-link to="/newslide" class="btn">
            <i class="fa fa-plus"></i> Создать слайд
        </router-link>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Text</th>
                <th scope="col">Image</th>
                <th scope="col">Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="slide in slides" v-bind:key="slide.id">
                    <td>
                        {{slide.name}}
                    </td>
                    <td>
                        {{slide.text}}
                    </td>
                    <td>
                        <img class="img-fluid" :src="slide.url" alt="">
                    </td>
                    <td>
                        <router-link v-bind:to="{ name: 'edit-slide', params: { id: slide.id }}" class="btn">
                            <i class="fa fa-pencil"></i>
                        </router-link>
                    </td>
                </tr>        
            </tbody>
        </table>
    </div>
    <DashSidebar />
  </div>
</template>

<script>
import { db } from "./firebaseInit";
import DashSidebar from "./DashSidebar";
export default {
  name: "slideredit",
  components: {
      DashSidebar
  },
  data() {
    return {
      slides: [],
      loading: true
    };
  },
  created() {
    db
      .collection("slides")
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            name: doc.data().name,
            text: doc.data().text,
            url: doc.data().url
          };
          this.slides.push(data);
        });
      });
  }
};
</script>

<style scoped>

</style>
