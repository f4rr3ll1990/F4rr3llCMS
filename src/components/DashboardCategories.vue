<template>
<div class="container">
  <div id="dashboard-categories" class="row">
    <div class="col-sm-10">
        <router-link to="/new-category" class="btn">
            <i class="fa fa-plus"></i> Создать категорию
        </router-link>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">url</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cat in categories" v-bind:key="cat.category_id">
                    <td>
                        {{cat.name}}
                    </td>
                    <td>
                        {{cat.category_id}}
                    </td>
                    <td>
                        <router-link v-bind:to="{ name: 'edit-category', params: { category_id: cat.category_id }}" class="btn">
                            <i class="fa fa-pencil"></i>
                        </router-link>
                    </td>
                </tr>        
            </tbody>
        </table>
    </div>
    <DashSidebar />
  </div>
</div>
</template>

<script>
import { db } from "./firebaseInit";
import DashSidebar from "./DashSidebar";
export default {
  name: "dashboard-categories",
  components: {
      DashSidebar
  },
  data() {
    return {
      categories: [],
      loading: true
    };
  },
  created() {
    db
      .collection("categories")
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            category_id: doc.data().category_id,
            name: doc.data().name
          };
          this.categories.push(data);
        });
      });
  }
};
</script>

<style scoped>

</style>
