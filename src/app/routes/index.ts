import { Router } from 'express';
import { userRoutes } from '../modules/users/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
