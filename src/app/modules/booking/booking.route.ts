import { Router } from 'express';
import auth from '../../middleware/auth';
import { BookingControllers } from './booking.controller';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidation } from './booking.validation';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/bookings',
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get(
  '/bookings',
  auth(USER_ROLE.admin),
  BookingControllers.getAllBookingAdmin,
);

router.get(
  '/bookings/user',
  auth(USER_ROLE.user),
  BookingControllers.getUserBookings,
);

router.get(
  '/bookings/user/:bookingId',
  auth(USER_ROLE.user),
  BookingControllers.getUserSingleBooking,
);

router.patch(
  '/bookings/:id',
  auth(USER_ROLE.user),
  BookingControllers.bookingCancelByUser,
);

router.get(
  '/check-availability',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BookingControllers.CheckAvailability,
);

const BookingRoutes = router;
export default BookingRoutes;
