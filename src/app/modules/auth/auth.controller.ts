import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.createUser(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authServices.loginUser(email, password);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

export const authController = {
  createUser,
  loginUser,
};
