/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from 'mongoose';
import { Admin } from './admin.model';
import config from '../../../config';

// npm run seed:admin - run command from backend folder

const seedAdmin = async () => {
  try {
    await mongoose.connect(config.db_url!);

    const adminExists = await Admin.findOne({
      email: 'admin-test@crm.com',
    });

    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }

    await Admin.create({
      email: 'ictianlikhon6@gmail.com',
      password: 'Admin-test@1234',
      name: 'Md. Akramul Hoque',
      role: 'admin',
    });

    console.log('Admin created successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
