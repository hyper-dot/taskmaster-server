import { BadRequestError, InternalServerError } from '../../utils/exceptions';
import { AuthService } from '../auth/auth.service';
import { TUserSchema, userSchema } from './user.schema';

import { userTable } from './user.model';
import { connectdb } from '../../configs/db';
import { eq } from 'drizzle-orm';

export default class UserService {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async addUser(payload: TUserSchema) {
    const { success, data } = userSchema.safeParse(payload);
    if (!success) throw new BadRequestError();

    const { db, connection } = await connectdb();

    // Check if user with same email exist
    const [existingUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, data.email))
      .execute();

    if (existingUser) throw new BadRequestError('User already exists');

    // Add refresh token to user
    const refresh_token = this.authService.generateRefreshToken({
      email: data.email,
    });
    const hash = await this.authService.hashPassword(data.password);

    // Save user
    await db
      .insert(userTable)
      .values({ name: data.name, email: data.email, hash, refresh_token })
      .execute();

    await connection.end();
    return { message: 'User created successfully' };
  }

  async getUserData(id: number) {
    const { db, connection } = await connectdb();
    const [existingUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .execute();
  }
}
