import { Response } from 'express';

type TResponseData<T> = {
  statusCode: number;
  message?: string;
  token?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  return res.status(data?.statusCode).json({
    success: true,
    message: data?.message,
    token: data.token,
    data: data?.data,
  });
};

export default sendResponse;
