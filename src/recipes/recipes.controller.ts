import { Controller, Get, Query, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeFilter } from './dtos/RecipeFilter.dto';
import { Result } from '@app/common';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('search')
  async getRecipeTitles(
    @Query() query: { title?: string; page?: number; size?: number },
  ): Promise<Result<any>> {
    return this.recipesService.getRecipeTitles(query);
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: number): Promise<Result<any>> {
    return this.recipesService.getRecipeById(Number(id));
  }
  @Get()
  async getFilteredRecipes(@Query() query: RecipeFilter): Promise<Result<any>> {
    return this.recipesService.getFilteredRecipes(query);
  }
}
