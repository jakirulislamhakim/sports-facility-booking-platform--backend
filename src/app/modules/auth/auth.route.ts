import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import ValidateRequest from '../../middleware/validateRequest';
import { UserValidations } from '../user/user.validation';
import { AuthValidations } from './auth.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/signup',
  ValidateRequest(UserValidations.userValidationSchema),
  AuthControllers.signup,
);

router.post(
  '/create-admin',
  ValidateRequest(UserValidations.userValidationSchema),
  auth(USER_ROLE.admin),
  AuthControllers.createAdminByAdmin,
);

router.post(
  '/login',
  ValidateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.login,
);

router.post(
  '/refresh-token',
  ValidateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

const AuthRoutes = router;
export default AuthRoutes;
