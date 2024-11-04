import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Booking } from '../booking/booking.model';
import { TUser } from '../user/user.interface';
import { TUserFeedback, TUserSendMessage } from './userFeedback.interface';
import { UserFeedback } from './userFeedback.model';
import sendEmail from '../../utils/sendEmail';

const getAllUserFeedbackFromDB = async () => {
  // create user feedback
  const result = await UserFeedback.find()
    .populate('user', 'name address -_id')
    .select('-isDeleted -__v');
  return result;
};

const createUserFeedbackIntoDB = async (
  userInfo: TUser,
  payload: TUserFeedback,
) => {
  const isBookedAnyFacilities = await Booking.findOne({ user: userInfo._id });

  if (!isBookedAnyFacilities) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You have not booked any facilities. We can't take fake feedback",
    );
  }

  // set to fixed 1 decimal number
  payload.rating = Number(payload.rating.toFixed(1));
  // set user_id as reference
  payload.user = userInfo._id;

  // create user feedback
  const result = await UserFeedback.create(payload);
  return result;
};

const sendMessageByEmail = async (payload: TUserSendMessage) => {
  await sendEmail(payload);
};

export const UserFeedbackServices = {
  getAllUserFeedbackFromDB,
  createUserFeedbackIntoDB,
  sendMessageByEmail,
};
