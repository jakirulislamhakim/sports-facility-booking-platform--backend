import bcrypt from 'bcryptjs';
import config from '../../config';
import { TJwtPayload } from './auth.interface';
import jwt from 'jsonwebtoken';

export const bcryptHashPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(config.BCRYPT_SALT_ROUNDS));
};

export const bcryptComparePassword = async (
  plainTextPassword: string,
  hashPassword: string,
) => {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const jwtAccessToken = (jwtPayload: TJwtPayload) => {
  return jwt.sign(jwtPayload, config.JWT_ACCESS_SECRET_KEY as string, {
    expiresIn: config.JWT_ACCESS_EXP_TIME,
  });
};

export const jwtRefreshToken = (jwtPayload: TJwtPayload) => {
  return jwt.sign(jwtPayload, config.JWT_REFRESH_SECRET_KEY as string, {
    expiresIn: config.JWT_REFRESH_EXP_TIME,
  });
};
