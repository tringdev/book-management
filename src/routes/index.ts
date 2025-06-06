import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import authorRoutes from './author/author.routes';

const router = Router();

// Auth routes
router.use('/auth', authRoutes);

// Author routes
router.use('/author', authorRoutes);

export default router; 