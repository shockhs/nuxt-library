<template>
  <form class="loanForm">
    <div class="inputForm">
      <label for="returnDate">Return Date:</label>
      <input type="date" v-model="returnDateValue" name="returnDate" :disabled="true"/>
    </div>
    <button class="buttonForm" @click.prevent="closeLoan">Close</button>
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
      returnDate: new Date(Date.now()),
      returnDateValue: new Date(Date.now()).toISOString().split('T')[0],
      message: null
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
          if (res.data.status === 200) {
            this.$router.push("/loans");
          } else {
            this.message = res.data.message;
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.inputForm {
  width: 400px;
  margin-bottom: 10px;
  display: grid;
  align-items: center;
  grid-template-columns: 35% 65%;
  label {
    font-weight: 500;
  }
  input {
    font-size: 16px;
  }
}
.buttonForm {
  width: 150px;
  margin-top: 10px;
  padding: 5px 0;
  border: none;
  background-color: #0bcf5d;
  color: #fff;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 500;
  border-radius: 5px;
  outline: none;
}
</style>