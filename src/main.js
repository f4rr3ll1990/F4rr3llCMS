// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from '@/store/store'
import router from './router';
import firebase from 'firebase';
import '@/components/firebaseInit';
import wysiwyg from "vue-wysiwyg";
import moment from 'vue-moment'
import VueLazyload from 'vue-lazyload'


Vue.use(wysiwyg, {});
Vue.use(moment);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: 'src/assets/loading.gif',
  attempt: 1
});


Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: {
        App
      },
      created() {
        this.$store.dispatch('fetchData');
      }
    });
  }
});
