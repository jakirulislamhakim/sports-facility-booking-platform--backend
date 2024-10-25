import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.route';
import FacilityRoutes from '../modules/facilities/facility.route';
import BookingRoutes from '../modules/booking/booking.route';
import UserRoutes from '../modules/user/user.route';
import UserFeedbackRoutes from '../modules/userFeedback/userFeedback.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/facility',
    route: FacilityRoutes,
  },
  {
    path: '/',
    route: BookingRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/user-feedback',
    route: UserFeedbackRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const ModulesRoutes = router;
