import { Injectable } from '@nestjs/common';
import { TokenFactory } from './factories/Token.factory';
import { UserService } from '../user/user.service';
import { LoginRequest } from '@app/common';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from './dtos/AuthResponse';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenFactory: TokenFactory,
    private readonly userService: UserService,
  ) {}
  async login(dto: LoginRequest): Promise<AuthResponse> {
    const user = await this.userService.getUserByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.hashPassword))) {
      throw new Error('User not found');
    }
    return {
      accessToken: await this.tokenFactory.createToken(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        'access',
      ),
      refreshToken: await this.tokenFactory.createToken(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        'refresh',
      ),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async register(dto: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthResponse> {
    const user = await this.userService.getUserByEmail(dto.email);

    if (user) {
      throw new Error('User already exists');
    }

    const createdUser = await this.userService.createUser({
      email: dto.email,
      hashPassword: await bcrypt.hash(dto.password, 10),
      name: dto.name,
    });

    return {
      accessToken: await this.tokenFactory.createToken(
        {
          id: createdUser.id,
          email: createdUser.email,
          role: createdUser.role,
        },
        'access',
      ),
      refreshToken: await this.tokenFactory.createToken(
        {
          id: createdUser.id,
          email: createdUser.email,
          role: createdUser.role,
        },
        'refresh',
      ),
      user: {
        id: createdUser.id,
        email: createdUser.email,
        role: createdUser.role,
      },
    };
  }

  async refreshToken(user: {
    id: string;
    email: string;
    role: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    return {
      accessToken: await this.tokenFactory.createToken(
        { id: user.id, email: user.email, role: user.role },
        'access',
      ),
      refreshToken: await this.tokenFactory.createToken(
        { id: user.id, email: user.email, role: user.role },
        'refresh',
      ),
    };
  }
}
