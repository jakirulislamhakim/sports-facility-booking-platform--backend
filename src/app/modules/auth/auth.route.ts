import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import ValidateRequest from '../../middleware/validateRequest';
import { UserValidations } from '../user/user.validation';

const router = Router();

router.post(
  '/signup',
  ValidateRequest(UserValidations.userValidationSchema),
  AuthControllers.signup,
);

const AuthRoutes = router;
export default AuthRoutes;
