import express from 'express';
import auth from '../../middleware/auth';
import { vehicleController } from './vehicles.controller';

const router = express.Router();

router.post('/', auth('admin'), vehicleController.createVehicle);

router.get('/', vehicleController.getAllVehicles);

export const vehiclesRoutes = router;
