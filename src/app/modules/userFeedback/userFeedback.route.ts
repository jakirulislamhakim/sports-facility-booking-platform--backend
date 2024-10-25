import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserFeedbackValidationSchema } from './userFeedback.validation';
import { UserFeedbackControllers } from './userFeedback.controller';
import auth from '../../middleware/auth';

const router = Router();

router.get('/', UserFeedbackControllers.getAllUserFeedback);

router.post(
  '/',
  validateRequest(UserFeedbackValidationSchema.userFeedbackSchema),
  auth('user'),
  UserFeedbackControllers.createUserFeedback,
);

const UserFeedbackRoutes = router;
export default UserFeedbackRoutes;
