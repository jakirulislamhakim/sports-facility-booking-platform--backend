import { Types } from 'mongoose';
import { BookingStatus, TimeSlots } from './booking.constant';

export type TBooking = {
  user: Types.ObjectId; // Assuming user ID for simplicity
  facility: Types.ObjectId; // Assuming facility ID for simplicity
  timeSlot: (typeof TimeSlots)[number];
  date: string;
  payableAmount: number;
  isBooked: keyof typeof BookingStatus;
};
