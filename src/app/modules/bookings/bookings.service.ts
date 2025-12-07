import { StatusCodes } from 'http-status-codes';
import { pool } from '../../config/db';
import ApiError from '../../errors/ApiError';

const createBooking = async (payload: Record<string, any>, loggedInUser: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  if (loggedInUser.role === 'customer' && loggedInUser.id !== customer_id) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      'You can only create bookings for your own account!'
    );
  }

  const vehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicle_id]);

  if (vehicle.rowCount === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Vehicle not found!');
  }

  const v = vehicle.rows[0];

  if (v.availability_status !== 'available') {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Vehicle is already booked!');
  }

  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid date range!');
  }

  const total_price = diffDays * Number(v.daily_rent_price);

  const booking = await pool.query(
    `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, 'active')
     RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  await pool.query(`UPDATE vehicles SET availability_status='booked' WHERE id=$1`, [vehicle_id]);

  return {
    ...booking.rows[0],
    vehicle: {
      vehicle_name: v.vehicle_name,
      daily_rent_price: v.daily_rent_price,
    },
  };
};

export const bookingService = {
  createBooking,
};
