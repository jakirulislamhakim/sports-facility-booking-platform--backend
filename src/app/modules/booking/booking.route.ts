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

const BookingRoutes = router;
export default BookingRoutes;
