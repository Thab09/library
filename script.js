const myModal = new bootstrap.Modal(document.getElementById("book-modal"), {
  keyboard: true,
});
const displayBooks = document.getElementById("display-books");

document
  .getElementById("submit-button")
  .addEventListener("click", addBookToLibrary);

function Book(id, title, author, pages, status) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

let myLibrary = [
  {
    id: 1635355542910,
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 23,
    status: "Reading",
  },
];

localeStorageToLibrary();
displayLibrary();

function localeStorageToLibrary() {
  localStorage.getItem("Library") === null
    ? false
    : (myLibrary = JSON.parse(localStorage.getItem("Library")));
}

function LibrarytoLocaleStorage() {
  localStorage.setItem("Library", JSON.stringify(myLibrary));
  displayLibrary();
}

function addBookToLibrary(e) {
  e.preventDefault();
  myModal.hide();

  let id = Date.now();
  let title = document.getElementById("book-name").value;
  let author = document.getElementById("author-name").value;
  let pages = document.getElementById("no-of-pages").value;
  let status = document.querySelector(
    'input[name="inlineRadioOptions"]:checked'
  ).value;

  let book = new Book(id, title, author, pages, status);

  myLibrary.push(book);

  document.querySelector("form").reset();

  LibrarytoLocaleStorage();
}

function displayLibrary() {
  displayBooks.innerHTML = "";
  for (const book of myLibrary) {
    bookCardsForLibrary(
      book.id,
      book.title,
      book.author,
      book.pages,
      book.status
    );
  }
}

function bookCardsForLibrary(id, title, author, pages, status) {
  const cardContainer = document.createElement("div");
  const buttonContainer = document.createElement("div");
  const contentContainer = document.createElement("div");
  const bookTitle = document.createElement("p");
  const authorTitle = document.createElement("p");
  const pageCount = document.createElement("p");
  // const bookStatus = document.createElement("p");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  cardContainer.classList.add("card");
  buttonContainer.classList.add("card-button");
  contentContainer.classList.add("card-content");
  bookTitle.textContent = title;
  authorTitle.textContent = author;
  pageCount.textContent = pages + " pages";
  // bookStatus.textContent = status;
  editButton.innerHTML = `<i class="bi bi-pen"></i>`;
  deleteButton.innerHTML = `<i class="bi bi-x-lg"></i>`;

  editButton.onclick = (e) => console.log(id);
  deleteButton.onclick = (e) => deleteBook(id);

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);
  cardContainer.appendChild(buttonContainer);
  contentContainer.appendChild(bookTitle);
  contentContainer.appendChild(authorTitle);
  contentContainer.appendChild(pageCount);
  // contentContainer.appendChild(bookStatus);
  cardContainer.appendChild(contentContainer);

  displayBooks.appendChild(cardContainer);
}

function deleteBook(id) {
  const book = myLibrary.findIndex((book) => book.id === id);
  myLibrary.splice(book, 1);
  LibrarytoLocaleStorage();
}

// ADD EDIT
// SHOW THE STATUS
// NAV BAR - ALL / REA / YET / FINISHED
// CSS
