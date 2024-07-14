export const BookingStatus = {
  unconfirmed: 'unconfirmed',
  confirmed: 'confirmed',
  cancelled: 'cancelled',
} as const;

export const CurrentDate = new Date().toISOString().slice(0, 10);
