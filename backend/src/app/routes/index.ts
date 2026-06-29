/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { DealTicketRoutes } from '../modules/dealTicket/dealTicket.routes';
import { ApplicantRoutes } from '../modules/applicant/applicant.routes';
import { ContactRoutes } from '../modules/contact/contact.route';

const routes = express.Router();

const collectionOfRoutes: any[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/dealtickets',
    route: DealTicketRoutes,
  },
  {
    path: '/applicants',
    route: ApplicantRoutes,
  },
  {
    path: '/contact',
    route: ContactRoutes,
  },
];

collectionOfRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
