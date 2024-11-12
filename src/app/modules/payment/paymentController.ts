import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import { PaymentServices } from './payment.service';

const confirmPayment = catchAsync(async (req, res) => {
  const { tranId } = req.query;

  const data = await PaymentServices.confirmPayment(tranId as string);

  const url =
    data.message === 'success'
      ? (config.AAMAR_PAY_SUCCESS_URL as string)
      : (config.AAMAR_PAY_FAILED_URL as string);

  res.redirect(url);
});

export const PaymentControllers = {
  confirmPayment,
};
