<template>
  <div class="books-elements">
    <div class="searchField">
      <input type="text" v-model="searchValue" class="searchInput" placeholder="Search title..." />
      <nuxt-link to="/books/add" class="addBook">Add Book</nuxt-link>
      <button @click.prevent="refreshList" class="addBook button">Refresh</button>
    </div>

    <client-only placeholder="Loading...">
      <transition-group tag="ul">
        <li :key="book.isbn" v-for="book in getBooks">
          <Book :book="book" />
        </li>
      </transition-group>
    </client-only>
  </div>
</template>



<script>
import Book from "./Book";
import { mapGetters } from "vuex";
export default {
  name: "ListOfBooks",
  components: {
    Book: Book
  },
  computed: {
    getBooks: function(value) {
      return this.$store.getters["books/getBooks"].filter(item => {
        if (item.title.toLowerCase().indexOf(this.searchValue) === 0) {
          return true;
        }
      });
    }
  },
  methods: {
    async refreshList() {
      await this.$axios.get("https://nuxt-library.herokuapp.com/api/books/").then(res => {
        if (res.status === 200) {
          this.$store.commit("books/setInitialBooks", res.data);
        }
      });
    }
  },
  beforeMount() {
    console.log(this.$refs.list);
    this.refreshList();
  },
  data() {
    return {
      searchValue: "",
      books: this.$store.getters["books/getBooks"]
    };
  },
  async created() {
    this.$axios.get("https://nuxt-library.herokuapp.com/api/books/").then(res => {
      if (res.status === 200) {
        this.$store.commit("books/setInitialBooks", res.data);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
.searchField {
  display: grid;
  grid-template-columns: 70% 15% 15%;
  height: 100%;
  .addBook {
    background-color: #0bcf5d;
    margin-bottom: 10px;
    margin-left: 5px;
    padding: 15px 0;
    color: #fff;
    font-weight: 500;
    border-radius: 10px;
    text-align: center;
    align-self: center;
    outline: none;
  }
  .button {
    border: none;
    font-size: 18px;
    background-color: #0b91cf;
  }
}
.books-elements {
  margin-top: 40px;
  padding: 20px 0;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  .book-item + .book-item {
    margin-top: 10px;
  }
  .searchInput {
    outline: none;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #0bcf5d;
    padding: 15px 0 15px 10px;
    margin-bottom: 10px;
    border-radius: 10px;
  }
}
</style>