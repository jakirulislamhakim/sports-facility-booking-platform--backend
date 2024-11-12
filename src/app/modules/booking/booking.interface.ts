import { Types } from 'mongoose';
import { BookingStatus, PaymentStatus, TimeSlots } from './booking.constant';

export type TBooking = {
  user: Types.ObjectId;
  facility: Types.ObjectId;
  timeSlot: (typeof TimeSlots)[number];
  date: string;
  payableAmount: number;
  isBooked: keyof typeof BookingStatus;
  paymentStatus: keyof typeof PaymentStatus;
  transactionId: string;
};
