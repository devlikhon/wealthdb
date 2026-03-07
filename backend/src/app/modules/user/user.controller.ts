import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from './user.model';
import { generateToken } from '../../../utils/generateToken';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: 'Password does not match' });

  const token = generateToken(
    user._id.toString(),
    user.email,
    user.role,
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

export const logoutUser = (_: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });

  res.status(200).json({ success: true, message: 'Logged out successfully!' });
};
