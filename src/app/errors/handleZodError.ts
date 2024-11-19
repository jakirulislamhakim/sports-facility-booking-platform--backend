import { ZodError } from 'zod';
import { TErrorSources } from '../interface/errorInterface';
import httpStatus from 'http-status';

const handleZodError = (err: ZodError) => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = 'Validation error';

  const errorSources: TErrorSources = err.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleZodError;
