import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from '@app/common';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { setAuthCookies } from './helpers/setAuthCookies';
import { RefreshTokenGuard, UserPayload } from './guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginRequest, @Res() res: Response): Promise<void> {
    const result = await this.authServices.login(dto);

    setAuthCookies(res, result.accessToken, result.refreshToken);

    res.status(HttpStatus.OK).json({ user: result.user });
  }

  @Post('register')
  async register(
    @Body() dto: { email: string; password: string; name: string },
    @Res() res: Response,
  ): Promise<void> {
    const result = await this.authServices.register(dto);

    setAuthCookies(res, result.accessToken, result.refreshToken);
    res.status(HttpStatus.CREATED).json({ user: result.user });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request, @Res() res: Response): Promise<void> {
    res.status(HttpStatus.OK).json({ message: 'User is authenticated' });
  }
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    const user = req.user as UserPayload;

    const result = await this.authServices.refreshToken({
      email: user.email,
      id: user.id,
      role: user.role,
    });

    setAuthCookies(res, result.accessToken, result.refreshToken);

    res.status(HttpStatus.CREATED).json({ message: 'Token refreshed' });
  }
}
