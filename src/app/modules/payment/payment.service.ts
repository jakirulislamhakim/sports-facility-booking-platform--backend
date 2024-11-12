/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentStatus } from '../booking/booking.constant';
import { Booking } from '../booking/booking.model';
import { verifyPayment } from './payment.utils';

const confirmPayment = async (tranId: string) => {
  const verifyPaymentResponse: any = await verifyPayment(tranId);

  let message = '';

  if (verifyPaymentResponse.data.pay_status === 'Successful') {
    await Booking.findOneAndUpdate(
      { transactionId: tranId },
      { paymentStatus: PaymentStatus.paid },
    );

    message = 'success';
  } else {
    message = 'failed';
  }

  return { message };
};

export const PaymentServices = {
  confirmPayment,
};
