import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';

import bookRouters from './routes/books.js';

dotenv.config();
const PORT = process.env.PORT || 3008;

// construct pass
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(PATH, 'views'));

// serve static folder
app.use(express.static(path.join(PATH, 'public')));

app.use('/api/books', bookRouters);

app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Not found',
    message: 'Page not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
