import axios from 'axios';
import config from '../../config';
import { TInitialPayment } from './payment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const initiatePayment = async (payload: TInitialPayment) => {
  const { amount, tran_id, cus_email, cus_name, cus_phone, facilityName } =
    payload;

  const data = {
    store_id: config.AAMAR_PAY_STORE_ID,
    signature_key: config.AAMAR_PAY_SIGNATURE_KEY,
    tran_id: tran_id,
    cus_name,
    cus_email,
    cus_phone,
    amount: Number(amount),
    currency: 'BDT',
    desc: `Booking ${facilityName}`,
    success_url: `https://sports-facility-booking-platform-backend-tawny.vercel.app/api/payment/confirm?tranId=${tran_id}&status=success`,
    fail_url: `https://sports-facility-booking-platform-backend-tawny.vercel.app/api/payment/confirm?status=failed`,
    cancel_url: config.AAMAR_PAY_CANCEL_URL,
    type: 'json',
  };

  try {
    const response = await axios.post(config.AAMAR_PAY_INITIATE_URL!, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Payment Failed! Please try again');
  }
};

export const verifyPayment = async (transactionId: string) => {
  try {
    const response = await axios.get(config.AAMAR_PAY_VERIFY_URL!, {
      params: {
        request_id: transactionId,
        store_id: config.AAMAR_PAY_STORE_ID,
        signature_key: config.AAMAR_PAY_SIGNATURE_KEY,
        type: 'json',
      },
    });
    return response;
  } catch (error) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Payment failed');
  }
};
