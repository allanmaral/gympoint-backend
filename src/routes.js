import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';

import AuthenticationMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(AuthenticationMiddleware);
// Authenticated routes
routes.post('/students', StudentsController.store);
routes.put('/students', StudentsController.update);

export default routes;
