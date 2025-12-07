import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';

const loginUserController = catchAsync(async (req: Request, res: Response) => {
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
  loginUserController,
};
