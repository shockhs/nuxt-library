<template>
  <header class="header">
    <nuxt-link exact active-class="active" to="/">
      <div class="header__logotype"><h2>library-nuxt</h2></div>
    </nuxt-link>
    <ul class="header__navigation">
      <li :key="'nav1'">
        <nuxt-link exact active-class="active" to="/">Books</nuxt-link>
      </li>
      <li :key="'nav2'">
        <nuxt-link exact active-class="active" to="/loans">Loans</nuxt-link>
      </li>
      <li :key="'nav3'" v-if="!status">
        <nuxt-link active-class="active" to="/login">Login</nuxt-link>
      </li>
      <li :key="'nav4'" v-if="!status">
        <nuxt-link active-class="active" to="/register">Register</nuxt-link>
      </li>
      <li :key="'nav5'" v-if="status">
        <a href="#" @click.prevent="logoutUser" target="_blank" class="button--grey">Logout</a>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  props: {
    status: Boolean
  },
  methods: {
    logoutUser() {
      document.cookie = "vuex= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      this.$store.commit("authentication/clearData");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  height: 10vh;
  grid-template-columns: 20% 60% 20%;
  &__logotype {
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
  }
  align-items: center;
  &__navigation {
    display: flex;
    justify-content: space-between;
    list-style: none;
    .active {
      color: red;
    }
  }
}
</style>
