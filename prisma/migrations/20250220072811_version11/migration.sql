/*
  Warnings:

  - You are about to drop the column `cookingDifficulty` on the `DietaryPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientCostRange` on the `DietaryPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `nutritionalFocus` on the `DietaryPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `portionSizes` on the `DietaryPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `preferredMealTypes` on the `DietaryPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `preparationPreferences` on the `DietaryPreferences` table. All the data in the column will be lost.
  - The `allergies` column on the `DietaryPreferences` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cuisinePreferences` column on the `DietaryPreferences` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `foodVarietyLevel` column on the `DietaryPreferences` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `type` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientCount` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `prepTime` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `RecipeCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeCategoryOnRecipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeTagOnRecipe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `DietaryPreferences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RecipeCategoryOnRecipe" DROP CONSTRAINT "RecipeCategoryOnRecipe_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeCategoryOnRecipe" DROP CONSTRAINT "RecipeCategoryOnRecipe_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeTagOnRecipe" DROP CONSTRAINT "RecipeTagOnRecipe_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeTagOnRecipe" DROP CONSTRAINT "RecipeTagOnRecipe_tagId_fkey";

-- DropIndex
DROP INDEX "Meal_dietPlanId_type_day_recipeId_key";

-- AlterTable
ALTER TABLE "DietPlan" ADD COLUMN     "results" TEXT[];

-- AlterTable
ALTER TABLE "DietaryPreferences" DROP COLUMN "cookingDifficulty",
DROP COLUMN "ingredientCostRange",
DROP COLUMN "nutritionalFocus",
DROP COLUMN "portionSizes",
DROP COLUMN "preferredMealTypes",
DROP COLUMN "preparationPreferences",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "allergies",
ADD COLUMN     "allergies" JSONB,
DROP COLUMN "cuisinePreferences",
ADD COLUMN     "cuisinePreferences" JSONB,
DROP COLUMN "foodVarietyLevel",
ADD COLUMN     "foodVarietyLevel" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "course",
DROP COLUMN "ingredientCount",
DROP COLUMN "prepTime",
DROP COLUMN "type",
ADD COLUMN     "mealType" TEXT;

-- DropTable
DROP TABLE "RecipeCategory";

-- DropTable
DROP TABLE "RecipeCategoryOnRecipe";

-- DropTable
DROP TABLE "RecipeTag";

-- DropTable
DROP TABLE "RecipeTagOnRecipe";

-- DropEnum
DROP TYPE "MealType";

-- DropEnum
DROP TYPE "RecipeType";
