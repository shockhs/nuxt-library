<template>
  <div class="loan">
    <div class="column">{{loan.title}}</div>
    <div class="column">{{new Date(loan.issueDate).toISOString().slice(0,10)}}</div>
    <div class="column">{{new Date(loan.dueDate).toISOString().slice(0,10)}}</div>
    <div
      v-if="loan.returnDate"
      class="column"
    >{{new Date(loan.returnDate).toISOString().slice(0,10)}}</div>
    <div v-else class="column">-</div>
    <StatusSpan :status="loan.status" />
    <LoanButton :refresh="refresh" :status="loan.status" :keyPage="keyPage" :loanId="loan._id" />
  </div>
</template>


<script>
import StatusSpan from "./elements/StatusSpan";
import LoanButton from "./elements/LoanButton";
export default {
  name: "Loan",
  components: {
    StatusSpan: StatusSpan,
    LoanButton: LoanButton
  },
  props: {
    loan: {},
    keyPage: Boolean,
    refresh: Function
  }
};
</script>

<style lang="scss" scoped>
.loan {
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin-bottom: 10px;
}
.column:nth-child(n + 2) {
  border-left: 3px solid #16b357;
}
.column {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}
</style>