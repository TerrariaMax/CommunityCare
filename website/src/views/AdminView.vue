<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center">Admin Dashboard</h1>
        <p class="text-center">Manage user data and reviews.</p>

        <div class="text-center mt-4">
          <button type="submit" class="btn btn-primary me-2" @click="clearUser">Clear User</button>
          <button type="submit" class="btn btn-primary me-2" @click="clearReviews">
            Clear Reviews
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['clearUser', 'clearReviews'])
  }
}
</script>

<style scoped>
.btn {
  margin: 10px;
}
</style>
