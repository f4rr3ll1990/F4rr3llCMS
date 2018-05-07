<template>
<nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <router-link :to="'/'" tag="a" class="navbar-brand"><img src="@/assets/f4.png" alt="" class="logo img-fluid"></router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link :to="'/'" tag="a" class="nav-link">Главная</router-link>
      </li>
      <li class="nav-item" v-for="cat in categories" v-bind:key="cat.category_id">
        <router-link v-bind:to="{ name: 'category', params: { category_id: cat.category_id}}" class="nav-link" >{{ cat.name }}</router-link>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
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
</nav>
</template>


<script>
import firebase from "firebase";
import { db } from "@/components/firebaseInit";

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
.logo {
  max-height: 30px; 
}
.nav-link {
  color: #fff !important;
}
</style>