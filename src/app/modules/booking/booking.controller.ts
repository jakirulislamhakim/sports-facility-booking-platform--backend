import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  // Here, `!` asserts that `req.user` is not null or undefined
  const data = await BookingServices.createBookingIntoDB(
    req.body,
    req.user!._id,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Booking created successfully',
    data,
  });
});

const getAllBookingAdmin = catchAsync(async (req, res) => {
  const data = await BookingServices.getAllBookingAdminFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: data.length ? 'Booking retrieved successfully' : 'No Data Found',
    data,
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  const data = await BookingServices.getUserBookingsFromDB(req.user!._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: data.length ? 'Booking retrieved successfully' : 'No Data Found',
    data,
  });
});

const bookingCancelByUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await BookingServices.BookingCancelByUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Booking cancelled successfully',
    data,
  });
});

const CheckAvailability = catchAsync(async (req, res) => {
  const data = await BookingServices.CheckAvailability(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Availability checked successfully',
    data,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookingAdmin,
  getUserBookings,
  bookingCancelByUser,
  CheckAvailability,
};
