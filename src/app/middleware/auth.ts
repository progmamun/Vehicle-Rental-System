import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync';

const auth = (...allowedRoles: string[]) => {
  return catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    console.log(token, 'get token');

    if (!token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    try {
      // Verify token
      const decoded = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload;

      const { role } = decoded;
      console.log(role, 'role');

      if (!role) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token payload!');
      }

      // Role checking
      if (allowedRoles.length && !allowedRoles.includes(role)) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not allowed!');
      }

      // Attach user info
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
