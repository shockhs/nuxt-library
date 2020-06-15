<template>
  <form>
    <div class="inputs">
      <label for="isbn">ISBN (13 characters):</label>
      <input required v-model="isbn" type="text" name="isbn" maxlength="13" minlength="10" />
      <label for="isbn">Title:</label>
      <input required v-model="title" type="text" name="title" />
      <label for="isbn">Author:</label>
      <input required v-model="author" type="text" name="author" />
      <label for="isbn">NumberOfCopies:</label>
      <input required v-model="numberOfCopies" type="number" name="numberOfCopies" />
      <label for="isbn">Image URL:</label>
      <input required v-model="imageUrl" type="text" name="imagurl" />
    </div>
    <div class="buttons">
      <button type="submit" @click.prevent="addBook">Add Book</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddBook",
  data() {
    return {
      isbn: "",
      title: "",
      author: "",
      imageUrl: "",
      numberOfCopies: ""
    };
  },
  methods: {
    addBook(event) {
      const book = {
        isbn: this.isbn,
        title: this.title,
        author: this.author,
        imageUrl: this.imageUrl,
        numberOfCopies: this.numberOfCopies
      };
      this.$axios
        .post("http://127.0.0.1:5000/api/books/add", book, {
          headers: {
            authorization: this.$store.getters["authentication/getToken"]
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("books/addBook", res.data);
            this.book = {
              isbn: "",
              title: "",
              author: "",
              imageUrl: "",
              numberOfCopies: ""
            };
          }
        });
    }
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