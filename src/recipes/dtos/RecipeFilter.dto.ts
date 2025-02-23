import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class RecipeFilter {
  @IsOptional()
  @IsString()
  title?: string; // 🔹 Added Title Filter

  @IsOptional()
  @IsString()
  cuisine?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  maxCalories?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  minCalories?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  dairyFree?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  glutenFree?: boolean;

  @IsOptional()
  @IsString()
  mealType?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  pageSize?: number = 10;
}
