<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input v-model="email" type="text" />
      <input v-model="password" type="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data: () => {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    async onSubmit() {
      await this.$axios
        .$post("http://127.0.0.1:5000/api/user/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("authentication/setToken", res.token);
            this.$store.dispatch("authentication/setUserAction", res.token);
            this.$router.push("/");
          } else {
            this.error = res;
          }
        });
    }
  }
};
</script>