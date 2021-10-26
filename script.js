const myModal = new bootstrap.Modal(document.getElementById("book-modal"), {
  keyboard: true,
});
const displayBooks = document.getElementById("display-books");

document
  .getElementById("submit-button")
  .addEventListener("click", addBookToLibrary);

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

let myLibrary = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 23,
    status: "Reading",
  },
];

displayLibrary();

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

  localStorage.setItem("Library", JSON.stringify(myLibrary));

  displayLibrary();
}

function displayLibrary() {
  //get items from local
  displayBooks.innerHTML = "";
  for (const book of myLibrary) {
    bookCardsForLibrary(book.title, book.author, book.pages, book.status);
  }
}

function bookCardsForLibrary(title, author, pages, status) {
  const cardContainer = document.createElement("div");
  const buttonContainer = document.createElement("div");
  const contentContainer = document.createElement("div");
  const bookTitle = document.createElement("p");
  const authorTitle = document.createElement("p");
  const pageCount = document.createElement("p");
  const bookStatus = document.createElement("p");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  cardContainer.classList.add("card");
  buttonContainer.classList.add("card-button");
  contentContainer.classList.add("card-content");
  bookTitle.textContent = title;
  authorTitle.textContent = author;
  pageCount.textContent = pages + " pages";
  bookStatus.textContent = status;
  editButton.innerHTML = `<i class="bi bi-pen"></i>`;
  deleteButton.innerHTML = `<i class="bi bi-x-lg"></i>`;

  editButton.onclick = () => console.log("yoyoy");

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);
  cardContainer.appendChild(buttonContainer);
  contentContainer.appendChild(bookTitle);
  contentContainer.appendChild(authorTitle);
  contentContainer.appendChild(pageCount);
  contentContainer.appendChild(bookStatus);
  cardContainer.appendChild(contentContainer);

  displayBooks.appendChild(cardContainer);
}
