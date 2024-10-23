import { Response } from 'express';

type TMeta = {
  countTotal: number;
  page: number;
  totalPage: number;
  limit: number;
};

type TResponseData<T> = {
  statusCode: number;
  message?: string;
  token?: string;
  data: T;
  meta?: TMeta;
};

const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  return res.status(data?.statusCode).json({
    success: true,
    message: data?.message,
    token: data.token,
    data: data?.data,
    meta: data?.meta,
  });
};

export default sendResponse;
