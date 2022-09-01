import 'reflect-metadata';
import express, { json, NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import './config/env';
import './database';

import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
	if (err instanceof AppError)
		return res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});

	console.log(err);

	return res.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
});

app.listen(3333, () => {
	console.log('Server started on port 3333!');
});
