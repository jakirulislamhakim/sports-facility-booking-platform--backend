import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcryptjs';

const signupIntoDB = async (payload: TUser) => {
  const { password, ...remainingPayload } = payload;

  const hashPassword = await bcrypt.hash(
    password,
    Number(config.BCRYPT_SALT_ROUNDS),
  );

  const result = await User.create({
    password: hashPassword,
    ...remainingPayload,
  });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }

  return remainingPayload;
};

export const AuthServices = {
  signupIntoDB,
};
