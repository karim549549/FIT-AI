import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './repositories/receipe.repository';
import { RecipeFilter } from './dtos/RecipeFilter.dto';
import { Result } from '@app/common';

@Injectable()
export class RecipesService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async getRecipeTitles(query: {
    title?: string;
    page?: number;
    size?: number;
  }): Promise<Result<any>> {
    try {
      const result = await this.recipeRepository.getRecipeTitles({
        title: query.title || '',
        page: Number(query.page) || 1,
        size: Number(query.size) || 10,
      });
      return Result.success(result);
    } catch (error) {
      return Result.failure('Failed to fetch recipe titles.');
    }
  }

  async getRecipeById(id: number): Promise<Result<any>> {
    try {
      const recipe = await this.recipeRepository.getRecipeById(id);
      if (!recipe) return Result.failure('Recipe not found.');
      return Result.success(recipe);
    } catch (error) {
      return Result.failure('Failed to fetch recipe by ID.');
    }
  }

  async getFilteredRecipes(query: RecipeFilter): Promise<Result<any>> {
    try {
      const result = await this.recipeRepository.getRecipesByQueryFilter(query);
      return Result.success(result);
    } catch (error) {
      return Result.failure('Failed to fetch filtered recipes.');
    }
  }
}
