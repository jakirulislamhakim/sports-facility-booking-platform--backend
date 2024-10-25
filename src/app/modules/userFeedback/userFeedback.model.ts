import { TUserFeedback } from './userFeedback.interface';
import { Schema, model } from 'mongoose';

// Create a Mongoose schema for UserFeedback
const userFeedbackSchema = new Schema<TUserFeedback>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  feedback: { type: String, required: true },
  image: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false },
});

export const UserFeedback = model<TUserFeedback>(
  'UserFeedback',
  userFeedbackSchema,
);
