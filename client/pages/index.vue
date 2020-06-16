<template>
  <section id="allBooks">
    <ListOfBooks />
  </section>
</template>

<script>
import ListOfBooks from "../components/ListOfBooks";

export default {
  name: "Homepage",
  components: {
    ListOfBooks: ListOfBooks
  },
  beforeMount() {
    const header = this.$store.state.authentication.authToken
      ? { authorization: this.$store.state.authentication.authToken }
      : this.$router.push("/login");
    this.$axios
      .$get("http://127.0.0.1:5000/api/user/login", {
        withCredentials: true,
        headers: header
      })
      .then(res => {
        if (res.status === 200) {
          this.$store.commit("authentication/setUser", res.user);
        }
      });
  }
};
</script>

<style>
</style>

