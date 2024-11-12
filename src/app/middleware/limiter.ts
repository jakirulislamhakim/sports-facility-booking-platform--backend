import rateLimit from 'express-rate-limit';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    const error = new AppError(
      httpStatus.TOO_MANY_REQUESTS,
      'Too many requests from this IP, please try again after 5 minutes.',
    );
    next(error);
  },
});

export default limiter;
