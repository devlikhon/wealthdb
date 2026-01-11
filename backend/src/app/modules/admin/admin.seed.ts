/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from 'mongoose';
import { Admin } from './admin.model';
import config from '../../../config';

const seedAdmin = async () => {
  try {
    await mongoose.connect(config.db_url!);

    const adminExists = await Admin.findOne({
      email: 'admin@crm.com',
    });

    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }

    await Admin.create({
      email: 'admin@crm.com',
      password: 'Admin@123',
      role: 'admin', // ✅ REQUIRED
    });

    console.log('Admin created successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
