import express from 'express';
import { v4 } from 'uuid';
import bookControllers from '../controllers/bookControllers.js';
import books from '../data/data.js';

const app = express();

const router = express.Router();

router.get('/', bookControllers.getBooks);

router.get('/:id', bookControllers.getBook);

router.post('/', bookControllers.addBook);

router.put('/:id', bookControllers.popBook);

router.delete('/:id', bookControllers.deleteBook);

export default router;
