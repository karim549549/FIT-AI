import { Meal, Recipe } from '@prisma/client';

export type MealWithRecipe = Meal & { recipe: Recipe };
