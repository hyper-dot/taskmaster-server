import express, { Application, Response, Request, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from '../configs/swagger';

// import { isAuthencticated } from '../middleware';

import authRoutes from './auth/auth.routes';
import userRoutes from './user/user.route';

import { handleError } from '../utils/errors';
import { NotFoundError } from '../utils/exceptions';

export class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.setMiddleware();
    this.setRoutes();
    this.handleErrors();
  }

  private setMiddleware() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(cors());
  }

  private setRoutes() {
    this.app.use('/auth', authRoutes);
    this.app.use('/user', userRoutes);
    if ((process.env.ENV = 'development')) {
      this.app.use(
        '/api/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerConfig),
      );
    }
  }

  private handleErrors() {
    this.app.use('*', () => {
      throw new NotFoundError();
    });

    this.app.use(
      //eslint-disable-next-line
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        const { statusCode, error } = handleError(err);
        res.status(statusCode).json({ error });
      },
    );
  }

  listen(port: number) {
    this.app.listen(port, () => console.log('App listening to port: ' + port));
  }
}
