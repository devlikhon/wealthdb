import { Router } from 'express';
import { loginAdmin, logoutAdmin } from './auth.controller';
import { protect } from './auth.middleware';

const router = Router();

router.post('/login', loginAdmin);
router.post('/logout', protect, logoutAdmin);

// 🧪 TEST PROTECTED ROUTE
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

export const AuthRoutes = router;
