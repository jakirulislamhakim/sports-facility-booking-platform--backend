import { Router } from 'express';
import { FacilityControllers } from './facility.controller';
import validateRequest from '../../middleware/validateRequest';
import { FacilityValidations } from './facility.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { upload } from '../../config/multer.config';
import parseTextToJSON from '../../middleware/parseTextToJSON';

const router = Router();

router.post(
  '/',
  upload.single('image'),
  parseTextToJSON,
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  auth(USER_ROLE.admin),
  FacilityControllers.createFacility,
);

router.put(
  '/:id',
  validateRequest(FacilityValidations.updateFacilityValidationSchema),
  auth(USER_ROLE.admin),
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
