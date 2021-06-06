<template>
  <ul class="books-list">
    <li :id="`book_${index}`" class="books-list__book" v-for="(book, index) in books" :key="`book-${index}`" tabindex="-1">
      <div class="books-list__book__details">
        <span class="book__title">{{book.title}}</span>
        <span class="book__author">{{book.author}}</span>

        <BookForm :book="book" :index="index" />
      </div>
      <ul class="book-options">
        <li class="book-options__option">
          <a v-if="!book.editing || addMethod == 'search'" href="javascript:(void)" @click.prevent="showManualForm(index)" :title="`Edit book`">edit</a>
          <a v-if="book.editing && addMethod == 'manual'" href="javascript:(void)" @click.prevent="showSearchForm(index)" :title="`Search for book`">search</a>
        </li>
        <li class="book-options__option">
          <a href="javascript:(void)" @click.prevent="deleteBook(index)" :title="`Remove book`">remove</a>
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
import { mapState } from 'vuex';
import BookForm from './BookForm';

export default {
  name: 'Books',
  components: {
    BookForm
  },
  computed: mapState(['books', 'addMethod']),
  methods: {
    showManualForm(index) {
      this.$store.commit('CLOSE_EDIT_FORMS');
      this.$store.commit('SET_ADD_METHOD', 'manual');
      this.$store.commit('TOGGLE_EDIT', index);
    },
    showSearchForm(index) {
      this.$store.commit('CLOSE_EDIT_FORMS');
      this.$store.commit('SET_ADD_METHOD', 'search');
      this.$store.commit('TOGGLE_EDIT', index);
    },
    deleteBook(index) {
      this.$store.commit('DELETE_BOOK', index);
    }
  }
}
</script>

<style lang="scss">
$border-color: #acdce7;
$text-color: #4f90a5;
$white: #fff;
$link-color: #9aafb3;

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
    background-color: $white;
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
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 900;
    max-width: 420px;
    margin: auto;
  }
  .book__author {
    font-size: 1rem;
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
        color: $link-color;
        text-decoration: none;
        padding: 0.25rem;
        text-decoration: none;
        outline: none;

        &:visited {
          color: currentColor;
        }
        &:hover,
        &:focus {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
