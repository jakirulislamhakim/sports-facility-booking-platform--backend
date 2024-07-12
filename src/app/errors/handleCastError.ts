import httpStatus from 'http-status';
import mongoose from 'mongoose';
import {
  TGenericErrorResponse,
  TErrorSources,
} from '../interface/errorInterface';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = 'Invalid id';
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    message,
    statusCode,
    errorSources,
  };
};

export default handleCastError;
