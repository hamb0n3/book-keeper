export const focusTitleField = (titleIndex) => {
  setTimeout(() => {
    const $title = document.getElementById(`title_${titleIndex}`);
    $title.focus();
    $title.select();
  }, 0)
}