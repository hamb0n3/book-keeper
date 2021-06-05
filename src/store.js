import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [
      {
        editing: false,
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien'
      },
      {
        editing: false,
        title: 'A Horse and His Boy',
        author: 'C.S. Lewis'
      },
      {
        editing: false,
        title: 'The Vampire Lestat',
        author: 'Anne Rice'
      }
    ]
  },
  mutations: {
    TOGGLE_EDIT(state, index) {
      state.books[index].editing = !state.books[index].editing;
    },
    EDIT_TITLE(state, index, value) {
      state.books[index].title = value;
    },
    EDIT_AUTHOR(state, index, value) {
      state.books[index].author = value;
    },
    ADD_BOOK(state) {
        state.books.unshift({
          editing: true,
          title: 'New Book',
          author: 'New Author'
        });
    },
    DELETE_BOOK(state, book) {
      state.books.splice(book, 1);
    }
  },
  actions: {

  },
  getters: {
    totalBooks(state) {
      return state.books.length;
    }
  }
})
