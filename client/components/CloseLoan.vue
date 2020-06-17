<template>
  <form>
    <input type="date" v-model="returnDate" />
    <input type="submit" value="Close" @click.prevent="closeLoan" />
  </form>
</template>

<script>
export default {
  name: "CloseLoan",
  props: {
    loanId: String
  },
  data() {
    return {
      returnDate: null
    };
  },
  methods: {
    closeLoan(event) {
      const loan = {
        loanId: this.loanId,
        returnDate: new Date(this.returnDate)
      };
      this.$axios
        .post("http://127.0.0.1:5000/api/loans/close", loan, {
          headers: {
            authorization: this.$store.getters["authentication/getToken"]
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.$router.push("/loans");
          }
        });
    }
  }
};
</script>