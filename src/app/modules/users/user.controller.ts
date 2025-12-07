import { Request, Response } from 'express';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';

const getAllUsers = catchAsync(async (_req, res) => {
  const result = await userServices.getAllUsers();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: result.length ? 'Users retrieved successfully' : 'No users found',
    data: result,
  });
});

export const userControllers = {
  getAllUsers,
};
