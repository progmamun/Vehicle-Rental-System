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
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userId = Number(req.params.userId);
  const loggedInUser = req.user;

  const result = await userServices.updateUser(userId, req.body, loggedInUser);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = Number(req.params.userId);
  const result = await userServices.deleteUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const userControllers = {
  getAllUsers,
  updateUser,
  deleteUser,
};
