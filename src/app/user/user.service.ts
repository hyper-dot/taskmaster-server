import { BadRequestError } from '../../utils/exceptions';
import { AuthService } from '../auth/auth.service';
import { TUserSchema, userSchema } from './user.schema';
import { userTable } from './user.model';

export default class UserService {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async addUser(payload: TUserSchema) {
    const { success, data } = userSchema.safeParse(payload);
    if (!success) throw new BadRequestError();

    // Check if user with same email exist

    // Add refresh token to user

    // Add hashed password to the user

    // await newUser.save();
    return { message: 'User created successfully' };
  }

  async getUserData(id: string) {
    // return await UserModel.findById(id).select('name role email');
  }
}
