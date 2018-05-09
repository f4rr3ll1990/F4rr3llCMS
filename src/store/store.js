import Vue from  'vue'
import Vuex from 'vuex'
import { db } from "@/components/firebaseInit"

Vue.use(Vuex)

const store = new Vuex.Store({
  state : {
    posts: [],
    slides: []
  },
  mutations : {
    setPosts: function (state, data) {
      state.posts.push(data);
    },
    setSlides: function (state, data) {
      state.slides.push(data);
    }
  },
  actions : {
    fetchData ({ commit }) {      
      NProgress.start();
      console.log('Fetching data');
        db
        .collection("posts")
        .get()
        .then(querySnapshot => {
          // this.loading = false;
          querySnapshot.forEach(doc => {
            const data = {
              post_id: doc.data().post_id,
              category_id: doc.data().category_id,
              name: doc.data().name,
              description: doc.data().description,
              text: doc.data().text,
              url: doc.data().url,
              date: doc.data().date
            };
            commit('setPosts', data );
          });
        });
        db
        .collection("slides")
        .get()
        .then(querySnapshot => {
          // this.loading = false;
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              name: doc.data().name,
              text: doc.data().text,
              url: doc.data().url
            };
            commit('setSlides', data );
          });
        });
      NProgress.done();
    } // Fetsch Data
  }
});



export default store;