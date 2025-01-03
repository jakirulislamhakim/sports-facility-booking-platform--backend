export const BookingStatus = {
  unconfirmed: 'unconfirmed',
  confirmed: 'confirmed',
  cancelled: 'cancelled',
} as const;

export const CurrentDate = new Date().toLocaleDateString('en-CA');

export const TimeSlots = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
] as const;

export const PaymentStatus = {
  paid: 'paid',
  pending: 'pending',
  failed: 'failed',
} as const;
