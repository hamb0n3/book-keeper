import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { focusBook, focusTitleField } from './helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addMethod: '', // 'manual' or 'search'
    searchTerm: 'search for a book...',
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
    SET_ADD_METHOD(state, value) {
      switch (value) {
        case 'manual':
          state.addMethod = 'manual';
          break;
        case 'search':
          state.addMethod = 'search';
          break;
        default:
          break;
      }
    },
    CLOSE_EDIT_FORMS(state) {
      state.books.map((book) => {
        if(book.editing) {
          book.editing = false;
        }
      })
    },
    TOGGLE_EDIT(state, index) {
      state.books[index].editing = !state.books[index].editing;
      if(state.books[index].editing) {
        focusTitleField(index);
      } else {
        focusBook(index);
      }
    },
    EDIT_SEARCHTERM(state, value) {
      state.searchTerm = value;
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
      focusBook(book)
    }
  },
  actions: {
    SEARCH_BOOKS(state) {
        axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${state.searchTerm}`
          )
          .then(response => {
            console.log(response.data.items)
            this.books = response.data.items
            this.loadState = 'success'
          })
    }
  },
  getters: {
    books(state) {
      return state.books;
    },
    searchTerm(state) {
      return state.searchTerm;
    },
    totalBooks(state) {
      return state.books.length;
    },
    addMethod(state) {
      return state.addMethod;
    }
  }
})
