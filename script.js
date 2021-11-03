const myModal = new bootstrap.Modal(document.getElementById("book-modal"), {
  keyboard: true,
});
const libraryOptions = document.querySelectorAll("li");
const nav = document.getElementById("library-options");
const addBookCard = document.getElementById("book-modal");
const displayBooks = document.getElementById("display-books");
const submitButton = document.getElementById("submit-button");
const updateButton = document.getElementById("update-button");
const newBook = document.getElementById("new-book");
const burger = document.querySelector(".burger");
let currentFilter = "";

libraryOptions.forEach(
  (option) =>
    (option.onclick = (e) => {
      filter(e.target.textContent);
      for (let li of libraryOptions) {
        li.classList.remove("active");
      }
      option.classList.add("active");

      nav.classList.toggle("nav-open");
      burger.classList.toggle("toggle");
    })
);
newBook.onclick = () => buttonVisibility(submitButton);
submitButton.onclick = (e) => addBookToLibrary(e);
burger.onclick = () => {
  nav.classList.toggle("nav-open");
  burger.classList.toggle("toggle");
};

function filter(filterType) {
  if (filterType === "Library") {
    currentFilter = filterType;
    displayLibrary(myLibrary);
  } else {
    currentFilter = filterType;
    const result = myLibrary.filter((book) => book.status === filterType);
    displayLibrary(result);
  }
}
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
  {
    id: 1635355542810,
    title: "Dune",
    author: "Frank Hebert",
    pages: 485,
    status: "Yet to Read",
  },
];

localeStorageToLibrary();
displayLibrary(myLibrary);

function checkForm(e) {
  if (
    document.getElementById("book-name").value === "" ||
    document.getElementById("author-name").value === "" ||
    document.getElementById("no-of-pages").value === "" ||
    document.querySelector('input[name="inlineRadioOptions"]:checked').value ===
      null
  ) {
    alert("Please fill the form!");
    return true;
  }
}

function buttonVisibility(button) {
  button.style.display = "inline";
}

function localeStorageToLibrary() {
  localStorage.getItem("Library") === null
    ? false
    : (myLibrary = JSON.parse(localStorage.getItem("Library")));
}

function LibrarytoLocaleStorage() {
  localStorage.setItem("Library", JSON.stringify(myLibrary));
  filter(currentFilter);
}

function addBookToLibrary(e) {
  if (checkForm()) return;
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

function displayLibrary(arrayToDisplay) {
  displayBooks.innerHTML = "";

  displayBooks.appendChild(newBook);
  for (const book of arrayToDisplay) {
    bookCardsForLibrary(
      book.id,
      book.title,
      book.author,
      book.pages,
      book.status
    );
  }
}

addBookCard.addEventListener("hidden.bs.modal", function (e) {
  submitButton.style.display = "none";
});

function bookCardsForLibrary(id, title, author, pages, status) {
  const cardContainer = document.createElement("div");
  const buttonContainer = document.createElement("div");
  const contentContainer = document.createElement("div");
  const bookTitle = document.createElement("p");
  const authorTitle = document.createElement("p");
  const pageCount = document.createElement("p");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  cardContainer.classList.add("card");
  buttonContainer.classList.add("card-button");
  contentContainer.classList.add("card-content");
  bookTitle.textContent = title;
  authorTitle.textContent = author;
  pageCount.textContent = pages + " pages";
  editButton.innerHTML = `<i class="bi bi-pen"></i>`;
  deleteButton.innerHTML = `<i class="bi bi-x-lg"></i>`;

  switch (status) {
    case "Completed":
      cardContainer.style.borderBottom = "2mm ridge rgba(0, 255, 0, 0.8)";
      break;
    case "Reading":
      cardContainer.style.borderBottom = "2mm ridge rgba(255, 242, 0, 0.8)";
      break;
    case "Yet to Read":
      cardContainer.style.borderBottom = "2mm ridge rgba(255, 0, 0, .8)";
      break;
    default:
      console.log("something wrong with status");
  }

  editButton.onclick = (e) => {
    editBook(myLibrary.find((book) => book.id === id));
    buttonVisibility(updateButton);
  };
  deleteButton.onclick = (e) => deleteBook(id);
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);
  cardContainer.appendChild(buttonContainer);
  contentContainer.appendChild(bookTitle);
  contentContainer.appendChild(authorTitle);
  contentContainer.appendChild(pageCount);
  cardContainer.appendChild(contentContainer);

  displayBooks.appendChild(cardContainer);
}

function editBook(book) {
  submitButton.style.display = "none";
  myModal.show();

  document.getElementById("book-name").value = book.title;
  document.getElementById("author-name").value = book.author;
  document.getElementById("no-of-pages").value = book.pages;
  const radios = Array.from(
    document.querySelectorAll('input[name="inlineRadioOptions"]')
  );
  radios.forEach((radioStatus) => {
    if (radioStatus.defaultValue === book.status) {
      radioStatus.checked = true;
    }
  });
  addBookCard.addEventListener("hidden.bs.modal", function (e) {
    document.querySelector("form").reset();
    updateButton.style.display = "none";
  });
  updateButton.onclick = (e) => updateBook(e, book);
}

function updateBook(e, book) {
  if (checkForm()) return;
  e.preventDefault();

  book.title = document.getElementById("book-name").value;
  book.author = document.getElementById("author-name").value;
  book.pages = document.getElementById("no-of-pages").value;
  book.status = document.querySelector(
    'input[name="inlineRadioOptions"]:checked'
  ).value;

  LibrarytoLocaleStorage();

  updateButton.style.display = "none";
  document.querySelector("form").reset();
  myModal.hide();
}

function deleteBook(id) {
  const book = myLibrary.findIndex((book) => book.id === id);
  myLibrary.splice(book, 1);
  LibrarytoLocaleStorage();
}

// DARK MODE
// CLEAN CODE
