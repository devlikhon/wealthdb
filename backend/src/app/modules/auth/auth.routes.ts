import { Router } from 'express';
import { loginAdmin, logoutAdmin } from './auth.controller';
import { protect } from './auth.middleware';

const router = Router();

router.post('/login', loginAdmin);
router.post('/logout', protect, logoutAdmin);

export const AuthRoutes = router;
