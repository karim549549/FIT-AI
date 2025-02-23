import { Injectable } from '@nestjs/common';
import { ProgressRepository } from './repositories/progress.repository';
import { Result } from '@app/common';
import { ProgressLog } from '@prisma/client';
import { CreateProgressDto } from './dtos/createProgress.dto';
import { ProfileRepository } from 'src/profile/repositories/profile.repository';

@Injectable()
export class ProgressService {
  constructor(
    private readonly progressRepository: ProgressRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  private async getProfileId(userId: string): Promise<number | null> {
    const profile = await this.profileRepository.getProfileByUserId(userId);
    return profile ? profile.id : null;
  }

  async addProgressLog(
    userId: string,
    data: CreateProgressDto,
  ): Promise<Result<ProgressLog>> {
    const profileId = await this.getProfileId(userId);
    if (!profileId) return Result.failure('Profile not found.');

    const progressLog = await this.progressRepository.createProgressLog(
      profileId,
      data,
    );
    return Result.success(progressLog);
  }

  async getUserProgressLogs(userId: string): Promise<Result<ProgressLog[]>> {
    const profileId = await this.getProfileId(userId);
    if (!profileId) return Result.failure('Profile not found.');

    const logs = await this.progressRepository.getUserProgressLogs(profileId);
    return Result.success(logs);
  }
}
