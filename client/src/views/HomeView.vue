<template>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card bg-dark text-white">
          <div className="card-header">
            <h1 className="card-title">Welcome {{ currentUser.email }}!</h1>
          </div>
          <div className="card-body">
            <div className="embed-responsive embed-responsive-16by9 mb-4">
              <video className="embed-responsive-item" controls autoPlay>
                <source src="https://bit.ly/3BlS71b" type="video/mp4">
              </video>
            </div>
            <LogoutButton @logout-completed="handleLogout"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoutButton from '@/components/LogoutButton.vue';

export default {
  components: {
    LogoutButton,
  },
  data() {
    return {
      currentUser: null,
    };
  },
  created() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  },
  methods: {
    handleLogout() {
      this.currentUser = null;
      this.$router.push('/login');
    },
  },
};
</script>

<style>
.card {
  max-width: 500px;
  margin-top: 50px;
}
</style>
