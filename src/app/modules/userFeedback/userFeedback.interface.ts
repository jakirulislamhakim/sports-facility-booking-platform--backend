import { Types } from 'mongoose';

export type TUserFeedback = {
  user: Types.ObjectId;
  rating: number;
  feedback: string;
  image: string;
  isDeleted: boolean;
};
