import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync';

// roles = ["admin", "user"]
const auth = (...allowedRoles: string[]) => {
  return catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

      const { role } = decoded;

      if (!role) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token payload!');
      }

      // Role checking
      if (allowedRoles.length && !allowedRoles.includes(role)) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not allowed!');
      }

      // Attach user to request
      req.user = decoded;

      next();
    } catch (err: any) {
      if (err instanceof TokenExpiredError) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token expired, please login again!');
      }

      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid or malformed token!');
    }
  });
};

export default auth;
