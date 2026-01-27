import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Admin } from '../admin/admin.model';
import { generateToken } from '../../../utils/generateToken';

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log('Password:', password);

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  // console.log('isMatch:', isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: 'Credentials are not matched!' });
  }

  const token = generateToken(
    admin._id.toString(),
    admin.email,
    admin.role as 'admin' | 'user'
  );

  // res.cookie('token', token, {
  //   httpOnly: true,
  //   secure: false, // localhost = false
  //   sameSite: 'lax', // ✅ REQUIRED for localhost
  // });

  // 🔐 Production config
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/', // 🔥 REQUIRED
  });

  // res.cookie('token', token, {
  //   httpOnly: true,
  //   secure: true, // ALWAYS true on Vercel
  //   sameSite: 'none', // ALWAYS none for cross-site
  //   path: '/',
  // });

  // res.cookie('token', token, {
  //   httpOnly: true,
  //   secure: true, // HTTPS only
  //   sameSite: 'none', // cross-domain
  // });

  // console.log('Token set in cookie:', token);

  res.status(200).json({
    success: true,
    message: 'Logged in successfully',
    user: {
      id: admin._id,
      email: admin.email,
      role: admin.role, // can be 'admin' or 'user'
    },
  });
};

// export const logoutAdmin = (_: Request, res: Response) => {
// res.cookie('token', '', {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//   expires: new Date(0), // 🔥 THIS is the real fix
//   path: '/',
// });

//   res.clearCookie('token', {
//     httpOnly: true,
//     secure: true,
//     sameSite: 'none',
//     path: '/',
//   });

//   res.status(200).json({
//     success: true,
//     message: 'Logged out successfully',
//   });
// };

// Get current user
export const getCurrentUser = (req: Request, res: Response) => {
  // req.user is set by protect middleware
  return res.status(200).json({
    success: true,
    message: 'User retrieved successfully',
    user: req.user,
  });
};

export const logoutAdmin = (_: Request, res: Response) => {
  // res.clearCookie('token', {
  //   httpOnly: true,
  //   sameSite: 'lax',
  //   secure: false,
  // });

  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
