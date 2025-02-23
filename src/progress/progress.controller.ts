import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CustomRequest } from '@app/common';
import { Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  async addProgressLog(
    @Req() req: CustomRequest,
    @Body() body: any,
    @Res() res: Response,
  ) {
    const userId = req.user.id;
    const result = await this.progressService.addProgressLog(userId, body);

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Get()
  async getUserProgressLogs(@Req() req: CustomRequest, @Res() res: Response) {
    const userId = req.user.id;
    const result = await this.progressService.getUserProgressLogs(userId);

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
