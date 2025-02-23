import { Profile, Prisma } from '@prisma/client';

// Use Prisma's `DietaryPreferences` type
export type ProfileWithDietaryPreferences = Profile & {
  dietaryPreferences: Prisma.DietaryPreferencesGetPayload<{
    select: any;
  }> | null;
};
