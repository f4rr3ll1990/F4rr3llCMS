<template>
  <div id="comments">
      <div class="row">
          <div class="col-md-12 mt-5" v-for="comment in comments" :key="comment.comment_id">
                <div class="media">
                    <img class="mr-3" src="src/assets/ava.svg" alt="Generic placeholder image">
                    <div class="media-body">
                        <h5 class="mt-0">{{ comment.author }}</h5>
                        {{ comment.text }}
                    </div>
                </div>
          </div>
          <div class="col-md-12">
            <hr>
          </div>
          <div class="col-md-12 mt-2 mb-5">
                <div class="media">
                    <img class="mr-3" src="src/assets/ava.svg" alt="Generic placeholder image">
                    <div class="media-body">
                        <input type="text" v-model="author" class="form-control" placeholder="Имя" />                        
                        <div class="input-group">
                          <textarea class="form-control" v-model="text" aria-describedby="comment-send" placeholder="Текст"></textarea>                          
                          <div class="input-group-append">
                           <span class="input-group-text" @click="sendComment" id="comment-send">Отправить</span>
                          </div>
                        </div>
                    </div>

                </div>
          </div>
      </div>
  </div>
</template>

<script>
import { db } from '@/components/firebaseInit'

export default {
  name: "comments",
  props: ["postid"],
  data() {
    return {
        comments: [],
        author: '',
        text: ''
    };
  },
  created() {
    let payload = {'postid': this.postid}
    db.collection('comments').where('post_id', '==', this.postid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = {
            comment_id: doc.id,
            author: doc.data().author,
            text: doc.data().text
        }
        this.comments.push(data);
      })
    })
  },
  methods: {
      sendComment() {
        let newcomment = {
            post_id: this.postid,
            author: this.author,
            text: this.text,
            date: Date.now()
        }
        db.collection('comments').add(newcomment)
        .then((data) => {
            const post = {
                comment_id: data.id,
                author: newcomment.author,
                text: newcomment.text
            }
            this.comments.push(post);
            this.author = '';
            this.text = '';
        })
      }
  }
};
</script>

<style scoped>

</style>


