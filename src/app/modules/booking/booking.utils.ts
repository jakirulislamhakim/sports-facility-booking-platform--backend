import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

export const differenceStartTimeEndTime = (
  startTime: string,
  endTime: string,
): number => {
  // parse string to number
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  const startDate = new Date();
  startDate.setHours(startHour, startMin, 0, 0);

  const endDate = new Date();
  endDate.setHours(endHour, endMin, 0, 0);

  const diffMilliseconds = endDate.getTime() - startDate.getTime();

  if (diffMilliseconds < 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'End time should be greater than start time',
    );
  }

  const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

  return diffMinutes;
};
