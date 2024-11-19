import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';
import { USER_ROLE } from '../modules/user/user.constant';
import { decodedAccessToken } from '../utils/decodedJwtToken';

const auth = (...requiredRole: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    const [, accessToken] = token.split(' ');

    const decoded = decodedAccessToken(accessToken);

    const { email, role } = decoded as JwtPayload;

    // check required role is match with jwt decoded role
    const matchRole = requiredRole.includes(role);
    if (!matchRole) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You have no access to this route!',
      );
    }

    // check if the user exists on db
    const user = await User.findOne({ email, role });
    if (!user) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route!',
      );
    }

    // attach full user info
    req.user = user;

    next();
  });
};

export default auth;
