import express from 'express';
import { userControllers } from './user.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.get('/', auth('admin'), userControllers.getAllUsers);

export const userRoutes = router;
