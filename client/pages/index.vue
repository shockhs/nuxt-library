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
  mounted() {
    if (!this.$store.state.authentication.authToken)
      this.$router.push("/login");
  }
};
</script>

<style>
</style>

