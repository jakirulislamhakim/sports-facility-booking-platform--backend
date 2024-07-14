import { Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: keyof typeof USER_ROLE;
  address: string;
};
