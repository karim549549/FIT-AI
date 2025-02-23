import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Req,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dtos/createProifle.dto';
import { CreateDietaryDto } from './dtos/createDietary.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Response } from 'express';
import { CustomRequest } from '@app/common';
import { Result } from '@app/common';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  async getProfile(
    @Req() req: CustomRequest,
    @Res() res: Response,
  ): Promise<void> {
    const userId = req.user?.id;

    if (!userId) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json(Result.failure('Unauthorized request.'));
      return;
    }

    const result = await this.profileService.getProfileByUserId(userId);

    res
      .status(result.success ? HttpStatus.OK : HttpStatus.NOT_FOUND)
      .json(result);
  }
  @Post()
  async createProfile(
    @Req() req: CustomRequest,
    @Res() res: Response,
    @Body() profileDto: CreateProfileDto,
    @Body() dietaryDto?: CreateDietaryDto,
  ): Promise<void> {
    const userId = req.user?.id;

    if (!userId) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json(Result.failure('Unauthorized request.'));
      return;
    }

    const result = await this.profileService.createProfile(
      userId,
      profileDto,
      dietaryDto,
    );

    res
      .status(result.success ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST)
      .json(result);
  }
  @Put()
  async updateProfile(
    @Req() req: CustomRequest,
    @Res() res: Response,
    @Body() profileDto: Partial<CreateProfileDto>,
    @Body() dietaryDto?: Partial<CreateDietaryDto>,
  ): Promise<void> {
    const userId = req.user?.id;

    if (!userId) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json(Result.failure('Unauthorized request.'));
      return;
    }

    const result = await this.profileService.updateProfile(
      userId,
      profileDto,
      dietaryDto,
    );

    res
      .status(result.success ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
      .json(result);
  }
}
