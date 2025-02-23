import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipeRepository } from './repositories/receipe.repository';
@Module({
  providers: [RecipesService, RecipeRepository],
  controllers: [RecipesController],
})
export class RecipesModule {}
