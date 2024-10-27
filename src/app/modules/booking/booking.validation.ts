import { Types } from 'mongoose';
import { z } from 'zod';
import { BookingStatus } from './booking.constant';

const time24HrFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
const dateYYMMDDFormat = /^\d{4}-\d{2}-\d{2}$/;

const createBookingValidationSchema = z.object({
  body: z
    .object({
      facility: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid Facility ID',
      }),
      startTime: z.string().regex(time24HrFormat, {
        message: 'Invalid time format. Expected format is HH:MM',
      }),
      endTime: z.string().regex(time24HrFormat, {
        message: 'Invalid time format. Expected format is HH:MM',
      }),
      date: z.string().regex(dateYYMMDDFormat, {
        message: 'Invalid date format. Expected format is YYYY-MM-DD.',
      }),
      isBooked: z
        .enum(Object.keys(BookingStatus) as [string, ...string[]])
        .default(BookingStatus.confirmed),
    })
    .refine(
      (body) => {
        return body.endTime > body.startTime;
      },
      { message: "Start time can't be greater than end time!" },
    ),
});

export const BookingValidation = {
  createBookingValidationSchema,
  // updateBookingValidationSchema
};
