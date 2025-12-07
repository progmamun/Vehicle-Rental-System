import { StatusCodes } from 'http-status-codes';
import { pool } from '../../config/db';
import ApiError from '../../errors/ApiError';

const createVehicle = async (payload: Record<string, unknown>) => {
  const { vehicle_name, type, registration_number, daily_rent_price, availability_status } =
    payload;

  const result = await pool.query(
    `
    INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    [vehicle_name, type, registration_number, daily_rent_price, availability_status]
  );

  return result.rows[0];
};

const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles ORDER BY id ASC;`);
  return result.rows;
};

const getVehicleById = async (id: number) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);

  if (result.rowCount === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Vehicle not found!');
  }

  return result.rows[0];
};

const updateVehicle = async (id: number, payload: Record<string, unknown>) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const key in payload) {
    fields.push(`${key}=$${index}`);
    values.push(payload[key]);
    index++;
  }

  values.push(id);

  const result = await pool.query(
    `
    UPDATE vehicles 
    SET ${fields.join(', ')}, updated_at=NOW()
    WHERE id=$${index}
    RETURNING *;
    `,
    values
  );

  if (result.rowCount === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Vehicle not found!');
  }

  return result.rows[0];
};

const deleteVehicle = async (id: number) => {
  const result = await pool.query(`DELETE FROM vehicles WHERE id=$1 RETURNING id`, [id]);

  if (result.rowCount === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Vehicle not found!');
  }

  return true;
};

export const vehiclesService = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
