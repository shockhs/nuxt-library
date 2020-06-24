<template>
  <div class="book-item">
    <div class="book-item__image">
      <a :href="/books/+book._id">
        <img :src="book.imageUrl" :alt="book.title" />
      </a>
    </div>
    <div class="book-item__description">
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
        <span v-if="book.status==='available'" class="status">{{book.status}}</span>
        <span v-else class="status red">{{book.status}}</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Book",
  props: {
    book: Object
  },
  methods: {
    viewClick() {
      this.$router.push(`/books/${this.book._id}`);
    }
  }
};
</script>

<style lang="scss">
.book-item {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  border: 1px solid #0bcf5d;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  &__image {
    display: flex;
    justify-content: center;
    img {
      width: 150px;
      height: 200px;
      border-radius: 10px;
    }
  }
  &__actions {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    button {
      outline: none;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      background-color: rgb(0, 153, 255);
      font-weight: 500;
      color: #fff;
      text-transform: uppercase;
    }
  }
  &__description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 30px;
    .property + .property {
      margin-top: 15px;
    }
    .type {
      font-weight: 700;
    }
    .options {
      margin-top: 20px;
      .status {
        border-radius: 10px;
        background: chartreuse;
        color: #fff;
        padding: 5px 30px;
        font-weight: 500;
        text-transform: uppercase;
      }
      .red {
        background-color: #cf0b1b;
      }
    }
  }
}
</style> 