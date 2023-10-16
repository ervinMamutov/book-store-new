import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

import books from '../data/data.js';
import getBooksById from '../utils/getBooksById.js';
const bookControllers = {
  getBooks: (req, res) => {
    res.status(200).render('books', { books: books });
  },
  getBook: (req, res) => {
    const { id } = req.params;
    const selectBook = getBooksById(id);
    if (selectBook) {
      console.log(selectBook);
      res.status(200).json(selectBook);
    } else {
      res.status(404).json({ message: `book by id ${id} don't find` });
    }
  },
  addBook: (req, res) => {
    const { title, author } = req.body;
    const newBook = {
      id: String(books.length + 1),
      title: title,
      author: author
    };
    books.push(newBook);
    res.status(201).json(newBook);
  },
  popBook: (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const bookExist = getBooksById(id);
    if (bookExist) {
      books.forEach((book, index) => {
        if (book.id === id) {
          const updateBook = { id: id, title: title, author: author };
          books[index] = updateBook;
          res.status(200).json(updateBook);
        }
      });
    } else {
      res.status(200).json({ message: `book with id ${id} doesn't exist` });
    }
  },
  deleteBook: (req, res) => {
    const { id } = req.params;
    const bookExist = getBooksById(id);
    if (bookExist) {
      books = books.filter((book) => book.id !== id);
      res
        .status(200)
        .json({ message: `book with id ${id} successful deleted` });
    } else {
      res.status(200).json({ message: `book with id ${id} doesn't exist` });
    }
  }
};

export default bookControllers;
