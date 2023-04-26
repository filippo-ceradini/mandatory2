<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card bg-dark text-white">
          <div class="card-header">
            <h1 class="card-title">Welcome</h1>
          </div>
          <div class="card-body">
            <p>Sign Up Here!</p>
            <router-link to="/login">
              <button class="btn btn-outline-light">Already Signed Up?</button>
            </router-link>
            <form @submit.prevent="signup">
              <div class="form-group">
                <label for="email-input">Email</label>
                <input
                    id="email-input"
                    class="form-control bg-dark text-white"
                    name="email"
                    autocomplete="off"
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
                    autocomplete="off"
                    placeholder="password"
                    required
                    v-model="password"
                />
              </div>
              <div class="form-group">
                <label for="confirm-password-input">Confirm Password</label>
                <input
                    id="confirm-password-input"
                    class="form-control bg-dark text-white"
                    type="password"
                    name="confirm-password"
                    autocomplete="off"
                    placeholder="confirm password"
                    required
                    v-model="confirmPassword"
                />
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-outline-success">Sign up</button>
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
      email: '',
      password: '',
      confirmPassword: '', // add this line
      message: '',
    };
  },
  methods: {
    async signup() {
      try {
        if (this.password !== this.confirmPassword) {
          toastr.error('Passwords do not match!');
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
          toastr.error('Please enter a valid email address!');
          return;
        }
        const response = await fetch('http://localhost:8080/new-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: this.password,
            email: this.email,
          }),
        });
        if (response.ok) {
          toastr.success('SignUp successful!');
          this.$router.push('/login');
        } else {
          const errorData = await response.json();
          toastr.error(errorData.message || 'Oops! Something went wrong.');
        }
      } catch (error) {
        console.error(error);
        toastr.error('Oops! Something went wrong.');
      }
    },
  },
};
</script>
<style>


</style>