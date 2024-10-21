import { Router } from 'express';
import UserController from './user.controller';
import { isAuthencticated } from '../../middleware';

class UserRoutes {
  public router: Router;

  private controller: UserController;

  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.post('/', this.controller.addUser);
    this.router.get('/my-data', isAuthencticated, this.controller.getMyData);
  }
}

const userRoutes = new UserRoutes().router;
export default userRoutes;
