import dotenv from 'dotenv';
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import AppError from '@core/domain/errors/AppError';
import routes from './routes';
import cors from 'cors';
import '@core/domain/container';
import connection from '@core/infra/database';

connection();

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: error.message,
    });
  },
);

export { app };
