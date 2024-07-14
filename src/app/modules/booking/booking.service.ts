import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Facility } from '../facilities/facility.model';
import { TBooking } from './booking.interface';
import { differenceStartTimeEndTime } from './booking.utils';
import { Booking } from './booking.model';
import { Types } from 'mongoose';

const createBookingIntoDB = async (payload: TBooking, user: Types.ObjectId) => {
  const { facility, startTime, endTime } = payload;
  const isFacilityExists = await Facility.findById(facility);
  if (!isFacilityExists) {
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
  // set user
  payload.user = user;

  const result = await Booking.create(payload);
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
};
