// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase';
import '@/components/firebaseInit';
import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {}); // config is optional. more below
Vue.use(require('vue-moment'));
Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: {
        App
      }
    });
  }
});
