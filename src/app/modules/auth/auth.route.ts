import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import ValidateRequest from '../../middleware/validateRequest';
import { UserValidations } from '../user/user.validation';
import { AuthValidations } from './auth.validation';

const router = Router();

router.post(
  '/signup',
  ValidateRequest(UserValidations.userValidationSchema),
  AuthControllers.signup,
);

router.post(
  '/login',
  ValidateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.login,
);

const AuthRoutes = router;
export default AuthRoutes;
