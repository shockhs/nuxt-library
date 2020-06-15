<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input v-model="name" type="text" />
      <input v-model="email" type="text" />
      <input v-model="password" type="password" />
      <button type="submit">Login</button>
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
        .$post("http://127.0.0.1:5000/api/user/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(res => console.log(res));
    }
  }
};
</script>