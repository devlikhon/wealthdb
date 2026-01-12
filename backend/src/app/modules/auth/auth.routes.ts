import { Router } from 'express';
import { getCurrentUser, loginAdmin, logoutAdmin } from './auth.controller';
import { protect } from './auth.middleware';

const router = Router();

router.post('/login', loginAdmin);
router.post('/logout', protect, logoutAdmin);
router.get('/me', protect, getCurrentUser);

export const AuthRoutes = router;
