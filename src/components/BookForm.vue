<template>
  <form v-if="book.editing" class="book-form" id="editBook" autocomplete="off" @submit.prevent="handleSubmit(index)">
    <div v-if="addMethod == 'manual'">
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
    </div>

    <div v-else-if="addMethod == 'search'">
      <div class="book-form__field-wrapper">
        <label class="book-form__label" :for="`search_${index}`">
          <span class="book-form__label__text">Search</span>
          <input type="search" v-model="searchTerms" @input="handleSearch" placeholder="Search for a book..." :title="`title_${index}`" :id="`title_${index}`"/>
        </label>
      </div>

      <ul class="search-results" v-if="(searchTerms != '' && loadState == 'success')">
        <li class="search-results__result" v-for="(result, resultIndex) in searchResults" :key="resultIndex">
          <button class="search-results__button" @click.prevent="handleResultSelection(result.volumeInfo, index)">
            <span class="search-results__result__title">
              {{ result.volumeInfo.title }}
            </span><br>
            <span v-if="(typeof result.volumeInfo.authors != 'undefined')" class="search-results__result__author">
              {{ result.volumeInfo.authors.join(', ') }}
            </span>
          </button>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'BookForm',
  props: ['book', 'index'],
  computed: {
    searchTerms: {
      get() {
        return this.$store.state.searchTerms;
      },
      set(value) {
        this.$store.commit('UPDATE_SEARCH_TERMS', value);
      }
    },
    ...mapGetters([
      'books', 
      'addMethod',
      'searchResults',
      'loadState'
    ])
  },
  methods: {
    handleSubmit(index) {
      this.$store.commit('TOGGLE_EDIT', index);
    },
    handleSearch(event) {
      this.$store.dispatch('SEARCH_BOOKS', this.searchTerms);
    },
    handleResultSelection(result, index) {
      this.$store.commit('EDIT_BOOK_TITLE', {
        index, 
        value: result.title
      });
      this.$store.commit('EDIT_BOOK_AUTHOR', {
        index, 
        value: result.authors.join(', ')
      });
      this.$store.commit('TOGGLE_EDIT', index);
    }
  }
}
</script>

<style lang="scss">
$border-color: #acdce7;
$text-color: #4f90a5;

.book-form {
  width: 100%;
  max-width: 400px;
  margin: 1rem auto 0;
  padding: 1rem 0;
  border-top: 1px solid $border-color;

  &__label {
    position: relative;
    display: block;

    &__text {
      display: block;
    }
  }

  input[type="search"] {
    margin: 0 auto;
  }
  input[type="text"] {
    margin: 0 auto 1rem;
  }

  input[type="text"],
  input[type="search"] {
    height: 44px;
    width: 100%;
    color: $text-color;
    font-size: 1rem;
    text-align: center;
    padding: 0.25rem 0.5rem;
    border: 1px solid $border-color;

    &:focus {
      border: 3px double $border-color;
      outline: none;
    }
  }

  .search-results {
    padding: 0;
    list-style-type: none;

    &__button {
      background-color: transparent;
      width: 100%;
      border: none;
      border-bottom: 1px solid $border-color;
      color: $text-color;
      padding: 0.5rem;
      font-size: 1rem;
      text-align: left;
      cursor: pointer;
      transition: all 250ms ease;

      &:hover,
      &:focus {
        background-color: $text-color;
        color: #fff;
      }
    }

    &__result {
      &__title {
        font-weight: bold;
      }
      &__author {
        font-size: 0.75rem;
      }
    }
  }
}
</style>