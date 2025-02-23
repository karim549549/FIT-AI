import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenFactory {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(
    payload: {
      id: string;
      email: string;
      role: string;
    },
    type: 'access' | 'refresh',
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn:
        type === 'access'
          ? +process.env.ACCESS_TOKEN_EXPIRY
          : +process.env.REFRESH_TOKEN_EXPIRE_AT,
    });
  }
}
