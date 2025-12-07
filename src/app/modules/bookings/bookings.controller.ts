import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingService } from './bookings.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingService.createBooking(req.body, req.user);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
};
