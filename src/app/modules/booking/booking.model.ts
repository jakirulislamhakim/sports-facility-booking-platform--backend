import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';
import { BookingStatus, CurrentDate } from './booking.constant';

const bookingSchema = new Schema<TBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    facility: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    date: { type: String, required: true, default: CurrentDate },
    payableAmount: { type: Number },
    isBooked: {
      type: String,
      enum: Object.keys(BookingStatus),
      default: 'confirmed',
    },
  },
  {
    // timestamps: true,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
