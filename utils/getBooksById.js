import books from '../data/data.js';

const getBooksById = (id) => {
  return books.find((book) => book.id === id);
};

export default getBooksById;
