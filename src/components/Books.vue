<template>
  <ul class="books-list">
    <li :id="`book_${index}`" class="books-list__book" v-for="(book, index) in books" :key="`book-${index}`" tabindex="-1">
      <div class="books-list__book__details">
        <span class="book__title">{{book.title}}</span>
        <span class="book__author">by {{book.author}}</span>
        
        <form v-if="book.editing" class="book-form" id="editBook" @submit.prevent="toggleEdit(index)">
          <div class="book-form__field-wrapper">
            <label class="book-form__label" :for="`title_${index}`">
              <span class="book-form__label__text">Title</span>
              <input type="text" v-model="book.title" :title="`title_${index}`" :id="`title_${index}`"/>
            </label>
          </div>

          <div class="book-form__field-wrapper">
            <label class="book-form__label" :for="`author_${index}`">
              <span class="book-form__label__text">Author</span>
              <input type="text" v-model="book.author" :title="`author_${index}`" :id="`author_${index}`"/>
            </label>
          </div>

          <div class="book-form__field-wrapper">
            <button class="btn" type="submit">Done Editing</button>
          </div>
        </form>
      </div>
      <ul class="book-options">
        <li class="book-options__option">
          <a href="javascript:(void)" @click.prevent="toggleEdit(index)" :title="`Edit ${book.title}`">
            <span v-if="!book.editing">edit</span>
            <span v-else>editing...</span>
          </a>
        </li>
        <li class="book-options__option">
          <a href="javascript:(void)" @click.prevent="deleteBook(index)" :title="`Remove ${book.title}`">delete</a>
        </li>
      </ul>
    </li>

    <li v-if="books.length == 0" class="books-list__book">
      <p class="full-width">
        Uh oh, you don't have any books yet!<br/>
        Add a book to get started.
      </p>
    </li>
  </ul>
</template>

<script>
import { focusTitleField } from '../helpers.js';
export default {
  name: 'Books',
  computed: {
    books() {
      return this.$store.state.books;
    }
  },
  methods: {
    toggleEdit(index) {
      this.$store.commit('TOGGLE_EDIT', index);
      if(this.books[index].editing) {
        focusTitleField(index);
      } else {
        this.focusBook(index);
      }
    },
    focusBook(index) {
      const $book = document.getElementById(`book_${index}`);
      $book.focus();
    },
    deleteBook(index) {
      this.$store.commit('DELETE_BOOK', index);
    }
  }
}
</script>

<style scoped lang="scss">
$border-color: #acdce7;
$text-color: #4f90a5;

.books-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  width: 100%;
  margin: 1rem auto;
  padding: 0;
  color: $text-color;

  &__book {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    border: 1px solid $border-color;
    border-radius: 5px;
    outline: none;
    width: 100%;
    margin: 0.5rem auto;
    padding: 2rem 1.5rem;
    transition: all 250ms;
  }

  &__book__details {
    width: 100%;
  }

  .book__title,
  .book__author {
    display: block;
  }

  .book__title {
    font-size: 1.5rem;
    font-weight: 900;
  }
  .book__author {
    font-size: 1rem;
    font-style: italic;
  }

  .book-options {
    font-size: 0.75rem;
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    list-style-type: none;
    padding: 0.5rem;

    &__option {
      margin-left: 0.75rem;

      a {
        color: #9aafb3;
        text-decoration: none;
        transition: all 250ms ease;
        padding: 0.25rem;
        border: 1px solid transparent;
        outline: none;

        &:visited {
          color: currentColor;
        }
        &:hover,
        &:focus {
          border: 1px dashed currentColor;
        }
      }
    }
  }
}

.book-form {
  width: 100%;
  max-width: 400px;
  margin: 1rem auto 0;
  padding: 1rem;
  border-top: 1px solid $border-color;

  &__label {
    position: relative;
    display: block;

    &__text {
      display: block;
    }
  }

  input[type="text"] {
    height: 44px;
    width: 100%;
    color: $text-color;
    font-size: 1rem;
    text-align: center;
    padding: 0.25rem 0.5rem;
    border: 1px solid $border-color;
    margin: 0 auto 1rem;

    &:focus {
      border: 3px double $border-color;
      outline: none;
    }
  }
}
</style>
