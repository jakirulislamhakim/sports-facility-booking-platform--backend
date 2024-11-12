import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';
import {
  BookingStatus,
  CurrentDate,
  PaymentStatus,
  TimeSlots,
} from './booking.constant';

const bookingSchema = new Schema<TBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    facility: {
      type: Schema.Types.ObjectId,
      ref: 'Facility',
      required: true,
    },
    timeSlot: {
      type: String,
      enum: TimeSlots,
    },
    date: {
      type: String,
      required: true,
      default: CurrentDate,
    },
    payableAmount: { type: Number, required: true },
    isBooked: {
      type: String,
      enum: Object.keys(BookingStatus),
      default: BookingStatus.confirmed,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.keys(PaymentStatus),
      default: PaymentStatus.pending,
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
