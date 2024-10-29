import { RequestHandler } from 'express';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

const parseTextToJSON: RequestHandler = (req, res, next) => {
  if (req.body.data) {
    req.body = JSON.parse(req.body.data);
    next();
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Data is required in Form data');
  }
};

export default parseTextToJSON;
