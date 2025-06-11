import { Router } from 'express';
import { register, login } from '@/controllers/auth/auth.controller';
import { validateForm } from '@/middleware/auth/validation.middleware';

const router = Router();

router.post('/register', validateForm, register);
router.post('/login', validateForm, login);

export default router;