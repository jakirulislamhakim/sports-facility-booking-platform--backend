import { Router } from "express";
import { FacilityControllers } from "./facility.controller";
import validateRequest from "../../middleware/validateRequest";
import { FacilityValidations } from "./facility.validation";

const router = Router();

router.post('/',
    validateRequest(FacilityValidations.facilityValidationSchema),
    FacilityControllers.createFacility);

export const FacilityRoutes = router;