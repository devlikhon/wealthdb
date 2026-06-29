/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';

// const phoneSchema = {
//   countryCode: { type: String, required: true },
//   number: { type: String, required: true },
//   type: {
//     type: String,
//     enum: ['mobile', 'home', 'work'],
//     required: true,
//   },
//   isPrimary: { type: Boolean, default: false },
// };

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // basic email regex
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid email!`,
      },
    },

    phone: {
      countryCode: { type: String, required: true },
      number: { type: String, required: true },
      type: {
        type: String,
        enum: ['mobile', 'home', 'work'],
        required: true,
      },
      isPrimary: { type: Boolean, default: false },
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = model('Contact', ContactSchema);
