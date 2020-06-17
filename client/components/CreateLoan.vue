<template>
  <form>
    <div class="inputs">
      <client-only>
        <label for="username">Username:</label>
        <input required v-model="username" :disabled="true" type="text" name="username" />
      </client-only>
      <label for="title">Book Title:</label>
      <input required v-model="title" type="text" name="title" :disabled="true" />
      <label for="issueDate">Issue Date:</label>
      <input required v-model="issueValue" type="date" name="issueDate" :disabled="true" />
      <label for="dueDate">Due Date:</label>
      <input required v-model="dueDate" type="date" name="dueDate" />
    </div>
    <div class="buttons">
      <button type="submit" @click.prevent="createLoan">Add Book</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "CreateLoan",
  data() {
    return {
      username: "",
      title: "",
      issueValue: new Date(Date.now()).toISOString().split('T')[0],
      issueDate: new Date(Date.now()),
      dueDate: null
    };
  },
  methods: {
    createLoan(event) {
      const loan = {
        book: this.book._id,
        issueDate: this.issueDate,
        dueDate: new Date(this.dueDate)
      };
      this.$axios
        .post("http://127.0.0.1:5000/api/loans/create", loan, {
          headers: {
            authorization: this.$store.getters["authentication/getToken"]
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("loans/addLoan", res.data);
            this.$router.push("/loans");
          }
        });
    }
  },
  mounted() {
    this.username = this.$store.getters["authentication/getUsername"];
    this.book = this.$store.getters["books/getBooks"].filter(
      book => book._id === this.$nuxt.$route.params.bookId
    )[0];
    this.title = this.book.title;
  }
};
</script>


<style lang="scss" scoped>
form {
  margin-top: 40px;
  display: grid;
  grid-template-columns: 60% 40%;
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      outline: none;
      width: 180px;
      border: none;
      font-weight: 700;
      color: #000;
      text-transform: uppercase;
      border-radius: 15px;
      background: chartreuse;
      padding: 15px 0;
    }
    button:hover {
      background: rgb(151, 231, 71);
    }
  }
  .inputs {
    display: flex;
    flex-direction: column;
    input {
      border: 1px solid #000;
      padding: 5px 0 5px 5px;
      border-radius: 5px;
    }
    label {
      font-weight: 500;
    }
    input + label {
      margin-top: 10px;
    }
  }
}
</style>