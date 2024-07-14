import { Router } from 'express';
import auth from '../../middleware/auth';
import { BookingControllers } from './booking.controller';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidation } from './booking.validation';

const router = Router();

router.post(
  '/',
  auth('user'),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/', auth('admin'), BookingControllers.getAllBookingAdmin);

router.get('/user', auth('user'), BookingControllers.getUserBookings);

const BookingRoutes = router;
export default BookingRoutes;
