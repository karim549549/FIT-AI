import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../profile/repositories/profile.repository';
import { DietPlanRepository } from './repositories/dietplan.repository';
import { Result } from '@app/common';
import { NotificationService } from '../notification/notification.service';
@Injectable()
export class DietPlanService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly dietPlanRepository: DietPlanRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async generateDietPlan(userId: string) {
    const profile = await this.profileRepository.getProfileByUserId(userId);
    if (!profile || !profile.dietaryPreferences) {
      return Result.failure('User profile or dietary preferences not found.');
    }

    const durationInWeeks = profile.dietaryPreferences.durationInWeeks || 4;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + durationInWeeks * 7);

    const dietPlan = await this.dietPlanRepository.createDietPlan(
      profile.id,
      startDate,
      endDate,
    );

    const recipeCount = await this.dietPlanRepository.getRecipesCount();
    if (recipeCount === 0) {
      return Result.failure('No recipes found.');
    }

    const meals = Array.from({ length: durationInWeeks * 7 }).map(
      (_, index) => ({
        dietPlanId: dietPlan.id,
        day: index + 1,
        recipeId: Math.floor(Math.random() * recipeCount) + 1,
      }),
    );

    const createdMeals = await this.dietPlanRepository.insertMeals(meals);

    const notificationSettings =
      await this.notificationService.getNotificationSettings(userId);
    if (!notificationSettings.success || !notificationSettings.data.push) {
      return Result.success({ dietPlan, createdMeals });
    }

    await this.notificationService.addMealNotifications(
      profile.id,
      createdMeals,
    );

    return Result.success({ dietPlan, createdMeals });
  }

  async getUserDietPlan(userId: string) {
    const profile = await this.profileRepository.getProfileByUserId(userId);
    if (!profile) {
      return Result.failure('User profile not found.');
    }

    const dietPlan = await this.dietPlanRepository.getDietPlanByProfileId(
      profile.id,
    );
    if (!dietPlan) {
      return Result.failure('No diet plan found.');
    }

    return Result.success(dietPlan);
  }
}
