import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  UseGuards,
  Req,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CustomRequest } from '@app/common';
import { Response } from 'express';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post('fcm-token')
  async saveFcmToken(
    @Req() req: CustomRequest,
    @Body('fcmToken') fcmToken: string,
    @Res() res: Response,
  ) {
    const userId = req.user.id;
    const result = await this.notificationService.saveFcmToken(
      userId,
      fcmToken,
    );

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('settings')
  async getNotificationSettings(
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    const userId = req.user.id;
    const result =
      await this.notificationService.getNotificationSettings(userId);

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Patch('settings')
  async updateNotificationSettings(
    @Req() req: CustomRequest,
    @Body('enable') enable: boolean,
    @Res() res: Response,
  ) {
    const userId = req.user.id;
    const result = await this.notificationService.enableNotifications(
      userId,
      enable,
    );

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
