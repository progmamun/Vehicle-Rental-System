import { pool } from '../../config/db';

const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role, created_at FROM users ORDER BY id ASC;`
  );
  return result.rows;
};

export const userServices = {
  getAllUsers,
};
