# Library Management System

This is a simple **Library Management System** implemented in Node.js using file-based storage. The system allows users to:

- **Add a new book** to the library.
- **Borrow a book** if it is available.
- **Return a borrowed book**.
- **View available books** that are not currently borrowed.
- **View borrowed books**.

The application stores the book data in a JSON file (`library.json`), which is updated whenever a new book is added, borrowed, or returned.

---

### Features

1. **Add a Book**:  
   - Allows you to add a new book by providing its title, author, and ISBN.
   - If the book already exists (based on ISBN), it won't be added again.

2. **Borrow a Book**:  
   - Allows a user to borrow a book by providing the ISBN.
   - Books can only be borrowed if they are not already borrowed by someone else.

3. **Return a Book**:  
   - Allows a user to return a borrowed book by providing the ISBN.
   - If the book was not borrowed, an appropriate message will be displayed.

4. **View Available Books**:  
   - Displays a list of books that are currently available for borrowing.
   - Shows the book title and ISBN.

5. **View Borrowed Books**:  
   - Displays a list of books that have already been borrowed.
   - Shows the book title and ISBN.

---

### File Structure

- `library.json`: Stores the data of all books in the library in a JSON format. Each book has the following properties:
  - `title`: The title of the book.
  - `author`: The author of the book.
  - `ISBN`: The ISBN of the book (unique identifier).
  - `isBorrowed`: A boolean flag indicating whether the book is borrowed or available.

---

### Requirements

- Node.js installed on your machine.
- `prompt-sync` module for user input (install using `npm install prompt-sync`).

---

### Usage

1. **Install Dependencies**:
   - Run the following command to install the necessary dependencies:
     ```bash
     npm install 
     ```

2. **Run the Program**:
   - Run the `library.js` file to start the Library Management System.
     ```bash
     node library.js
     ```

3. **Menu Options**:
   - Upon running the program, you will be presented with the following options:
     - `1. Add a Book`: Add a new book to the library.
     - `2. Borrow a Book`: Borrow a book by entering its ISBN.
     - `3. Return a Book`: Return a borrowed book by entering its ISBN.
     - `4. View Available Books`: View a list of books that are available to borrow.
     - `5. View Borrowed Books`: View a list of books that are already borrowed.
     - `6. Exit`: Exit the system.

---

