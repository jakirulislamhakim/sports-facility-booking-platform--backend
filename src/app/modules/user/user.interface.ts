import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: keyof typeof USER_ROLE;
  address: string;
};
