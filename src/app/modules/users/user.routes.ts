import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/auth/signup', userControllers.createUser);

export const userRoutes = router;
