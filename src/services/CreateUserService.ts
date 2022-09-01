import { hash } from 'bcryptjs';
import { User } from '../database/prisma';
import AppError from '../errors/AppError';

interface Request {
	username: string;
	password: string;
}

interface Response {
	id: string;
	username: string;
	createdAt: Date | string;
	updatedAt: Date | string;
}

class CreateUserService {
	public async execute({ username, password }: Request): Promise<Response> {
		if (!username) throw new AppError('Invalid username');
		if (!password) throw new AppError('Invalid password');

		const userExists = await User.findUnique({
			where: { username },
		});

		if (userExists) throw new AppError('This user already exists');

		const hashedPassword = await hash(password, 8);

		const { id, createdAt, updatedAt } = await User.create({
			data: {
				username,
				password: hashedPassword,
			},
		});

		return {
			id,
			username,
			createdAt,
			updatedAt,
		};
	}
}

export default CreateUserService;
