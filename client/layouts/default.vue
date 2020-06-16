<template>
  <div class="container">
    <client-only placeholder="Loading...">
      <Header :status="getCurrenStatus()" />
    </client-only>
    <nuxt />
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  components: {
    Header: Header
  },
  methods: {
    getCurrenStatus() {
      return this.$store.getters["authentication/status"];
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Montserrat", sans-serif;
}

img,
a,
button,
ul,
li,
ol {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  width: 1240px;
  margin: 0 auto;
}
.center {
  display: flex;
  justify-content: center;
}

a,
button {
  cursor: pointer;
}
</style>

