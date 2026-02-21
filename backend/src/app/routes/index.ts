/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { DealTicketRoutes } from '../modules/dealTicket/dealTicket.routes';

const routes = express.Router();

const collectionOfRoutes: any[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/dealtickets',
    route: DealTicketRoutes,
  },
];

collectionOfRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
