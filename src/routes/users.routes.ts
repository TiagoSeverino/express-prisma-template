import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
	const createUser = new CreateUserService();
	const { id, username, createdAt, updatedAt } = await createUser.execute(
		req.body
	);

	return res.json({ id, username, createdAt, updatedAt });
});

export default userRouter;
