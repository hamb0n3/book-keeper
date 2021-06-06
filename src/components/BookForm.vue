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
          <input type="search" v-model="searchTerms" @input="handleSearch" placeholder="Author, Title, or ISBN" :title="`title_${index}`" :id="`title_${index}`"/>
          <a class="cancel-link" href="javascript:(void)" @click.prevent="cancelSearch(index)">cancel</a>
        </label>
      </div>

      <ul class="search-results" v-if="(searchTerms != '' && loadState == 'success')">
        <li class="search-results__result" v-for="(result, resultIndex) in searchResults" :key="resultIndex">
          <div class="search-results__details">
            <span class="search-results__result__title">
              {{ result.title }}
            </span>
            <span class="search-results__result__author">
              {{ result.author }}
            </span>
            <span v-if="result.ISBN !== ''" class="search-results__result__isbn">
              ISBN {{ result.ISBN }}
            </span>
          </div>
          <button class="search-results__button btn" @click.prevent="handleResultSelection(result, index)">
            Choose Book
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
    handleSearch() {
      this.$store.dispatch('SEARCH_BOOKS', this.searchTerms);
    },
    cancelSearch(index) {
      this.$store.commit('TOGGLE_EDIT', index);
    },
    handleResultSelection(result, index) {
      this.$store.commit('EDIT_BOOK_TITLE', {
        index, 
        value: result.title
      });
      this.$store.commit('EDIT_BOOK_AUTHOR', {
        index, 
        value: result.author
      });
      this.$store.commit('TOGGLE_EDIT', index);
    }
  }
}
</script>

<style lang="scss">
$border-color: #acdce7;
$text-color: #4f90a5;
$pale-blue: #ebfaff;
$white: #fff;
$link-color: #9aafb3;

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
      text-align: left;
      text-transform: uppercase;
      font-size: 10px;
      position: absolute;
      top: 2px;
      left: 4px;
    }
  }

  .cancel-link {
    text-align: right;
    padding: 0.25rem;
    color: $link-color;

    &:hover,
    &:focus {
      text-decoration: none;
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

    &__result {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $white;
      border-bottom: 1px solid $border-color;
      padding: 0.5rem;

      &:hover {
        background-color: $pale-blue;
      }

      &__title,
      &__author,
      &__isbn {
        display: block;
      }
      &__title {
        font-weight: bold;
      }
      &__author {
        font-size: 0.75rem;
      }
      &__isbn {
        font-size: 0.7rem;
      }
    }

    &__details {
      width: 100%;
      color: $text-color;
      margin-right: 0.5rem;
      font-size: 1rem;
      text-align: left;
    }

    &__button {
      width: 100%;
      max-width: 105px;
      font-size: 0.6rem;
      padding: 0.25rem;

      &:hover {
        background-color: $white;
      }
    }
  }
}
</style>