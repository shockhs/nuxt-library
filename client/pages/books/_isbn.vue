<template>
  <section id="book">
    <div v-if="book" class="book-card">
      <div class="imageBook">
        <img :src="book.imageUrl" :alt="book.title" />
      </div>
      <div class="description">
        <div class="about">
          <span class="property">
            <span class="type">ISBN:</span>
            {{book.isbn}}
          </span>
          <span class="property">
            <span class="type">Title:</span>
            {{book.title}}
          </span>
          <span class="property">
            <span class="type">Author:</span>
            {{book.author}}
          </span>

          <div class="options">
            <span class="status">{{book.status}}</span>
          </div>
        </div>
        <div class="actions">
          <button @click.prevent="takeBookClick">Take book</button>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </section>
</template>

<script>
export default {
  name: "Book",
  methods: {
    takeBookClick() {
      this.$router.push('/loans/new')
    }
  },
  data() {
    return {
      book: null
    };
  },
  created() {
    this.$axios
      .get(
        `http://127.0.0.1:5000/api/books/isbn=${this.$nuxt.$route.params.isbn}`
      )
      .then(res => {
        if (res.status === 200) {
          this.book = res.data;
        }
      });
  }
};
</script>

<style lang="scss" scoped>
.actions {
  justify-self: center;
  button {
    margin-top: 20px;
    border: none;
    outline: none;
    font-weight: 500;
    font-size: 20px;
    padding: 10px 40px;
    border-radius: 10px;
    background-color: rgb(0, 153, 255);
    color: #fff;
    text-transform: uppercase;
  }
}
.imageBook {
  img {
    width: 400px;
    height: 600px;
  }
}
.book-card {
  height: 90vh;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.description {
  display: grid;
  height: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 50% 50%;
}
.about {
  align-self: center;
  display: flex;
  flex-direction: column;
}
.about::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  margin-top: 40px;
  background-color: #0bcf5d;
}

.type {
  font-weight: 700;
}
.status {
  border-radius: 10px;
  background: chartreuse;
  color: #fff;
  padding: 5px 30px;
  font-weight: 500;
  text-transform: uppercase;
}
.options {
  margin-top: 20px;
}
</style>

