import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.get('/', ensureAuthenticated, async (req, res) => {
	return res.json({ authenticated: true });
});

sessionRouter.post('/', async (req, res) => {
	const authenticateUser = new AuthenticateUserService();

	const {
		user: { username },
		token,
	} = await authenticateUser.execute(req.body);

	return res.json({ username, token });
});

export default sessionRouter;
