import httpStatus from 'http-status';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/errorInterface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = 'Duplicate key error !';

  const pattern = /{([^}]*)}/;
  // Search for the pattern in the error message
  const match = err.message.match(pattern);

  const extractedValue = match[1];

  const errorSources: TErrorSources = [
    {
      message: extractedValue ? `'${extractedValue}' is already exist !` : '',
      path: Object.keys(err.keyPattern)[0],
    },
  ];

  return {
    message,
    statusCode,
    errorSources,
  };
};

export default handleDuplicateError;
