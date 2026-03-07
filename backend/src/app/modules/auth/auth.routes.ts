/* eslint-disable @typescript-eslint/no-unused-vars */
// src/modules/auth/auth.routes.ts
import { Router } from 'express';
import { login, logout, getCurrentUser } from './auth.controller';
import { protect, isAdmin } from './auth.middleware';

const router = Router();

// Login for both admin & user
router.post('/login', login);

// Logout (protected)
router.post('/logout', protect, logout);

// Get current user (protected)
router.get('/me', protect, getCurrentUser);

export const AuthRoutes = router;

// import { Router } from 'express';
// import { getCurrentUser, loginAdmin, logoutAdmin } from './auth.controller';
// import { protect } from './auth.middleware';

// const router = Router();

// router.post('/login', loginAdmin);
// router.post('/logout', protect, logoutAdmin);
// router.get('/me', protect, getCurrentUser);

// export const AuthRoutes = router;
