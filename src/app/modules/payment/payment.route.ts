import { Router } from 'express';
import { PaymentControllers } from './paymentController';

const router = Router();

router.post('/confirm', PaymentControllers.confirmPayment);

const PaymentRoutes = router;
export default PaymentRoutes;
