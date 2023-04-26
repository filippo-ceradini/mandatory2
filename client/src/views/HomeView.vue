<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card bg-dark text-white">
          <div class="card-header">
            <h1 class="card-title">Welcome  {{ currentUser.email }}!</h1>
          </div>
          <div class="card-body">
            <div class="embed-responsive embed-responsive-16by9 mb-4">
              <video class="embed-responsive-item" controls autoplay>
                <source src="https://bit.ly/3BlS71b" type="video/mp4">
              </video>
            </div>
            <form @submit.prevent="logout()">
              <div class="form-group">
                <button type="submit" class="btn btn-outline-success btn-block">Log Out</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr'
export default {
  data() {
    return {
      currentUser: null,
    }
  },
  created() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  },
  methods: {
    logout() {
      toastr.success(`Bye Bye, ${this.currentUser.email}`);
      this.currentUser = null;
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
  },
}
</script>

<style>
.card {
  max-width: 500px;
  margin-top: 50px;
}

</style>
