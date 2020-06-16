<template>
  <CloseLoan :loanId="loanId" />
</template>

<script>
import CloseLoan from "../../../components/CloseLoan";
export default {
  components: {
    CloseLoan: CloseLoan
  },
  data() {
    return {
      loanId: this.$nuxt.$route.params.id
    };
  }
};
</script>