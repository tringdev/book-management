import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import authorRoutes from './author/author.routes';
import bookRoutes from './book/book.routes';

const router = Router();

// Auth routes
router.use('/auth', authRoutes);

// Author routes
router.use('/author', authorRoutes);

// Book routes
router.use('/book', bookRoutes);

export default router; 