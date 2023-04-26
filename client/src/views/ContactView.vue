<template>
  <div class="container">
    <h2>Contact Us</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter your name"
            v-model="name"
            required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter your email"
            v-model="email"
            required
        />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea
            class="form-control"
            id="message"
            rows="3"
            placeholder="Enter your message"
            v-model="message"
            required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </button>
    </form>
  </div>
</template>

<script>
import toastr from 'toastr';

export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      isSubmitting: false,
    };
  },
  methods: {
    async submitForm(event) {
      event.preventDefault();
      this.isSubmitting = true;

      // Replace this URL with your API endpoint for sending emails.
      const apiUrl = 'http://localhost:8080/send-email';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            message: this.message,
          }),
        });

        if (response.ok) {
          toastr.success('Your message has been sent successfully!');
          this.$router.push('/');
        } else {
          toastr.error(
              'There was an error sending your message. Please try again later.'
          );
        }
      } catch (error) {
        console.error('Error:', error);
        toastr.error(
            'There was an error sending your message. Please try again later.'
        );
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>