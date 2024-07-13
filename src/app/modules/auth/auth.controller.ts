import { AuthServices } from './auth.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';

const signup = catchAsync(async (req, res) => {
  const data = await AuthServices.signupIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: `${data?.role} registered successfully`,
    data,
  });
});

const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AuthServices.login(req.body);

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV !== 'development',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: `User logged in successfully`,
    data: {
      accessToken,
    },
  });
});

export const AuthControllers = {
  signup,
  login,
};
