import { Router } from 'express';
import { userRoutes } from '../modules/users/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { vehiclesRoutes } from '../modules/vehicles/vehicles.routes';
import { bookingRoutes } from '../modules/bookings/bookings.routes';

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/vehicles',
    route: vehiclesRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
