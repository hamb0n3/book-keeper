<template>
  <div id="app">
    <h1>Book Keeper</h1>
    <p>You have <strong>{{ totalBooks }} books</strong> in your library</p>
    <fieldset class="add-options">
      <legend>
        <i aria-hidden="true">&plus;</i>&nbsp;ADD BOOK
      </legend>
      <button class="btn btn--add-option" @click.prevent="addBook('manual')">
        Manual Entry
      </button>
      <span>OR</span>
      <button class="btn btn--add-option" @click.prevent="addBook('search')">
        Search
      </button>
    </fieldset>
    <Books/>
  </div>
</template>

<script>
import Books from './components/Books';
import { mapGetters } from 'vuex';
import { focusTitleField } from './helpers';
export default {
  name: 'app',
  components: {
    Books
  },
  computed: mapGetters(['totalBooks']),
  methods: {
    addBook(method) {
      this.$store.commit('CLOSE_EDIT_FORMS');
      this.$store.commit('SET_ADD_METHOD', method);
      this.$store.commit('ADD_BOOK');
      focusTitleField(0);
    }
  }
}
</script>

<style lang="scss">;
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
$medium-blue: #4f90a5;
$pale-blue: #ebfaff;
$bg-color: $pale-blue;
$text-color: #4f90a5;
$button-bg: $medium-blue;

body {
  margin: 0;
  background-color: $bg-color;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  margin: auto;
  padding: 1rem 1rem 3rem;
  width: 100%;
  max-width: 600px;
}

h1 {
  line-height: 1;
  font-size: 3rem;
  font-weight: 900;
  margin: 0 auto 1rem;
  font-family: 'Playfair Display', serif;
}

i {
  font-style: normal;
}

.add-options {
  border: 1px solid currentColor;
  border-radius: 5px;
  padding: 0.5rem 1rem 1rem;
  margin-top: 1rem;

  > legend {
    font-size: 1rem;
    font-weight: bold;
    padding: 0 0.75rem;
    text-align: left;
  }

  > span {
    margin: 0 1rem;
  }
}

.btn {
  cursor: pointer;
  background-color: $button-bg;
  border: 3px solid $button-bg;
  border-radius: 5px;
  padding: 0.25rem 1rem;
  color: $bg-color;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 250ms ease;

  &:focus {
    border: 3px double currentColor;
    outline: none;
  }
  

  &:hover,
  &:focus {
    color: $text-color;
    border: 3px double $text-color;
    background-color: $bg-color;
  }
  
  &--add-book {
    font-size: 1rem;
  }
  &--add-option {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
  }
}
</style>
