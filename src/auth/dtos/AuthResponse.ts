import { User } from '@prisma/client';

export class AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Partial<User>;

  constructor(accessToken: string, refreshToken: string, user: User) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = user;
  }
}
