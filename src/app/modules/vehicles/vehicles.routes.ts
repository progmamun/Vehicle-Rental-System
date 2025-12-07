import express from 'express';
import auth from '../../middleware/auth';
import { vehicleController } from './vehicles.controller';

const router = express.Router();

router.post('/', auth('admin'), vehicleController.createVehicle);

router.get('/', vehicleController.getAllVehicles);
router.get('/:vehicleId', vehicleController.getVehicleById);

router.put('/:vehicleId', auth('admin'), vehicleController.updateVehicle);
router.delete('/:vehicleId', auth('admin'), vehicleController.deleteVehicle);

export const vehiclesRoutes = router;
