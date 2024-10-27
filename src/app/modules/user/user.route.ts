import { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from './user.validation';

const router = Router();

router.get('/', auth(USER_ROLE.admin), UserController.getAllUser);

router.post(
  '/change-role/:user_id',
  validateRequest(UserValidations.changeUserRoleValidationSchema),
  auth(USER_ROLE.admin),
  UserController.changeUserRole,
);

router.get(
  '/profile',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getMe,
);

const UserRoutes = router;
export default UserRoutes;
