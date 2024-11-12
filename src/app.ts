import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundRoute from './app/middleware/notFoundRoute';
import cookieParser from 'cookie-parser';
import { ModulesRoutes } from './app/routes';
import limiter from './app/middleware/limiter';

const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);
app.use(cookieParser());

// rate limiting for api
app.use(limiter);

// application routes
app.use('/api', ModulesRoutes);

const homeRoute = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Sports-facility-booking-platform is running',
  });
};

app.get('/', homeRoute);

// global error handle
app.use(globalErrorHandler);
// not found route
app.all('*', notFoundRoute);

export default app;
