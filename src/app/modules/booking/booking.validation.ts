import { Types } from 'mongoose';
import { z } from 'zod';
import { BookingStatus, CurrentDate, TimeSlots } from './booking.constant';

const dateYYMMDDFormat =
  /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const createBookingValidationSchema = z.object({
  body: z
    .object({
      facility: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid Facility ID',
      }),
      timeSlot: z.enum(TimeSlots),
      date: z.string().regex(dateYYMMDDFormat, {
        message: 'Invalid date format. Expected format is YYYY-MM-DD.',
      }),
      isBooked: z
        .enum(Object.keys(BookingStatus) as [string, ...string[]])
        .default(BookingStatus.confirmed),
    })
    .refine(
      (body) => {
        return body.date >= CurrentDate;
      },
      {
        message: 'Booking date cannot be in the past',
      },
    ),
});

export const BookingValidation = {
  createBookingValidationSchema,
};
