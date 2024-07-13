import { Router } from 'express';
import { FacilityControllers } from './facility.controller';
import validateRequest from '../../middleware/validateRequest';
import { FacilityValidations } from './facility.validation';
import auth from '../../middleware/auth';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityControllers.createFacility,
);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(FacilityValidations.updateFacilityValidationSchema),
  FacilityControllers.updateFacility,
);

router.delete('/:id', auth('admin'), FacilityControllers.deleteFacility);

router.get('/', auth('admin', 'user'), FacilityControllers.getAllFacility);

export const FacilityRoutes = router;
