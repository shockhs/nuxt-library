<template>
  <section id="loans">
    <header>
      <client-only placeholder="Loading...">
        <h3>
          Loans List -
          <span
            class="username"
          >@{{username === null && username===undefined ? 'unknown' : username}}</span>
        </h3>
      </client-only>
      <button @click.prevent="refresh" class="refresh">Refresh</button>
    </header>
    <div class="table">
      <div class="values">
        <span>Title</span>
        <span>Issue Date</span>
        <span>Due Date</span>
        <span>Return Date</span>
        <span>Status</span>
        <span>Action</span>
      </div>
      <client-only placeholder="Loading...">
        <transition-group name="staggered-fade" tag="ul">
          <li :key="loan._id" v-for="loan in loans" :data-index="index">
            <Loan :loan="loan" :refresh="refresh" :keyPage="true" />
          </li>
        </transition-group>
      </client-only>
    </div>
  </section>
</template>

<script>
import Loan from "../../components/Loan";
export default {
  components: {
    Loan: Loan
  },
  data() {
    return {
      loans: null,
      username: ""
    };
  },
  methods: {
    refresh() {
      this.$axios
        .get("https://nuxt-library.herokuapp.com/api/loans/", {
          headers: {
            authorization: this.$store.state.authentication.authToken
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("loans/setLoans", res.data);
            this.loans = res.data;
          }
        });
    }
  },
  beforeMount() {
    this.$axios
      .get("https://nuxt-library.herokuapp.com/api/loans/", {
        headers: {
          authorization: this.$store.state.authentication.authToken
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.$store.commit("loans/setLoans", res.data);
          this.loans = res.data;
        }
      });
  },
  mounted() {
    if (!this.$store.state.authentication.authToken)
      this.$router.push("/login");
    this.username = this.$store.getters["authentication/getUsername"];
  }
};
</script>

<style lang="scss" scoped>
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
section {
  margin-top: 30px;
}

h2 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.username {
  color: rgb(4, 141, 233);
}
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.refresh {
  background-color: rgb(4, 141, 233);
  color: #fff;
  padding: 5px 0;
  outline: none;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100px;
}
.table {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
}
.values {
  border-bottom: 2px solid #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  span {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>