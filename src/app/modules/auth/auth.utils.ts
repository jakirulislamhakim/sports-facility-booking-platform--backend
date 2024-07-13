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

export const jwtToken = (
  jwtPayload: TJwtPayload,
  secretKey: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secretKey, {
    expiresIn,
  });
};
