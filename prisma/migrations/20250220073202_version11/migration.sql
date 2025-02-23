/*
  Warnings:

  - You are about to drop the column `bmi` on the `ProgressLog` table. All the data in the column will be lost.
  - The `steps` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ingredients` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProgressLog" DROP COLUMN "bmi",
ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "height" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "bodyFat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "muscleMass" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "water" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "boneMass" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "visceralFat" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "steps",
ADD COLUMN     "steps" JSONB,
DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" JSONB;
