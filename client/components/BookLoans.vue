<template>
  <section id="bookLoans">
    <h2>Loans List</h2>
    <div class="table">
      <div class="values">
        <span>№</span>
        <span>Issue Date</span>
        <span>Due Date</span>
        <span>Status</span>
      </div>
      <Loan
        :key="loan._id"
        :loan="loan"
        :index="index+1"
        :keyPage="false"
        v-for="(loan,index) in loans"
      />
    </div>
  </section>
</template>


<script>
import Loan from "./Loan";
export default {
  name: "BookLoans",
  components: {
    Loan: Loan
  },
  props: {
    loans: Array
  }
};
</script>

<style lang="scss" scoped>
section#bookLoans {
  border-top: 2px solid #000;
  padding-bottom: 20px;
  h2 {
    margin-top: 20px;
    margin-bottom:20px;
  }
  .table {
    display: flex;
    flex-direction: column;
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
}
</style>