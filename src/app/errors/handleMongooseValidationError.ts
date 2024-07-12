import httpStatus from 'http-status';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/errorInterface';
import mongoose from 'mongoose';

const handleMongooseValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = httpStatus.UNPROCESSABLE_ENTITY;
  const message = 'Validation error';
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value.path,
        message: value.message,
      };
    },
  );

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleMongooseValidationError;
