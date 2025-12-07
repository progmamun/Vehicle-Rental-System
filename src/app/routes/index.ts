import { Router } from 'express';
import { userRoutes } from '../modules/users/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { vehiclesRoutes } from '../modules/vehicles/vehicles.routes';

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: '/',
    route: authRoutes,
  },
  {
    path: '/',
    route: userRoutes,
  },
  {
    path: '/vehicles',
    route: vehiclesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
