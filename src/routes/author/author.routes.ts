import { Router } from 'express';
import { 
  getAllAuthors, 
  getAuthor, 
  createAuthor, 
  updateAuthor, 
  deleteAuthor 
} from '../../controllers/author/author.controller';
import { authenticate } from '../../middleware/auth/auth.middleware';
import { validateAuthor } from '../../middleware/author/validation.middleware';

const router = Router();

// Public routes
router.get('/', getAllAuthors);
router.get('/:id', getAuthor);

// Protected routes
router.post('/', authenticate, validateAuthor, createAuthor);
router.put('/:id', authenticate, validateAuthor, updateAuthor);
router.delete('/:id', authenticate, deleteAuthor);

export default router; 