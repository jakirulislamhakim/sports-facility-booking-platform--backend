import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserFeedbackValidationSchema } from './userFeedback.validation';
import { UserFeedbackControllers } from './userFeedback.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.get('/', UserFeedbackControllers.getAllUserFeedback);

router.post(
  '/',
  validateRequest(UserFeedbackValidationSchema.userFeedbackSchema),
  auth(USER_ROLE.user),
  UserFeedbackControllers.createUserFeedback,
);

router.post(
  '/send-message',
  validateRequest(UserFeedbackValidationSchema.userSendMessageValidationSchema),
  UserFeedbackControllers.sendMessageByEmail,
);

const UserFeedbackRoutes = router;
export default UserFeedbackRoutes;
