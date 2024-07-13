import { USER_ROLE } from '../user/user.constant';

export type TLoginUser = {
  email: string;
  password: string;
};

export type TJwtPayload = {
  email: string;
  role: keyof typeof USER_ROLE;
};
