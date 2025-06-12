import { Router } from 'express';
import {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from '@/controllers/book/book.controller';
import { authenticate } from '@/middleware/auth/auth.middleware';
import { validateBook } from '@/middleware/book/validation.middleware';

const router = Router();

// Public routes
router.get('/', getAllBooks);
router.get('/:id', getBook);

// Protected routes
router.post('/', authenticate, validateBook, createBook);
router.put('/:id', authenticate, validateBook, updateBook);
router.delete('/:id', authenticate, deleteBook);

export default router; 