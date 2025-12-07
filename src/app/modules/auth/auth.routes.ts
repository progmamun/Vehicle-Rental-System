import { authController } from './auth.controller';
import express from 'express';

const router = express.Router();

router.post('/signup', authController.createUser);
router.post('/signin', authController.loginUser);

export const authRoutes = router;
