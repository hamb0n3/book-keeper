<template>
  <div id="app">
    <h1>Favorite Books</h1>
    <p>You have <strong>{{ totalBooks }} books</strong> in your library</p>
    <button class="btn btn--add-book" @click.prevent="addBook"><i aria-hidden="true">&plus;</i>&nbsp;Add Book</button>
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
    addBook() {
      this.$store.commit('ADD_BOOK');
      focusTitleField(0);
    }
  }
}
</script>

<style lang="scss">;
$medium-blue: #4f90a5;
$pale-blue: #ebfaff;

$bg-color: $pale-blue;
$text-color: #4f90a5;
$button-bg: $medium-blue;


body {
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
  width: 100%;
  max-width: 600px;
}

.full-width {
  width: 100%;
}

.btn {
  cursor: pointer;
  background-color: $button-bg;
  border: 2px solid $button-bg;
  padding: 0.5rem 1rem;
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
}
</style>
