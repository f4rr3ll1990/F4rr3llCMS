<template>
  <div id="app">
    <Navbar />
      <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import NewPost from './components/NewPost';

export default {
  name: 'app',
  components: {
    Navbar,
    NewPost
  }
};
</script>

<style>

body {
  padding-top: 54px;
}

@media (min-width: 992px) {
  body {
    padding-top: 56px;
  }
}

.carousel-item {
  height: 65vh;
  min-height: 300px;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.portfolio-item {
  margin-bottom: 30px;
}
.fixed_bottom_btn {
  position: fixed;
  bottom: -4px;
  right: 10px;
}
</style>
