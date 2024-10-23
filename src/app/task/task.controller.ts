import { BadRequestError } from '../../utils/exceptions';
import { asyncWrapper } from '../../utils/wrapper';
import TaskService from './task.service';

export default class TaskController {
  private service: TaskService;

  constructor() {
    this.service = new TaskService();
  }

  createTask = asyncWrapper(async (req, res) => {
    const data = await this.service.createTask(req.body, Number(req.userId));
    return res.json({ data });
  });
  deleteTask = () => {};
  updateTask = () => {};
}
