import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../../utils/exceptions';
import { userTable } from '../user/user.model';
import { connectdb } from '../../configs/db';
import { eq } from 'drizzle-orm';

type User = {
  email: string;
  id: number;
};

export class AuthService {
  private accessTokenSecret: string;
  private refreshTokenSecret: string;
  private accessTokenExpiry: string;
  private refreshTokenExpiry: string;

  constructor() {
    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    this.accessTokenExpiry = '15m';
    this.refreshTokenExpiry = '7d';
  }

  generateAccessToken(user: Partial<User>) {
    return jwt.sign(
      { email: user.email, id: user.id },
      this.accessTokenSecret,
      {
        expiresIn: this.accessTokenExpiry,
      },
    );
  }

  generateRefreshToken(user: Partial<User>) {
    return jwt.sign(
      { email: user.email, id: user.id },
      this.refreshTokenSecret,
      {
        expiresIn: this.refreshTokenExpiry,
      },
    );
  }

  verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, this.accessTokenSecret);
    } catch (err) {
      throw new UnauthorizedError('Invalid access token');
    }
  }

  verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, this.refreshTokenSecret);
    } catch (err) {
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  refreshAccessToken(refreshToken: string) {
    try {
      const user: any = this.verifyRefreshToken(refreshToken);
      console.log('VEIRFIED USER', user);
      const token = this.generateAccessToken({
        email: user.email,
        id: user.id,
      });
      console.log('TOKEN', token);
      return token;
    } catch (err) {
      throw new BadRequestError(err);
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async login({ email, password }: { email: string; password: string }) {
    if (!email || !password) {
      throw new BadRequestError('Email and password are required');
    }

    // Fetch user by email
    const { db, connection } = await connectdb();
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .execute();

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isPasswordValid = await this.comparePassword(password, user.hash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate access token
    const accessToken = this.generateAccessToken({
      email: user.email,
      id: user.id,
    });

    // Handle refresh token verification or renewal
    let refreshToken = user.refresh_token;
    try {
      this.verifyRefreshToken(refreshToken);
    } catch (err) {
      console.log('Refresh token is invalid, generating a new one...');
      refreshToken = this.generateRefreshToken({
        id: user.id,
        email: user.email,
      });

      try {
        await db
          .update(userTable)
          .set({ refresh_token: refreshToken })
          .where(eq(userTable.id, user.id))
          .execute();
        console.log('Refresh token updated successfully');
        await connection.end();
      } catch (updateErr) {
        console.error('Database update error:', updateErr);
        throw new InternalServerError("Couldn't refresh token");
      }
    }

    return {
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
      },
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
}
