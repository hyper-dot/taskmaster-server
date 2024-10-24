import { BadRequestError, NotFoundError } from '../../utils/exceptions';
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

    const hash = await this.authService.hashPassword(data.password);

    // Generate refresh token with a temporary ID
    // We'll include the actual ID in the token when we update it
    const temp_refresh_token = this.authService.generateRefreshToken({
      email: data.email,
    });

    // Insert user with all required fields
    const [newUser] = await db
      .insert(userTable)
      .values({
        name: data.name,
        email: data.email,
        hash,
        refresh_token: temp_refresh_token,
      })
      .$returningId();

    // Generate final refresh token with both email and id
    const refresh_token = this.authService.generateRefreshToken({
      email: data.email,
      id: newUser.id,
    });

    // Update user with the final refresh token
    await db
      .update(userTable)
      .set({ refresh_token })
      .where(eq(userTable.id, newUser.id))
      .execute();

    await connection.end();
    return { message: 'User created successfully' };
  }

  async getUserData(id: number) {
    const { db, connection } = await connectdb();
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .execute();
    await connection.end();

    if (!user) throw new NotFoundError('User not found');
    const { hash, refresh_token, ...rest } = user;
    return rest;
  }
}
