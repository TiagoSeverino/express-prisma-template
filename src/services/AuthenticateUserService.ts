import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import auth from '../config/auth';
import { User } from '../database/prisma';
import AppError from '../errors/AppError';

interface Request {
	username: string;
	password: string;
}

class AuthenticateUserService {
	public async execute({
		username,
		password,
	}: Request): Promise<{
		user: {
			username: string;
			password: string;
		};
		token: string;
	}> {
		try {
			if (!username || !password) throw new Error();

			const user = await User.findUnique({ where: { username } });

			if (!user) throw new Error();

			const passwordMatched = await compare(password, user.password);

			if (!passwordMatched) throw new Error();

			const { secret, expiresIn } = auth.jwt;
			const token = sign({}, secret, {
				subject: user.id,
				expiresIn,
			});

			return {
				user,
				token,
			};
		} catch {
			throw new AppError('Incorrect email/password combination');
		}
	}
}

export default AuthenticateUserService;
