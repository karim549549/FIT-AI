import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './repositories/profile.repository';
import { CreateProfileDto } from './dtos/createProifle.dto';
import { CreateDietaryDto } from './dtos/createDietary.dto';
import { Result } from '@app/common';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getProfileByUserId(userId: string): Promise<Result<Profile>> {
    const profile = await this.profileRepository.getProfileByUserId(userId);
    if (!profile) {
      return Result.failure('Profile not found.');
    }
    return Result.success(profile);
  }

  async createProfile(
    userId: string,
    dto: CreateProfileDto,
    dietaryDto?: CreateDietaryDto,
  ): Promise<Result<Profile>> {
    const existingProfile =
      await this.profileRepository.getProfileByUserId(userId);
    if (existingProfile) {
      return Result.failure('User already has a profile.');
    }

    const profile = await this.profileRepository.createProfile(
      userId,
      dto,
      dietaryDto,
    );

    return Result.success(profile);
  }

  async updateProfile(
    userId: string,
    profileDto: Partial<CreateProfileDto>,
    dietaryDto?: Partial<CreateDietaryDto>,
  ): Promise<Result<Profile>> {
    const existingProfile =
      await this.profileRepository.getProfileByUserId(userId);
    if (!existingProfile) {
      return Result.failure('Profile not found.');
    }

    const updatedProfile = await this.profileRepository.updateProfile(
      userId,
      profileDto,
      dietaryDto,
    );
    return Result.success(updatedProfile);
  }
}
