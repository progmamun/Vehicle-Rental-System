import { StatusCodes } from 'http-status-codes';
import { pool } from '../../config/db';
import ApiError from '../../errors/ApiError';

const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role, created_at FROM users ORDER BY id ASC;`
  );
  return result.rows;
};

const updateUser = async (userId: number, payload: any, loggedInUser: any) => {
  if (loggedInUser.role !== 'admin' && loggedInUser.id !== userId) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'You can only update your own profile!');
  }

  if (loggedInUser.role !== 'admin') {
    delete payload.role;
  }

  const fields = [];
  const values = [];
  let index = 1;

  for (const key in payload) {
    fields.push(`${key}=$${index}`);
    values.push(payload[key]);
    index++;
  }

  values.push(userId);

  const query = `
    UPDATE users
    SET ${fields.join(', ')}, updated_at=NOW()
    WHERE id=$${index}
    RETURNING id, name, email, phone, role;
  `;

  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  return result.rows[0];
};

const deleteUser = async (id: number) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING id`, [id]);

  if (result.rowCount === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  return true;
};

export const userServices = {
  getAllUsers,
  updateUser,
  deleteUser,
};
