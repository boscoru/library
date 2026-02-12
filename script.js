const myLibrary = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#addBook");
const closeButton = document.querySelector("dialog button");
const submitForm = document.getElementById('bookForm');
const books = document.querySelector('#books');

function inputBook(event) {
    event.preventDefault();
    if(submitForm.checkValidity) {
        myForm = document.getElementById('bookForm');
        formData = new FormData(myForm);
        addBookToLibrary(formData.get('title'), formData.get('author'),
            formData.get('pages'), formData.get('read'));
        myForm.reset();
        dialog.close();
    }
}

class Book {
    constructor(title, author, pages, read){
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    myLibrary.sort((a,b) => {
        if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
        if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
        return 0;
    });
    displayLibrary();
}

function displayLibrary() {
    books.replaceChildren();
    for (const book of myLibrary) {
        let thisBook = document.createElement("div");
        thisBook.id = `book.id`;
        thisBook.classList.add('book');
        let delBook = document.createElement('button');
        delBook.id = `del${book.id}`;
        delBook.textContent = '\u00D7';
        delBook.classList.add('delButton');
        let title = document.createElement("div");
        title.classList.add('bookTitle');
        title.textContent = book.title;
        let author = document.createElement('div');
        author.classList.add('bookInfo');
        author.textContent = 'By ' + book.author;
        let pages = document.createElement('div');
        pages.classList.add('bookInfo');
        pages.textContent = book.pages.toLocaleString('en-US') + ' pages';
        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button');
        let read = document.createElement('button');
        read.id = `read${book.id}`;
        read.classList.add('bookInfo');
        read.classList.add('readToggle')
        read.textContent = book.read;
        books.appendChild(thisBook);
        thisBook.appendChild(delBook);
        thisBook.appendChild(title);
        thisBook.appendChild(author);
        thisBook.appendChild(pages);
        thisBook.appendChild(buttonDiv);
        buttonDiv.appendChild(read);
    }
}

function delBook(id) {
    let index = myLibrary.findIndex(item => item.id === id);
    myLibrary.splice(index, 1);
    displayLibrary();
}

function toggleRead(id) {
    let index = myLibrary.findIndex(item => item.id === id);
    if(myLibrary[index].read === 'Read') myLibrary[index].read = 'Not Read';
    else if(myLibrary[index].read === 'Not Read') myLibrary[index].read = 'Read';
    let readButton = document.getElementById(`read${id}`);
    readButton.textContent = myLibrary[index].read;
}

function parseEvent(event) { 
    if(event.target.id.substring(0, 3) === "del") delBook(event.target.id.slice(3));
    else if(event.target.id.substring(0, 4) === 'read') toggleRead(event.target.id.slice(4));
}

// Opens dialog for form entry
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// Closes dialog without submitting
closeButton.addEventListener("click", () => {
  dialog.close();
});

// Submits form data as new book
submitForm.addEventListener("submit", inputBook);

// Deletes book from myLibrary or changes Read state of book
books.addEventListener('click', parseEvent);