import { Router } from 'express';

const testRouter = Router();

testRouter.get('/', async (req, res) => {
	res.send('Hello World');
});

export default testRouter;
