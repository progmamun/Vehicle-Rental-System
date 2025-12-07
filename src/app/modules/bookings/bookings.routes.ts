import express from 'express';
import auth from '../../middleware/auth';
import { bookingController } from './bookings.controller';

const router = express.Router();

router.post('/', auth('admin', 'customer'), bookingController.createBooking);

export const bookingRoutes = router;
