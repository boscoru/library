const myLibrary = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#addBook");
const closeButton = document.querySelector("dialog button");
const submitButton = document.querySelector('input[type="submit"]');
const books = document.querySelector('#books');

function inputBook(event) {
    console.log('inputBook');
    event.preventDefault();
    myForm = document.getElementById('bookForm');
    formData = new FormData(myForm);
    addBookToLibrary(formData.get('title'), formData.get('author'),
        formData.get('pages'), formData.get('read'));
    //this.reset();
}

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    console.log('addBookToLibrary');
    newBook = new Book(title, author, pages, read);
    console.log(newBook);
    myLibrary.push(newBook);
    myLibrary.sort((a, b) => a.title.toUpperCase() - b.title.toUpperCase());
    console.log(myLibrary);
    displayLibrary();
}

function displayLibrary() {
    console.log('displayLibrary');
    for (const book of myLibrary) {
        console.log('display loop');
        let thisBook = document.createElement("div");
        thisBook.id = `book.id`;
        let title = document.createElement("div");
        title.classList.add('bookTitle');
        title.textContent = book.title;
        let author = document.createElement('div');
        author.classList.add('bookInfo');
        author.textContent = 'By ' + book.author;
        let pages = document.createElement('div');
        pages.classList.add('bookInfo');
        pages.textContent = book.pages + ' pages';
        let read = document.createElement('div');
        read.classList.add('bookInfo');
        if (book.read === 'read') read.textContent = 'Read';
        if (book.read === 'notRead') read.textContent = 'Not Read';
        books.appendChild(thisBook);
        thisBook.appendChild(title);
        thisBook.appendChild(author);
        thisBook.appendChild(pages);
        thisBook.appendChild(read);
    }
}

// Opens dialog for form entry
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// Closes dialog without submitting
closeButton.addEventListener("click", () => {
  dialog.close();
});

submitButton.addEventListener("click", inputBook);