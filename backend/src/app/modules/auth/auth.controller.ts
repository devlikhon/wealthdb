// src/modules/auth/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, Role } from '../user/user.model';
import { generateToken } from '../../../utils/generateToken';
import { AuthRequest } from './auth.interface';

// Login both admin & user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: 'Password does not match!' });

  const token = generateToken(
    user._id.toString(),
    user.email,
    user.role as Role,
    user.firstName
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      name: user.firstName,
      role: user.role,
    },
  });
};

// Logout
export const logout = (_: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });

  res.status(200).json({ success: true, message: 'Logged out successfully!' });
};

export const getCurrentUser = (req: Request, res: Response) => {
  const authReq = req as AuthRequest; // 👈 cast here

  return res.status(200).json({
    success: true,
    message: 'User retrieved successfully',
    user: authReq.user, // now TS is happy
  });
};

export const changePassword = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;

  const { currentPassword, newPassword } = req.body;

  if (!authReq.user?.id) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }

  const user = await User.findById(authReq.user.id).select('+password');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // 🔐 check current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }

  if (await bcrypt.compare(newPassword, user.password)) {
    return res.status(400).json({ message: 'New password must be different!' });
  }

  // 🔒 strong password validation
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!strongPassword.test(newPassword)) {
    return res.status(400).json({
      message:
        'Password must include uppercase, lowercase, number and special character',
    });
  }

  // ✅ set new password (will auto hash via pre('save'))
  user.password = newPassword;

  await user.save();

  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });

  res.status(200).json({
    success: true,
    message: 'Password updated successfully. Please login again.',
  });
};

// Get current user
// export const getCurrentUser = (req: AuthRequest, res: Response) => {
//   res.status(200).json({
//     success: true,
//     user: req.user,
//   });
// };

// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import { Admin } from '../admin/admin.model';
// import { generateToken } from '../../../utils/generateToken';

// export const loginAdmin = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   // console.log('Password:', password);

//   const admin = await Admin.findOne({ email }).select('+password');
//   if (!admin) {
//     return res.status(401).json({ message: 'Invalid credentials!' });
//   }

//   const isMatch = await bcrypt.compare(password, admin.password);

//   // console.log('isMatch:', isMatch);

//   if (!isMatch) {
//     return res.status(401).json({ message: 'Credentials are not matched!' });
//   }

//   const token = generateToken(
//     admin._id.toString(),
//     admin.email,
//     admin.role as 'admin' | 'user',
//     admin.name
//   );

//   // res.cookie('token', token, {
//   //   httpOnly: true,
//   //   secure: false, // localhost = false
//   //   sameSite: 'lax', // ✅ REQUIRED for localhost
//   // });

//   // 🔐 Production config
//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//     path: '/', // 🔥 REQUIRED
//   });

//   // res.cookie('token', token, {
//   //   httpOnly: true,
//   //   secure: true, // ALWAYS true on Vercel
//   //   sameSite: 'none', // ALWAYS none for cross-site
//   //   path: '/',
//   // });

//   // res.cookie('token', token, {
//   //   httpOnly: true,
//   //   secure: true, // HTTPS only
//   //   sameSite: 'none', // cross-domain
//   // });

//   // console.log('Token set in cookie:', token);

//   res.status(200).json({
//     success: true,
//     message: 'Logged in successfully',
//     user: {
//       id: admin._id,
//       name: admin.name,
//       email: admin.email,
//       role: admin.role, // can be 'admin' or 'user'
//     },
//   });
// };

// // Get current user
// export const getCurrentUser = (req: Request, res: Response) => {
//   // req.user is set by protect middleware
//   return res.status(200).json({
//     success: true,
//     message: 'User retrieved successfully',
//     user: req.user,
//   });
// };

// export const logoutAdmin = (_: Request, res: Response) => {
//   // res.clearCookie('token', {
//   //   httpOnly: true,
//   //   sameSite: 'lax',
//   //   secure: false,
//   // });

//   res.clearCookie('token', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//     path: '/',
//   });

//   res.status(200).json({
//     success: true,
//     message: 'Logged out successfully',
//   });
// };

// // export const logoutAdmin = (_: Request, res: Response) => {
// // res.cookie('token', '', {
// //   httpOnly: true,
// //   secure: process.env.NODE_ENV === 'production',
// //   sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
// //   expires: new Date(0), // 🔥 THIS is the real fix
// //   path: '/',
// // });

// //   res.clearCookie('token', {
// //     httpOnly: true,
// //     secure: true,
// //     sameSite: 'none',
// //     path: '/',
// //   });

// //   res.status(200).json({
// //     success: true,
// //     message: 'Logged out successfully',
// //   });
// // };
