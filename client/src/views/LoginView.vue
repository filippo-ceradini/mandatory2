<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card bg-dark text-white">
          <div class="card-header">
            <h1 class="card-title">Welcome</h1>
          </div>
          <div class="card-body">
            <p>Log in Here</p>
            <router-link to="/signup">
              <button class="btn btn-outline-light">Sign Up</button>
            </router-link>
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email-input">Email</label>
                <input
                    id="email-input"
                    class="form-control bg-dark text-white"
                    name="email"
                    placeholder="email@example.com"
                    required
                    v-model="email"
                />
              </div>
              <div class="form-group">
                <label for="password-input">Password</label>
                <input
                    id="password-input"
                    class="form-control bg-dark text-white"
                    type="password"
                    name="password"
                    placeholder="password"
                    required
                    v-model="password"
                />
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-outline-success">Log in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr';
export default {
  data() {
    return {
      email: 'bob@bob.com',
      password: 'bob'
    };
  },
  methods: {
    async login() {
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
          toastr.error('Please enter a valid email address!');
          return;
        }
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: this.password,
            email: this.email,
          }),
        });
        if (response.status === 200) {
          const currentUser = { email: this.email, password: this.password };
          this.$store.commit('setUser', currentUser);
          localStorage.setItem('user', JSON.stringify(currentUser));
          toastr.success("Login successful!");
          this.$router.push('/');
        } else if (response.status !== 200 ) {
          const errorData = await response.json();
          toastr.error(errorData.message || 'Oops! Something went wrong.');
        }
      } catch (error) {
        console.error(error);
        toastr.error("Oops! Something went wrong.");
      }
    },
  },
};
</script>
<style>


</style>