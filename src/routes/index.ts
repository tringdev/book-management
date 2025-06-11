import { Router } from 'express';
import authRoutes from '@/routes/auth/auth.routes';
import authorRoutes from '@/routes/author/author.routes';
import bookRoutes from '@/routes/book/book.routes';

const router = Router();

// Auth routes
router.use('/auth', authRoutes);

// Author routes
router.use('/author', authorRoutes);

// Book routes
router.use('/book', bookRoutes);

export default router;