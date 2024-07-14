import { Types } from 'mongoose';
import { BookingStatus } from './booking.constant';

export type TBooking = {
  user: Types.ObjectId; // Assuming user ID for simplicity
  facility: Types.ObjectId; // Assuming facility ID for simplicity
  startTime: string;
  endTime: string;
  date: string;
  payableAmount: number;
  isBooked: keyof typeof BookingStatus;
};
