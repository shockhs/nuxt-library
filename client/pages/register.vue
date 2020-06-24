<template>
  <div class="authorization">
    <form class="authForm" @submit.prevent="onSubmit">
      <div class="inputForm">
        <label for="name">Username:</label>
        <input v-model="name" type="text" name="username" />
      </div>
      <div class="inputForm">
        <label for="email">Email:</label>
        <input v-model="email" type="text" />
      </div>
      <div class="inputForm">
        <label for="password">Password:</label>
        <input v-model="password" type="password" />
      </div>
      <button class="buttonForm" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data: () => {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      this.$axios
        .$post("https://nuxt-library.herokuapp.com/api/user/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(res => console.log(res));
    }
  }
};
</script>