<template>
  <div class="authorization">
    <form class="authForm" @submit.prevent="onSubmit">
      <div class="inputForm">
        <label for="email" name="email">Email:</label>
        <input v-model="email" type="text" />
      </div>
      <div class="inputForm">
        <label for="password" name="password">Password:</label>
        <input v-model="password" type="password" />
      </div>
      <button class="buttonForm" type="submit">Login</button>
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
        .$post("https://nuxt-library.herokuapp.com/api/user/login", {
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


<style lang="scss">
.authorization {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.authForm {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.inputForm {
  width: 400px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 25% 75%;
  label {
    font-weight: 500;
  }
  input{
    font-size: 16px;
  }
}
.buttonForm{
  width: 150px;
  margin-top: 10px;
  padding: 5px 0;
  border: none;
  background-color: #0bcf5d;
  color:#fff;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 500;
  border-radius: 5px;
}
</style>