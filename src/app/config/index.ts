import dotenv from 'dotenv';

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
  JWT_ACCESS_EXP_TIME: process.env.JWT_ACCESS_EXP_TIME,
  JWT_REFRESH_EXP_TIME: process.env.JWT_REFRESH_EXP_TIME,
};
