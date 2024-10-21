import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const changeUserRoleIntoDB = async (
  _id: string,
  payload: Pick<TUser, 'role'>,
  currentUserEmail: string,
) => {
  const isExistsUser = await User.findById(_id);
  if (!isExistsUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
  }

  // an admin can't change own role and can't change first admin role
  if (
    isExistsUser.email === config.FIRST_ADMIN_EMAIL ||
    isExistsUser.email === currentUserEmail
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't change the user role");
  }
  const result = await User.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const UserServices = {
  getAllUserFromDB,
  changeUserRoleIntoDB,
};
