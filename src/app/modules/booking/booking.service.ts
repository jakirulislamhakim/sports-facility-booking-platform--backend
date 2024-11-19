import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Facility } from '../facilities/facility.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Types } from 'mongoose';
import { BookingStatus, CurrentDate, TimeSlots } from './booking.constant';
import { initiatePayment } from '../payment/payment.utils';
import { User } from '../user/user.model';

const createBookingIntoDB = async (payload: TBooking, user: Types.ObjectId) => {
  const { facility, timeSlot, date } = payload;

  // check the user is exists and isn't deleted
  const isFacilityExists = await Facility.findById(facility);
  if (!isFacilityExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility is not found!');
  }
  if (isFacilityExists.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility is not found!');
  }

  // check the user is exists
  const isExistsUser = await User.findById(user);
  if (!isExistsUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found!');
  }

  // check timeSlot is available in this date for the facility
  const isBookedTimeSlot = await Booking.findOne({ facility, date, timeSlot });
  if (isBookedTimeSlot) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The ${timeSlot} slot is already booked`,
    );
  }

  // set payableAmount
  payload.payableAmount = isFacilityExists.pricePerHour;
  // set user _id
  payload.user = user;
  // set transaction id
  payload.transactionId = `SFBP-${Date.now().toString()}`;

  const result = await Booking.create(payload);

  const initiatePaymentPayload = {
    amount: result.payableAmount.toString(),
    cus_email: isExistsUser.email,
    cus_name: isExistsUser.name,
    cus_phone: isExistsUser.phone,
    facilityName: isFacilityExists.name,
    tran_id: result.transactionId,
  };
  // call initiate payment
  const initiatePaymentInfo = initiatePayment(initiatePaymentPayload);

  return initiatePaymentInfo;
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

  return result;
};

const getUserSingleBookingFromDB = async (
  bookingId: string,
  user_id: Types.ObjectId,
) => {
  const result = await Booking.findById({
    _id: bookingId,
  }).populate('facility');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'The booking is not found');
  }

  const isRequestedUser = result.user.equals(user_id);

  if (!isRequestedUser) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't get the booking");
  }

  return result;
};

const BookingCancelByUserFromDB = async (
  id: string,
  user_id: Types.ObjectId,
) => {
  const booking = await Booking.findById(id).select('user');

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking is not found!');
  }

  const isRequestedUser = booking.user.equals(user_id);

  if (!isRequestedUser) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't update the booking");
  }

  const result = await Booking.findByIdAndUpdate(
    id,
    {
      isBooked: BookingStatus.cancelled,
    },
    { new: true, runValidators: true },
  ).populate('facility');

  return result;
};

const CheckAvailability = async (
  facility: string,
  // if current data is not given then set default data
  date: string = CurrentDate,
) => {
  // facility id given check
  if (!facility) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Please provide a facility id');
  }

  // check date is valid format
  const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (date && !dateRegex.test(date as string)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide a valid date in YYYY-MM-DD format',
    );
  }

  // check current date < user given date
  if (date < CurrentDate) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can't check past booking slot availability!",
    );
  }

  // check the facility exists
  const isExistsFacility = await Facility.findById(facility);
  if (!isExistsFacility) {
    throw new AppError(httpStatus.NOT_FOUND, 'The facility is not found!');
  }

  const existingBookingFacility = await Booking.find({ date, facility }).select(
    'timeSlot',
  );

  // if in this day no slot booked for this facility then show all slot for the facility
  if (!existingBookingFacility.length) {
    return { timeSlot: TimeSlots, date };
  }

  // get all booked timeSlot
  const bookedSlot = existingBookingFacility.map((slot) => slot.timeSlot);

  // exclude slot by filter out
  const timeSlot = TimeSlots.filter((slot) => !bookedSlot.includes(slot));
  return { timeSlot, date };
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingAdminFromDB,
  getUserBookingsFromDB,
  getUserSingleBookingFromDB,
  BookingCancelByUserFromDB,
  CheckAvailability,
};
