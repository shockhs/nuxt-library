<template>
  <section id="loans">
    <header>
      <client-only placeholder="Loading...">
        <h3>
          Loans List -
          <span class="username">@{{username}}</span>
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
        <Loan
          :key="loan._id"
          :loan="loan"
          :refresh="refresh"
          :keyPage="true"
          v-for="loan in loans"
        />
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
        .get("http://127.0.0.1:5000/api/loans/", {
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
      .get("http://127.0.0.1:5000/api/loans/", {
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