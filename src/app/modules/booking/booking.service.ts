import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Facility } from '../facilities/facility.model';
import { TBooking } from './booking.interface';
import { differenceStartTimeEndTime } from './booking.utils';
import { Booking } from './booking.model';
import { Types } from 'mongoose';
import { BookingStatus, CurrentDate } from './booking.constant';

const createBookingIntoDB = async (payload: TBooking, user: Types.ObjectId) => {
  const { facility, startTime, endTime } = payload;
  const isFacilityExists = await Facility.findById(facility);
  if (!isFacilityExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility is not found!');
  }
  if (isFacilityExists.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility is not found!');
  }

  const differenceStartEndTimeByMin = differenceStartTimeEndTime(
    startTime,
    endTime,
  );

  // calculate payable amount
  const calculatePayableAmount =
    (isFacilityExists.pricePerHour / 60) * differenceStartEndTimeByMin;
  const payableAmount = parseFloat(calculatePayableAmount.toFixed(1));
  // set payableAmount
  payload.payableAmount = payableAmount;
  // set user _id
  payload.user = user;

  const result = await Booking.create(payload);
  return result;
};

const getAllBookingAdminFromDB = async () => {
  const result = await Booking.find().populate('facility').populate('user');
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

const getUserBookingsFromDB = async (user_id: Types.ObjectId) => {
  const result = await Booking.find({ user: user_id }).populate('facility');
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return result;
};

const BookingCancelByUserFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    {
      isBooked: BookingStatus.cancelled,
    },
    { new: true, runValidators: true },
  )
    .populate('facility')

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking is not found!');
  }

  return result;
};

const CheckAvailability = async (query: Record<string, unknown>) => {
  const { date: dateFromQuery } = query;
  const date = dateFromQuery ? dateFromQuery : CurrentDate;

  const result = await Booking.find({ date }).select('startTime endTime');

  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingAdminFromDB,
  getUserBookingsFromDB,
  BookingCancelByUserFromDB,
  CheckAvailability,
};
