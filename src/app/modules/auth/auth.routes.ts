import { authController } from './auth.controller';
import express from 'express';

const router = express.Router();

router.post('/auth/signin', authController.loginUserController);

export const authRoutes = router;
