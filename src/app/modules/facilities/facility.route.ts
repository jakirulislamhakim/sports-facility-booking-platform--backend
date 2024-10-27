import { Router } from 'express';
import { FacilityControllers } from './facility.controller';
import validateRequest from '../../middleware/validateRequest';
import { FacilityValidations } from './facility.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityControllers.createFacility,
);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidations.updateFacilityValidationSchema),
  FacilityControllers.updateFacility,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacility,
);

router.get('/', FacilityControllers.getAllFacility);

const FacilityRoutes = router;
export default FacilityRoutes;
