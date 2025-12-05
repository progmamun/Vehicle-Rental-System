import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message || 'Something went wrong!';
  let error = err;

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
