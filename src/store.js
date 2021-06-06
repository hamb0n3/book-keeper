import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { focusBook, focusTitleField } from './helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addMethod: '', // 'manual' or 'search'
    searchTerms: '',
    searchResults: [],
    loadState: '',
    books: [
      {
        editing: false,
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
      },
      {
        editing: false,
        title: 'The Horse and His Boy',
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
      }
      state.searchTerms = '';
    },
    UPDATE_SEARCH_TERMS(state, value) {
      state.searchTerms = value;
    },
    UPDATE_SEARCH_RESULTS(state, payload) {
      state.searchResults = payload;
    },
    UPDATE_LOAD_STATE(state, value) {
      state.loadState = value;
    },
    ADD_BOOK(state) {
        state.books.unshift({
          editing: true,
          title: 'Untitled Book',
          author: 'Unknown Author',
          ISBN: ''
        });
    },
    EDIT_BOOK_TITLE(state, payload) {
      state.books[payload.index].title = payload.value;
    },
    EDIT_BOOK_AUTHOR(state, payload) {
      state.books[payload.index].author = payload.value;
    },
    DELETE_BOOK(state, book) {
      state.books.splice(book, 1);
      focusBook(book);
    }
  },
  actions: {
    SEARCH_BOOKS(state, terms) {
      state.commit('UPDATE_LOAD_STATE', 'loading')
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${terms}`
        )
        .then(response => {
          state.commit('UPDATE_SEARCH_RESULTS', 
            response.data.items.map(item => {
              const book = item.volumeInfo;
              return {
                title: book.title,
                author: typeof book.authors !== 'undefined' ? book.authors.join(', '): '', 
                ISBN: typeof book.industryIdentifiers !== 'undefined' ? book.industryIdentifiers[0].identifier : ''
              }
            })
          )
          state.commit('UPDATE_LOAD_STATE', 'success');
        })
    }
  },
  getters: {
    books(state) {
      return state.books;
    },
    totalBooks(state) {
      return state.books.length;
    },
    addMethod(state) {
      return state.addMethod;
    },
    searchTerms(state) {
      return state.searchTerms;
    },
    searchResults(state) {
      return state.searchResults;
    },
    loadState(state) {
      return state.loadState;
    }
  }
})
