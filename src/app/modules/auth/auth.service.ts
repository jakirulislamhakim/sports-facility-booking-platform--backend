import httpStatus from 'http-status';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import {
  bcryptComparePassword,
  bcryptHashPassword,
  jwtAccessToken,
  jwtRefreshToken,
} from './auth.utils';
import AppError from '../../errors/AppError';
import { USER_ROLE } from '../user/user.constant';
import { decodedRefreshToken } from '../../utils/decodedJwtToken';

const signupIntoDB = async (payload: TUser) => {
  const { password, ...remainingPayload } = payload;

  // check the user is already exists
  const isExistsUser = await User.findOne({ email: payload.email });
  if (isExistsUser) {
    throw new AppError(httpStatus.CONFLICT, 'The user email is already exists');
  }

  const hashPassword = await bcryptHashPassword(password);
  // set user role
  remainingPayload.role = USER_ROLE.user;

  const data = await User.create({
    password: hashPassword,
    ...remainingPayload,
  });

  if (!data) {
    throw new Error("Something went wrong! Can't created user");
  }

  // jwt payload
  const jwtPayload = {
    email: data.email,
    role: data.role as keyof typeof USER_ROLE,
  };

  // create jwt access token
  const accessToken = jwtAccessToken(jwtPayload);
  // create jwt refresh token
  const refreshToken = jwtRefreshToken(jwtPayload);

  return {
    accessToken,
    refreshToken,
    data,
  };
};

const createAdminByAdminIntoDB = async (payload: TUser) => {
  const { password, ...remainingPayload } = payload;

  // check the email address is already exists
  const isExistsUser = await User.findOne({ email: payload.email });
  if (isExistsUser) {
    throw new AppError(
      httpStatus.CONFLICT,
      'The admin email is already exists',
    );
  }

  const hashPassword = await bcryptHashPassword(password);
  // set admin role
  remainingPayload.role = USER_ROLE.admin;

  const result = await User.create({
    password: hashPassword,
    ...remainingPayload,
  });

  if (!result) {
    throw new Error("Something went wrong! Can't created admin");
  }

  return result;
};

const login = async (payload: TLoginUser) => {
  const { email, password } = payload;
  // check user exists
  const isExistsUser = await User.findOne({ email }).select('+password');
  if (!isExistsUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect email or password.');
  }

  // check valid password
  const matchPassword = await bcryptComparePassword(
    password,
    isExistsUser?.password as string,
  );
  if (!matchPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect email or password.');
  }

  // jwt payload
  const jwtPayload = {
    email: isExistsUser.email,
    role: isExistsUser.role as keyof typeof USER_ROLE,
  };

  // create jwt access token
  const accessToken = jwtAccessToken(jwtPayload);
  // create jwt refresh token
  const refreshToken = jwtRefreshToken(jwtPayload);

  const user = await User.findOne({ email });

  return { accessToken, refreshToken, user };
};

const refreshToken = async (token: string) => {
  const verifyRefreshToken = decodedRefreshToken(token);
  const { email, role } = verifyRefreshToken;

  const isExistsUser = await User.findOne({ email, role });
  if (!isExistsUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid refresh token.');
  }

  // jwt payload
  const jwtPayload = {
    email: isExistsUser.email,
    role: isExistsUser.role as keyof typeof USER_ROLE,
  };

  // create jwt access token
  const accessToken = jwtAccessToken(jwtPayload);

  return { accessToken };
};

export const AuthServices = {
  signupIntoDB,
  createAdminByAdminIntoDB,
  login,
  refreshToken,
};
