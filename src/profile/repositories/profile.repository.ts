import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from '../dtos/createProifle.dto';
import { CreateDietaryDto } from '../dtos/createDietary.dto';
import { Profile } from '@prisma/client';
import { DietaryPreferences } from '@prisma/client';
type ProfileWithDietaryPreferences = Profile & {
  dietaryPreferences: DietaryPreferences | null;
};

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProfileByUserId(
    userId: string,
  ): Promise<ProfileWithDietaryPreferences | null> {
    return this.prisma.profile.findUnique({
      where: { userId },
      include: { dietaryPreferences: true },
    });
  }
  async createProfile(
    userId: string,
    profileData: CreateProfileDto,
    dietaryPreferencesData?: CreateDietaryDto,
  ): Promise<Profile> {
    return this.prisma.profile.create({
      data: {
        userId,
        ...profileData,
        dietaryPreferences: dietaryPreferencesData
          ? { create: dietaryPreferencesData }
          : undefined,
      },
      include: { dietaryPreferences: true },
    });
  }
  async updateProfile(
    userId: string,
    profileData: Partial<CreateProfileDto>,
    dietaryPreferencesData?: Partial<CreateDietaryDto>,
  ): Promise<Profile> {
    const updatedProfile = await this.prisma.profile.update({
      where: { userId },
      data: profileData,
      include: { dietaryPreferences: true },
    });

    if (dietaryPreferencesData) {
      await this.prisma.dietaryPreferences.update({
        where: { profileId: updatedProfile.id },
        data: dietaryPreferencesData,
      });
    }

    return updatedProfile;
  }
}
