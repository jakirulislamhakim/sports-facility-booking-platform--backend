import httpStatus from 'http-status';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import {
  bcryptComparePassword,
  bcryptHashPassword,
  jwtToken,
} from './auth.utils';
import config from '../../config';
import AppError from '../../errors/AppError';

const signupIntoDB = async (payload: TUser) => {
  const { password, ...remainingPayload } = payload;

  const hashPassword = await bcryptHashPassword(password);

  const result = await User.create({
    password: hashPassword,
    ...remainingPayload,
  });

  return result;
};

const login = async (payload: TLoginUser) => {
  const { email, password } = payload;
  // check user exists
  const isExistsUser = await User.findOne({ email }).select('+password');
  if (!isExistsUser) {
    throw new AppError(httpStatus.NOT_FOUND, '');
  }

  // check valid password
  const matchPassword = await bcryptComparePassword(
    password,
    isExistsUser?.password as string,
  );
  if (!matchPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Your password is incorrect');
  }

  // jwt payload
  const jwtPayload = {
    email: isExistsUser.email,
    role: isExistsUser.role,
  };

  // create jwt access token
  const accessToken = jwtToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET_KEY as string,
    '1d',
  );
  // create jwt
  const refreshToken = jwtToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET_KEY as string,
    '90d',
  );

  return { accessToken, refreshToken };
};

export const AuthServices = {
  signupIntoDB,
  login,
};
