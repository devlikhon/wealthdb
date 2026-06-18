import { Schema, model } from 'mongoose';
import { ICounter } from './counter.interface';

const counterSchema = new Schema<ICounter>({
  _id: {
    type: String,
    required: true,
  },
  sequenceValue: {
    type: Number,
    default: 0,
  },
});

export const Counter = model<ICounter>('Counter', counterSchema);
