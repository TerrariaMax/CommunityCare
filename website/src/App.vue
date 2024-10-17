<script setup>
import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
import LibraryRegistrationForm from './views/HomeView.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="main-container">
    <header v-if="showHeader">
      <NavBar />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import CountBookAPI from './views/CountBookAPI.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    CountBookAPI
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI'
    }
  }
}
</script>

<!-- <template>
  <header>
    <NavBar />
  </header>

  <main class="container">
    <router-view></router-view>
  </main>
</template> -->

<style>
/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}

.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}
</style>
