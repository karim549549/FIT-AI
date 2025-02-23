import { IsOptional, IsInt, Min } from 'class-validator';

export class CreateDietaryDto {
  @IsOptional()
  allergies?: any;

  @IsOptional()
  cuisinePreferences?: any;

  @IsOptional()
  @IsInt()
  cookingTimePreference?: number;

  @IsOptional()
  foodVarietyLevel?: number;

  @IsOptional()
  @IsInt()
  mealFrequency?: number;

  @IsOptional()
  @IsInt()
  @Min(2)
  durationInWeeks?: number;
}
