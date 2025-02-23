/*
  Warnings:

  - You are about to drop the column `steps` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "steps",
ADD COLUMN     "dietType" TEXT,
ADD COLUMN     "ingredientNames" JSONB,
ADD COLUMN     "instructions" JSONB;
