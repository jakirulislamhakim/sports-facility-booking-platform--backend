import { AuthServices } from './auth.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const signup = catchAsync(async (req, res) => {
  const data = await AuthServices.signupIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: `${data?.role} registered successfully`,
    data,
  });
});

export const AuthControllers = {
  signup,
};
