import { BadRequestError } from '../../utils/exceptions';
import { asyncWrapper } from '../../utils/wrapper';
import UserService from './user.service';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  addUser = asyncWrapper(async (req, res) => {
    const response = await this.service.addUser(req.body);
    return res.status(201).json(response);
  });

  getMyData = asyncWrapper(async (req, res) => {
    if (isNaN(Number(req.userId))) throw new BadRequestError('Invalid user id');
    const data = await this.service.getUserData(Number(req.userId));
    return res.json({ data });
  });
}
