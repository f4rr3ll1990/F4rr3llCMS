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
              <router-link to="/" class="nav-link" href="/">Home</router-link>
            </li>            
            <li class="nav-item" v-if="isLoggedIn"><router-link class="nav-link" to="/dashboard">Dashboard</router-link></li>
            <li class="nav-item" v-if="!isLoggedIn"><router-link class="nav-link" to="/login">Login</router-link></li>
            <li class="nav-item" v-if="!isLoggedIn"><router-link class="nav-link" to="/register">Register</router-link></li>
            <li class="nav-item" v-if="isLoggedIn"><span class="nav-link" >{{currentUser}}</span></li>
            <li class="nav-item" v-if="isLoggedIn"><a class="nav-link" v-on:click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </template>

<script>
import firebase from "firebase";
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
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