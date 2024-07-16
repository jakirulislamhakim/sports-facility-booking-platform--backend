import { Router } from 'express';
import auth from '../../middleware/auth';
import { BookingControllers } from './booking.controller';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidation } from './booking.validation';

const router = Router();

router.post(
  '/bookings',
  auth('user'),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/bookings', auth('admin'), BookingControllers.getAllBookingAdmin);

router.get('/bookings/user', auth('user'), BookingControllers.getUserBookings);

router.delete(
  '/bookings/:id',
  auth('user'),
  BookingControllers.bookingCancelByUser,
);

router.get(
  '/check-availability',
  auth('user', 'admin'),
  BookingControllers.CheckAvailability,
);

const BookingRoutes = router;
export default BookingRoutes;
