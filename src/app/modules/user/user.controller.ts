import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getAllUser = catchAsync(async (req, res) => {
  const data = await UserServices.getAllUserFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data,
  });
});

const changeUserRole = catchAsync(async (req, res) => {
  const currentUserEmail = req.user?.email;
  const { user_id } = req.params;

  const data = await UserServices.changeUserRoleIntoDB(
    user_id,
    req.body,
    currentUserEmail as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User role change successfully',
    data,
  });
});

const getMe = catchAsync(async (req, res) => {
  const data = req.user;

  // can't need get me service because user already attached in req

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User role change successfully',
    data,
  });
});

export const UserController = {
  getAllUser,
  changeUserRole,
  getMe,
};
