export const focusTitleField = (titleIndex) => {
  setTimeout(() => {
    const $title = document.getElementById(`title_${titleIndex}`);
    $title.focus();
    $title.select();
  }, 0)
}

export const focusBook = (index) => {
  const $book = document.getElementById(`book_${index}`);
  $book.focus();
}