import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DietPlan } from '@prisma/client';
import { MealWithRecipe } from '@app/common';
@Injectable()
export class DietPlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDietPlan(
    profileId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<DietPlan> {
    return this.prisma.dietPlan.create({
      data: {
        profileId,
        startDate,
        endDate,
      },
    });
  }

  async insertMeals(
    meals: { dietPlanId: number; day: number; recipeId: number }[],
  ): Promise<MealWithRecipe[]> {
    await this.prisma.meal.createMany({
      data: meals,
    });

    return this.prisma.meal.findMany({
      where: {
        dietPlanId: meals[0].dietPlanId,
      },
      include: {
        recipe: true,
      },
    });
  }

  async getDietPlanByProfileId(profileId: number): Promise<DietPlan | null> {
    return this.prisma.dietPlan.findFirst({
      where: { profileId },
      include: { meals: true },
    });
  }
  async getRecipesCount(): Promise<number> {
    return this.prisma.recipe.count();
  }
}
