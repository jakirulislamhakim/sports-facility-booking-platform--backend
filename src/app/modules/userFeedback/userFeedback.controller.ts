import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserFeedbackServices } from './userFeedback.service';
import { TUser } from '../user/user.interface';

const getAllUserFeedback = catchAsync(async (req, res) => {
  const data = await UserFeedbackServices.getAllUserFeedbackFromDB();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: `User feedback retrieved successfully`,
    data,
  });
});
const createUserFeedback = catchAsync(async (req, res) => {
  const data = await UserFeedbackServices.createUserFeedbackIntoDB(
    req.user as TUser,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: `User feedback successfully`,
    data,
  });
});

const sendMessageByEmail = catchAsync(async (req, res) => {
  await UserFeedbackServices.sendMessageByEmail(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: `Send your message successfully`,
    data: null,
  });
});

export const UserFeedbackControllers = {
  getAllUserFeedback,
  createUserFeedback,
  sendMessageByEmail,
};
