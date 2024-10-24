import { asyncWrapper } from '../../utils/wrapper';
import TaskService from './task.service';

export default class TaskController {
  private service: TaskService;

  constructor() {
    this.service = new TaskService();
  }

  createTask = asyncWrapper(async (req, res) => {
    const data = await this.service.createTask(req.body, Number(req.userId));
    return res.json({ data, message: 'Task added successfully !' });
  });
  getTasks = asyncWrapper(async (req, res) => {
    const data = await this.service.getTasks(Number(req.userId), req.query);
    return res.json({ data, count: data.length });
  });

  deleteTask = asyncWrapper(async (req, res) => {
    const id = Number(req.params.id);
    const user = Number(req.userId);
    await this.service.deleteTask(user, id);
    return res.json({ message: 'Task deleted successfully' });
  });
  updateTask = () => {};
}
