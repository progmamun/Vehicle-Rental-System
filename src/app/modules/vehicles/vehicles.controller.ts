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

export const vehicleController = {
  createVehicle,
};
