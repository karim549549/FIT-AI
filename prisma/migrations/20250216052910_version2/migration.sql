-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "fullName" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "course" TEXT,
    "cuisine" TEXT,
    "prepTime" DOUBLE PRECISION,
    "cookTime" DOUBLE PRECISION,
    "serving" DOUBLE PRECISION,
    "ingredientCount" DOUBLE PRECISION,
    "ingredients" TEXT,
    "instructions" TEXT,
    "notes" TEXT,
    "calories" DOUBLE PRECISION,
    "carbohydrates" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "saturatedFat" DOUBLE PRECISION,
    "monounsaturatedFat" DOUBLE PRECISION,
    "cholesterol" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "potassium" DOUBLE PRECISION,
    "sodium" DOUBLE PRECISION,
    "sugar" DOUBLE PRECISION,
    "dairyFree" BOOLEAN NOT NULL DEFAULT false,
    "glutenFree" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RecipeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RecipeTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCategoryOnRecipe" (
    "recipeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "RecipeCategoryOnRecipe_pkey" PRIMARY KEY ("recipeId","categoryId")
);

-- CreateTable
CREATE TABLE "RecipeTagOnRecipe" (
    "recipeId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "RecipeTagOnRecipe_pkey" PRIMARY KEY ("recipeId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_recipeId_key" ON "Recipe"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeCategory_name_key" ON "RecipeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeTag_name_key" ON "RecipeTag"("name");

-- AddForeignKey
ALTER TABLE "RecipeCategoryOnRecipe" ADD CONSTRAINT "RecipeCategoryOnRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCategoryOnRecipe" ADD CONSTRAINT "RecipeCategoryOnRecipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "RecipeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeTagOnRecipe" ADD CONSTRAINT "RecipeTagOnRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeTagOnRecipe" ADD CONSTRAINT "RecipeTagOnRecipe_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "RecipeTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
