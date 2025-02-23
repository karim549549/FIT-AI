import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeFilter } from '../dtos/RecipeFilter.dto';
import { RepositoryResponse } from '@app/common';
import { PaginatedResponse } from '@app/common';
import { Recipe } from '@prisma/client';

@Injectable()
export class RecipeRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 🔹 Get paginated recipe titles with search
  async getRecipeTitles(searchQuery?: {
    title: string;
    page: number;
    size: number;
  }): RepositoryResponse<PaginatedResponse<{ id: number; title: string }>> {
    const { title, page, size } = searchQuery;

    const skip = (page - 1) * size;

    const totalCount = await this.prisma.recipe.count({
      where: {
        title: title ? { contains: title, mode: 'insensitive' } : undefined,
      },
    });

    const recipes = await this.prisma.recipe.findMany({
      where: {
        title: title ? { contains: title, mode: 'insensitive' } : undefined,
      },
      select: { id: true, title: true },
      take: size,
      skip: skip,
      orderBy: { title: 'asc' },
    });

    const totalPages = Math.ceil(totalCount / size);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      data: {
        recipes,
        pagination: {
          totalRecipes: totalCount,
          totalPages,
          currentPage: page,
          pageSize: size,
          hasNextPage,
          hasPrevPage,
        },
      },
    };
  }
  async getRecipeById(id: number): RepositoryResponse<Recipe> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    });
    return { data: recipe };
  }
  async getRecipesByQueryFilter(filter: RecipeFilter): RepositoryResponse<
    PaginatedResponse<{
      id: number;
      title: string;
      description: string;
      imageUrl: string;
      cuisine: string;
      calories: number;
      dairyFree: boolean;
      glutenFree: boolean;
      mealType: string;
    }>
  > {
    const {
      cuisine,
      maxCalories,
      minCalories,
      dairyFree,
      glutenFree,
      mealType,
      page,
      pageSize,
    } = filter;

    const skip = (page - 1) * pageSize;

    const totalCount = await this.prisma.recipe.count({
      where: {
        cuisine: cuisine
          ? { contains: cuisine, mode: 'insensitive' }
          : undefined,
        calories: {
          gte: minCalories || undefined,
          lte: maxCalories || undefined,
        },
        dairyFree: dairyFree !== undefined ? dairyFree : undefined,
        glutenFree: glutenFree !== undefined ? glutenFree : undefined,
        mealType: mealType
          ? { contains: mealType, mode: 'insensitive' }
          : undefined,
      },
    });

    const recipes = await this.prisma.recipe.findMany({
      where: {
        cuisine: cuisine
          ? { contains: cuisine, mode: 'insensitive' }
          : undefined,
        calories: {
          gte: minCalories || undefined,
          lte: maxCalories || undefined,
        },
        dairyFree: dairyFree !== undefined ? dairyFree : undefined,
        glutenFree: glutenFree !== undefined ? glutenFree : undefined,
        mealType: mealType
          ? { contains: mealType, mode: 'insensitive' }
          : undefined,
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        cuisine: true,
        calories: true,
        dairyFree: true,
        glutenFree: true,
        mealType: true,
      },
      take: pageSize,
      skip: skip,
      orderBy: { title: 'asc' },
    });

    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      data: {
        recipes,
        pagination: {
          totalRecipes: totalCount,
          totalPages,
          currentPage: page,
          pageSize,
          hasNextPage,
          hasPrevPage,
        },
      },
    };
  }
}
