import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

export const decodedAccessToken = (accessToken: string) => {
  try {
    const decoded = jwt.verify(
      accessToken,
      config.JWT_ACCESS_SECRET_KEY as string,
    ) as JwtPayload;
    return decoded;
  } catch (error) {
    const isTokenExpired = error instanceof jwt.TokenExpiredError;

    throw new AppError(
      httpStatus.UNAUTHORIZED,
      isTokenExpired
        ? 'Access token has expired. Please request a new access token.'
        : 'Invalid token. Please provide valid authentication credentials.',
    );
  }
};
export const decodedRefreshToken = (refreshToken: string) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      config.JWT_REFRESH_SECRET_KEY as string,
    ) as JwtPayload;
    return decoded;
  } catch (error) {
    const isTokenExpired = error instanceof jwt.TokenExpiredError;
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      isTokenExpired
        ? 'Refresh token has expired. Please log in again.'
        : 'Invalid token. Please provide valid authentication credentials.',
    );
  }
};
