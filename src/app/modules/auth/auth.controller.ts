import { AuthServices } from './auth.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';

const signup = catchAsync(async (req, res) => {
  const { data, accessToken, refreshToken } = await AuthServices.signupIntoDB(
    req.body,
  );

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV !== 'development',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `User registered successfully`,
    data,
    token: accessToken,
  });
});

const createAdminByAdmin = catchAsync(async (req, res) => {
  const data = await AuthServices.createAdminByAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Admin registered successfully`,
    data,
  });
});

const login = catchAsync(async (req, res) => {
  const {
    accessToken,
    refreshToken,
    user: data,
  } = await AuthServices.login(req.body);

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV !== 'development',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `User logged in successfully`,
    token: accessToken,
    data,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const { accessToken } = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Access token retrieved successfully`,
    token: accessToken,
    data: null,
  });
});

export const AuthControllers = {
  signup,
  createAdminByAdmin,
  login,
  refreshToken,
};
