import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { vehiclesService } from './vehicles.service';

const createVehicle = catchAsync(async (req, res) => {
  const result = await vehiclesService.createVehicle(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Vehicle created successfully',
    data: result,
  });
});

const getAllVehicles = catchAsync(async (_req, res) => {
  const result = await vehiclesService.getAllVehicles();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Vehicles retrieved successfully',
    data: result,
  });
});

const getVehicleById = catchAsync(async (req, res) => {
  const id = Number(req.params.vehicleId);
  const result = await vehiclesService.getVehicleById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Vehicle retrieved successfully',
    data: result,
  });
});

const updateVehicle = catchAsync(async (req, res) => {
  const id = Number(req.params.vehicleId);
  const result = await vehiclesService.updateVehicle(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Vehicle updated successfully',
    data: result,
  });
});

const deleteVehicle = catchAsync(async (req, res) => {
  const id = Number(req.params.vehicleId);
  const result = await vehiclesService.deleteVehicle(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Vehicle deleted successfully',
    data: result,
  });
});

export const vehicleController = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
