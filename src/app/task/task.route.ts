import { Router } from 'express';
import TaskController from './task.controller';
import { isAuthencticated } from '../../middleware';

export class TaskRoute {
  router: Router;
  controller: TaskController;
  constructor() {
    this.router = Router();
    this.controller = new TaskController();
    this.mountRoutes();
  }
  private mountRoutes() {
    this.router.post('/', isAuthencticated, this.controller.createTask);
    this.router.get('/', isAuthencticated, this.controller.getTasks);
    this.router.delete('/:id', isAuthencticated, this.controller.deleteTask);
    this.router.patch('/:id', isAuthencticated, this.controller.updateTask);
  }
}

const taskRoutes = new TaskRoute().router;
export default taskRoutes;
