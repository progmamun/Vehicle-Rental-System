import { StatusCodes } from 'http-status-codes';
import { pool } from '../../config/db';
import ApiError from '../../errors/ApiError';
import config from '../../config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, phone, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, phone, role, created_at;
    `,
    [name, email, hashedPass, phone, role]
  );

  return result.rows[0];
};

const loginUser = async (email: string, password: string) => {
  const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

  if (user.rowCount === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  const userData = user.rows[0];

  // Compare password
  const isMatch = await bcrypt.compare(password, userData.password);
  if (!isMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid password!');
  }

  // Create token
  const token = jwt.sign(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwtSecret as string,
    { expiresIn: '7d' }
  );

  delete userData.password;

  return {
    token,
    user: userData,
  };
};

export const authServices = {
  createUser,
  loginUser,
};
