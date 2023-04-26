<template>
  <form @submit.prevent="logout">
    <div class="form-group">
      <button type="submit" class="btn btn-outline-success btn-block">Log Out</button>
    </div>
  </form>
</template>

<script>
import toastr from 'toastr';

export default {
  methods: {
    async logout() {
      const user = JSON.parse(localStorage.getItem('user'));
      toastr.success(`Bye Bye, ${user.email}`);
      localStorage.removeItem('user');
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log("Session on Server destroyed!");
      } else if (response.status !== 200 ) {
        const errorData = await response.json();
        toastr.error(errorData.message || 'Oops! Something went wrong.');
      }
      this.$emit('logout-completed');
    },
  },
};
</script>
