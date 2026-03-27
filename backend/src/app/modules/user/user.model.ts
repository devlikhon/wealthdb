// src/modules/user/user.model.ts
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../../../config';

export type Role = 'admin' | 'user';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },

    documents: {
      fileUrl: { type: String, required: true },
      fileType: { type: String, required: true },
      fileName: { type: String, required: true },
    },
    bankingDetails: {
      accountName: {
        type: String,
        required: true,
      },
      bankName: {
        type: String,
        required: true,
      },
      sortCode: {
        type: Number,
        required: true,
      },
      accountNumber: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model('User', UserSchema);
