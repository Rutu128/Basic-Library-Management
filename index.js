const fs = require("fs");
const prompt = require("prompt-sync")();

class Book {
  constructor(title, author, ISBN) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.isBorrowed = false;
  }

  borrowBook() {
    if (this.isBorrowed) {
      return `Sorry, "${this.title}" (ISBN: ${this.ISBN}) is already borrowed.`;
    } else {
      this.isBorrowed = true;
      return `You have successfully borrowed "${this.title}" (ISBN: ${this.ISBN}).`;
    }
  }

  returnBook() {
    if (!this.isBorrowed) {
      return `"${this.title}" (ISBN: ${this.ISBN}) was not borrowed.`;
    } else {
      this.isBorrowed = false;
      return `Thank you for returning "${this.title}" (ISBN: ${this.ISBN}).`;
    }
  }
}

class Library {
  constructor() {
    this.books = this.loadBooks();
  }

  loadBooks() {
    try {
      const data = fs.readFileSync("library.json", "utf8");
      const books = JSON.parse(data);
      return books.map((book) => new Book(book.title, book.author, book.ISBN));
    } catch (err) {
      return [];
    }
  }

  saveBooks() {
    fs.writeFileSync(
      "library.json",
      JSON.stringify(this.books, null, 2),
      "utf8"
    );
  }

  addBook(book) {
    const existingBook = this.books.find((b) => b.ISBN === book.ISBN);
    if (existingBook) {
      return `Book with ISBN "${book.ISBN}" already exists in the library.`;
    }
    this.books.push(book);
    this.saveBooks();
    return `Book "${book.title}" (ISBN: ${book.ISBN}) added to the library.`;
  }

  borrowBookByISBN(ISBN) {
    const book = this.books.find((b) => b.ISBN === ISBN);
    if (book) {
      const message = book.borrowBook();
      this.saveBooks();
      return message;
    } else {
      return `Book with ISBN "${ISBN}" not found.`;
    }
  }

  returnBookByISBN(ISBN) {
    const book = this.books.find((b) => b.ISBN === ISBN);
    if (book) {
      const message = book.returnBook();
      this.saveBooks();
      return message;
    } else {
      return `Book with ISBN "${ISBN}" not found.`;
    }
  }

  viewAvailableBooks() {
    const availableBooks = this.books
      .filter((b) => !b.isBorrowed)
      .map((b) => `"${b.title}" (ISBN: ${b.ISBN})`);
    return availableBooks.length ? availableBooks : "No books available.";
  }

  viewBorrowedBooks() {
    const borrowedBooks = this.books
      .filter((b) => b.isBorrowed)
      .map((b) => `"${b.title}" (ISBN: ${b.ISBN})`);
    return borrowedBooks.length ? borrowedBooks : "No books borrowed.";
  }
}

const library = new Library();

while (true) {
  console.log("\nLibrary Management System");
  console.log("1. Add a Book");
  console.log("2. Borrow a Book");
  console.log("3. Return a Book");
  console.log("4. View Available Books");
  console.log("5. View Borrowed Books");
  console.log("6. Exit");

  const choice = prompt("Enter your choice: ");

  switch (choice) {
    case "1":
      const title = prompt("Enter book title: ");
      const author = prompt("Enter book author: ");
      const ISBN = prompt("Enter book ISBN: ");
      console.log(library.addBook(new Book(title, author, ISBN)));
      break;

    case "2":
      const borrowISBN = prompt("Enter ISBN of the book to borrow: ");
      console.log(library.borrowBookByISBN(borrowISBN));
      break;

    case "3":
      const returnISBN = prompt("Enter ISBN of the book to return: ");
      console.log(library.returnBookByISBN(returnISBN));
      break;

    case "4":
      console.log("Available Books:", library.viewAvailableBooks());
      break;

    case "5":
      console.log("Borrowed Books:", library.viewBorrowedBooks());
      break;

    case "6":
      console.log("Exiting the system. Goodbye!");
      process.exit(0);

    default:
      console.log("Invalid choice. Please try again.");
  }
}
