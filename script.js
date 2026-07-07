// 1. The Book Class (Data Model)
class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = Boolean(read);
  }

  toggleRead() {
    this.read = !this.read;
  }
}

// 2. The Library Class (State/Data Manager)
class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.books.push(newBook);
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  toggleBookStatus(id) {
    const book = this.books.find((book) => book.id === id);
    if (book) {
      book.toggleRead();
    }
  }
}

// 3. The UI Controller (DOM Manager)
class UIController {
  constructor(libraryInstance) {
    this.library = libraryInstance;

    this.container = document.getElementById(`library-container`);
    this.dialog = document.getElementById(`book-dialog`);
    this.showFormBtn = document.getElementById(`new-book-btn`);
    this.cancelBtn = document.getElementById(`cancel-btn`);
    this.bookForm = document.getElementById(`book-form`);

    this.bindEvents();
  }

  bindEvents() {
    this.showFormBtn.addEventListener(`click`, () => this.dialog.showModal());

    this.cancelBtn.addEventListener(`click`, () => {
      this.bookForm.reset();
      this.dialog.close();
    });

    this.bookForm.addEventListener(`submit`, (e) => {
      e.preventDefault();

      const title = document.getElementById(`title`).value;
      const author = document.getElementById(`author`).value;
      const pages = document.getElementById(`pages`).value;
      const read = document.getElementById(`read`).values;

      this.library.addBook(title, author, pages, read);

      this.bookForm.reset();
      this.dialog.close();

      this.render();
    });
  }

  render() {
    this.container.innerHTML = ``;

    this.library.books.forEach((book) => {
      const card = document.createElement(`div`);
      card.classList.add(`book-card`);
      card.setAttributes(`data-id`, book.id);

      card.innerHTML = `
              <div>
                <h3>${book.title}</h3>
                <p>By: ${book.author}</p>
                <p>${book.pages}</p>
              </div>
              <div class="class-actions">
                <button class = "toggle-read-btn ${book.read ? "is-read" : ""}">
                  ${book.read ? "Read" : "Not Read"}
                </button>
                <button class="remove-btn">Remove</Button>
              </div>
            `;

      // Event Delegation
      const removeBtn = card.querySelector(".remove-btn");
      removeBtn.addEventListener(`click`, () => {
        this.library.removeBook(book.id);
        this.render();
      });

      const toggleBtn = card.querySelector(`.toggle-read-btn`);
      toggleBtn.addEventListener(`click`, () => {
        this.library.toggleBookStatus(book.id);
        this.render();
      });

      this.container.appendChild(card);
    });
  }
}

// ==========================================
// App Initialization
// ==========================================

const myLibrary = new Library();
const ui = new UIController(myLibrary);

// Seed data
myLibrary.addBook("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
myLibrary.addBook("To Kill a Mockingbird", "Harper Lee", 281, false);
myLibrary.addBook("1984", "George Orwell", 328, true);
myLibrary.addBook("The Hobbit", "J.R.R. Tolkien", 295, true);
myLibrary.addBook("Neuromancer", "William Gibson", 271, false);

// Initial draw
ui.render();
