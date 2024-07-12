import { Request, Response } from 'express';
import httpStatus from 'http-status';

const notFoundRoute = (req: Request, res: Response) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `${req.originalUrl} the API is not found !`,
    error: '',
  });
};

export default notFoundRoute;
