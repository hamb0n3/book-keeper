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
          <input type="text" v-model="searchTerm" :title="`title_${index}`" :id="`title_${index}`"/>
        </label>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'BookForm',
  props: ['book', 'index'],
  computed: {
    searchTerm: {
      get() {
        return this.$store.getters.searchTerm;
      },
      set(value) {
        this.$store.commit('EDIT_SEARCHTERM', value);
      }
    },
    ...mapGetters([
    'books', 
    'addMethod'
  ])
  },
  methods: {
    handleSubmit(index) {
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