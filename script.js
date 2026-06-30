const myLibrary = [];

// 1. The Book Constructor Function
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID(); // Unique stable identifier
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = Boolean(read);  
}

// 2. Prototype Method to toggle read status
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// 3. Independent utility to push new books to storage array
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBook(); // Re-render application layout
} 

// 4.Core display logic separation layer
function displayBook() {
    const container = document.getElementById('library-container');
    container.innerHTML = ``; // Clear existing grid context before rebuild 

    myLibrary.forEach((book) => {
        // Structural layout element configuration
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.setAttribute('data-id', book.id); // Association layer requirement

        card.innerHTML = `
            <div>
            <h3>${book.title}</h3>
            <p>By: ${book.author}</p>
            <p>${book.pages} pages</p>
        </div>
        <div class="card-actions">
            <button class="toggle-read-btn ${book.read ? 'is-read' : ''}">
            ${book.read ? 'Read' : 'Not Read'}
            </button>
            <button class="remove-btn">Remove</button>
        </div>
        `;

        // Event Delegation bound localized to scope nodes
        const removeBtn = card.querySelector('.remove-btn');
        removeBtn.addEventListener(`click`, () => removeBook(book.id));

        const toggleBtn = card.querySelector('.toggle-read-btn');
        toggleBtn.addEventListener(`click`, () => toggleBookStatus(book.id));

        container.appendChild(card);
    });
} 

// Data Array Alterations Context Methods
function removeBook(id) {
    const index =  myLibrary.findIndex((book) => book.id === id);
    if (index !== -1) {
        book.toggleRead();
        displayBook(); // Re-render application layout
    }
}

function toggleBookStatus(id) {
    const book = myLibrary.find((book) => book.id === id);
    if(book) {
        book.toggleRead();
        displayBook();
    }
}

// DOM Setup & Element Control Handling References
const dialog = document.getElementById('book-dialog'); 
const showFormBtn = document.getElementById('new-book-btn');
const cancelBtn = document.getElementById('cancel-btn');
const bookForm = document.getElementById('book-form');

// Modal Interactively Layer Configurations
showFormBtn.addEventListener(`click`, () => dialog.showModal());
cancelBtn.addEventListener(`click`, () => {
    bookForm.reset();
    dialog.close();
});

// Intercept submission pipeline via form constraints execution loops
bookForm.addEventListener(`submit`, (e) => {
    e.preventDefault(); // Prevent default page refresh / server POST loop

    const title = document.getElementById(`title`).value;
    const author = document.getElementById(`author`).value;
    const pages = document.getElementById(`pages`).value;
    const read = document.getElementById(`read`).checked;


    addBookToLibrary(title, author, pages, read);

    bookForm.reset(); // Clear input states
    dialog.close();  // Hide dialog
});

// Seed data execution block loops on initial load wrapper arrays
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Neuromancer", "William Gibson", 271, false);