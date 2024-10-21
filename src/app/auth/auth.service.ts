import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from '../../utils/exceptions';
import { userTable } from '../user/user.model';

type User = {
  id: string;
  email: string;
  role: string;
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

  generateAccessToken(user: User) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.accessTokenSecret,
      { expiresIn: this.accessTokenExpiry },
    );
  }

  generateRefreshToken(user: User) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.refreshTokenSecret,
      { expiresIn: this.refreshTokenExpiry },
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
      const token = this.generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role || 'user',
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
    // Check if email and password are provided
    if (!email || !password) {
      throw new BadRequestError('Email and password are required');
    }

    // Fetch the user by email
    // const user = await UserModel.findOne({ email });
    let user;

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (!user.isVerified) throw new ForbiddenError('You must verify otp first');

    // Compare the plain password with the hashed password in the database
    const isPasswordValid = await this.comparePassword(password, user.hash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate access token
    const accessToken = this.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Return the generated tokens
    return {
      message: 'Login successful',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      data: {
        accessToken,
        refreshToken: user.refreshToken,
      },
    };
  }
}
