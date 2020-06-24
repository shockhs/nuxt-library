<template>
  <div v-if="keyPage" class="column">
    <div v-if="status==='inProgress' || status==='overdue'">
      <button @click.prevent="closeClick" class="close">Close</button>
    </div>
    <div v-if="status==='closed'">
      <button @click.prevent="deleteClick" class="close delete">Delete</button>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    status: String,
    keyPage: Boolean,
    loanId: String,
    refresh: Function
  },
  methods: {
    closeClick() {
      this.$router.push(`/loans/${this.loanId}/close`);
    },
    deleteClick() {
      this.$axios
        .delete(`https://nuxt-library.herokuapp.com/api/loans/loanId=${this.loanId}`, {
          headers: {
            authorization: this.$store.state.authentication.authToken
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.refresh();
          }
        });
    }
  }
};
</script>

.<style lang="scss" scoped>
.close {
  width: 150px;
  height: 30px;
  border: none;
  border: 1px solid #000;
  outline: none;
  border-radius: 5px;
  background-color: transparent;
  text-transform: uppercase;
  color: #df1739;
  font-weight: 500;
}
.delete {
  background-color: #df1739;
  border: none;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
}
</style>