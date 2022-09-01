import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import sessionRouter from './sessions.routes';
import testRouter from './test.routes';
import userRouter from './users.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

routes.use(ensureAuthenticated);
routes.use('/test', testRouter);

export default routes;
