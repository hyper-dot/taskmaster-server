import { Router } from 'express';
import { AuthController } from './auth.controller';
class AuthRoutes {
  router: Router;
  constroller: AuthController;
  constructor() {
    this.router = Router();
    this.constroller = new AuthController();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.post('/login', this.constroller.login);
    this.router.post('/refresh', this.constroller.refresh);
  }
}

export const authRoutes = new AuthRoutes().router;
