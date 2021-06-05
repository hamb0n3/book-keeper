(function(t){function o(o){for(var n,r,a=o[0],l=o[1],u=o[2],f=0,d=[];f<a.length;f++)r=a[f],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&d.push(i[r][0]),i[r]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);c&&c(o);while(d.length)d.shift()();return s.push.apply(s,u||[]),e()}function e(){for(var t,o=0;o<s.length;o++){for(var e=s[o],n=!0,a=1;a<e.length;a++){var l=e[a];0!==i[l]&&(n=!1)}n&&(s.splice(o--,1),t=r(r.s=e[0]))}return t}var n={},i={app:0},s=[];function r(o){if(n[o])return n[o].exports;var e=n[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=t,r.c=n,r.d=function(t,o,e){r.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:e})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,o){if(1&o&&(t=r(t)),8&o)return t;if(4&o&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var n in t)r.d(e,n,function(o){return t[o]}.bind(null,n));return e},r.n=function(t){var o=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(o,"a",o),o},r.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},r.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=o,a=a.slice();for(var u=0;u<a.length;u++)o(a[u]);var c=l;s.push([0,"chunk-vendors"]),e()})({0:function(t,o,e){t.exports=e("56d7")},"150c":function(t,o,e){},"56d7":function(t,o,e){"use strict";e.r(o);e("cadf"),e("551c"),e("f751"),e("097d");var n=e("2b0e"),i=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{attrs:{id:"app"}},[e("h1",[t._v("Favorite Books")]),e("p",[t._v("You have "),e("strong",[t._v(t._s(t.totalBooks)+" books")]),t._v(" in your library")]),e("button",{staticClass:"btn btn--add-book",on:{click:function(o){return o.preventDefault(),t.addBook.apply(null,arguments)}}},[e("i",{attrs:{"aria-hidden":"true"}},[t._v("+")]),t._v(" Add Book")]),e("Books")],1)},s=[],r=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("ul",{staticClass:"books-list"},[t._l(t.books,(function(o,n){return e("li",{key:"book-"+n,staticClass:"books-list__book",attrs:{id:"book_"+n,tabindex:"-1"}},[e("div",{staticClass:"books-list__book__details"},[e("span",{staticClass:"book__title"},[t._v(t._s(o.title))]),e("span",{staticClass:"book__author"},[t._v("by "+t._s(o.author))]),o.editing?e("form",{staticClass:"book-form",attrs:{id:"editBook"},on:{submit:function(o){return o.preventDefault(),t.toggleEdit(n)}}},[e("div",{staticClass:"book-form__field-wrapper"},[e("label",{staticClass:"book-form__label",attrs:{for:"title_"+n}},[e("span",{staticClass:"book-form__label__text"},[t._v("Title")]),e("input",{directives:[{name:"model",rawName:"v-model",value:o.title,expression:"book.title"}],attrs:{type:"text",title:"title_"+n,id:"title_"+n},domProps:{value:o.title},on:{input:function(e){e.target.composing||t.$set(o,"title",e.target.value)}}})])]),e("div",{staticClass:"book-form__field-wrapper"},[e("label",{staticClass:"book-form__label",attrs:{for:"author_"+n}},[e("span",{staticClass:"book-form__label__text"},[t._v("Author")]),e("input",{directives:[{name:"model",rawName:"v-model",value:o.author,expression:"book.author"}],attrs:{type:"text",title:"author_"+n,id:"author_"+n},domProps:{value:o.author},on:{input:function(e){e.target.composing||t.$set(o,"author",e.target.value)}}})])]),t._m(0,!0)]):t._e()]),e("ul",{staticClass:"book-options"},[e("li",{staticClass:"book-options__option"},[e("a",{attrs:{href:"javascript:(void)",title:"Edit "+o.title},on:{click:function(o){return o.preventDefault(),t.toggleEdit(n)}}},[o.editing?e("span",[t._v("editing...")]):e("span",[t._v("edit")])])]),e("li",{staticClass:"book-options__option"},[e("a",{attrs:{href:"javascript:(void)",title:"Remove "+o.title},on:{click:function(o){return o.preventDefault(),t.deleteBook(n)}}},[t._v("delete")])])])])})),0==t.books.length?e("li",{staticClass:"books-list__book"},[t._m(1)]):t._e()],2)},a=[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"book-form__field-wrapper"},[e("button",{staticClass:"btn",attrs:{type:"submit"}},[t._v("Done Editing")])])},function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("p",{staticClass:"full-width"},[t._v("\n      Uh oh, you don't have any books yet!"),e("br"),t._v("\n      Add a book to get started.\n    ")])}],l=function(t){setTimeout((function(){var o=document.getElementById("title_".concat(t));o.focus(),o.select()}),0)},u={name:"Books",computed:{books:function(){return this.$store.state.books},bookTitle:{get:function(){return this.$store.state.newBook.title},set:function(t,o){this.$store.commit("EDIT_TITLE",t,o)}},bookAuthor:{get:function(){return this.$store.state.newBook.author},set:function(t,o){this.$store.commit("EDIT_AUTHOR",t,o)}}},methods:{toggleEdit:function(t){this.$store.commit("TOGGLE_EDIT",t),this.books[t].editing?l(t):this.focusBook(t)},focusBook:function(t){var o=document.getElementById("book_".concat(t));o.focus()},deleteBook:function(t){this.$store.commit("DELETE_BOOK",t)}}},c=u,f=(e("a603"),e("2877")),d=Object(f["a"])(c,r,a,!1,null,"c06f37d0",null),p=d.exports,_=e("2f62"),b={name:"app",components:{Books:p},computed:Object(_["b"])(["totalBooks"]),methods:{addBook:function(){this.$store.commit("ADD_BOOK"),l(0)}}},k=b,v=(e("5c0b"),Object(f["a"])(k,i,s,!1,null,null,null)),h=v.exports;n["a"].use(_["a"]);var m=new _["a"].Store({state:{books:[{editing:!1,title:"The Hobbit",author:"J.R.R. Tolkien"},{editing:!1,title:"There and Back Again",author:"Bilbo Baggins"},{editing:!1,title:"The Vampire Lestat",author:"Anne Rice"}]},mutations:{TOGGLE_EDIT:function(t,o){t.books[o].editing=!t.books[o].editing},EDIT_TITLE:function(t,o,e){t.books[o].title=e},EDIT_AUTHOR:function(t,o,e){t.books[o].author=e},ADD_BOOK:function(t){t.books.unshift({editing:!0,title:"New Book",author:"New Author"})},DELETE_BOOK:function(t,o){t.books.splice(o,1)}},actions:{},getters:{totalBooks:function(t){return t.books.length}}});n["a"].config.productionTip=!1,new n["a"]({store:m,render:function(t){return t(h)}}).$mount("#app")},"5c0b":function(t,o,e){"use strict";e("e332")},a603:function(t,o,e){"use strict";e("150c")},e332:function(t,o,e){}});
//# sourceMappingURL=app.c8da9f51.js.map