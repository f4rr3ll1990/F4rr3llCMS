 <template>
    <!-- Navigation -->
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand">F4rr3LL Blog</router-link>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" href="/">Главная</router-link>
            </li>  
            <div v-for="cat in categories" v-bind:key="cat.category_id">
            <li class="nav-item">
              <router-link v-bind:to="{ name: 'category', params: { category_id: cat.category_id}}" class="nav-link" >{{ cat.name }}</router-link>
            </li>  
            </div>
            <li class="nav-item" v-if="isLoggedIn"><router-link class="nav-link" to="/dashboard">Управление</router-link></li>
            <li class="nav-item" v-if="!isLoggedIn"><router-link class="nav-link" to="/login">Вход</router-link></li>
            <li class="nav-item" v-if="!isLoggedIn"><router-link class="nav-link" to="/register">Регистрация</router-link></li>
            <li class="nav-item dropdown" v-if="isLoggedIn">
              <a class="nav-link dropdown-toggle" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-user"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
                <a class="dropdown-item" v-if="isLoggedIn">{{currentUser}}</a>
                <a class="dropdown-item" v-if="isLoggedIn" v-on:click="logout">Выход</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>

<script>
import firebase from "firebase";
import { db } from "./firebaseInit";

export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      categories: [],
      currentUser: false
    };
  },
  created: function() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
    
    db
      .collection("categories")
      .get()
      .then(querySnapshot => {
        // this.loading = false;
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
    logout: function(e) {
      e.preventDefault();
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<style scoped>
.email {
  padding-right: 10px;
}
</style>