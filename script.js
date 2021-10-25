const myModal = new bootstrap.Modal(document.getElementById("book-modal"), {
  keyboard: true,
});

document
  .getElementById("submit-button")
  .addEventListener("click", addBookToLibrary);

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

let myLibrary = [];

function addBookToLibrary(e) {
  e.preventDefault();
  myModal.hide();

  let title = document.getElementById("book-name").value;
  let author = document.getElementById("author-name").value;
  let pages = document.getElementById("no-of-pages").value;
  let status = document.querySelector(
    'input[name="inlineRadioOptions"]:checked'
  ).value;

  let book = new Book(title, author, pages, status);

  myLibrary.push(book);

  document.querySelector("form").reset();

  let pre = document.getElementById("pre");
  pre.textContent = "\n" + JSON.stringify(myLibrary, "\t", 2);
}
