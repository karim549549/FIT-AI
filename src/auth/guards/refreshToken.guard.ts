import { CanActivate, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

export interface UserPayload {
  id: string;
  email: string;
  role: string;
}

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    const payload =
      await this.jwtService.verifyAsync<UserPayload>(refreshToken);

    if (!payload) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    request.user = { id: payload.id, email: payload.email, role: payload.role };
    return true;
  }
}
