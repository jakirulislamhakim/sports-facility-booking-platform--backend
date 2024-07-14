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

export const BookingControllers = {
  createBooking,
};
