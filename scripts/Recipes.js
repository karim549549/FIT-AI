import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csvParser from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function seedRecipes() {
  const filePath = path.join(__dirname, '../seeds/cleaned_recipes.csv');

  const recipes = await new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        results.push({
          recipeId: row.recipe_id ? parseInt(row.recipe_id) : null,
          title: row.title,
          fullName: row.full_name || null,
          description: row.description || null,
          imageUrl: row.image_url || null, // ✅ Fixed
          cuisine: row.cuisine || null,
          cookTime: parseFloat(row.cook_time) || 0,
          serving: parseFloat(row.serving) || 1,
          calories: parseFloat(row.calories) || 0,
          carbohydrates: parseFloat(row.carbohydrates) || 0,
          protein: parseFloat(row.protein) || 0,
          fat: parseFloat(row.fat) || 0,
          saturatedFat: parseFloat(row.saturated_fat) || 0,
          cholesterol: parseFloat(row.cholesterol) || 0,
          fiber: parseFloat(row.fiber) || 0,
          potassium: parseFloat(row.potassium) || 0,
          sodium: parseFloat(row.sodium) || 0,
          sugar: parseFloat(row.sugar) || 0,
          dairyFree:
            row.dairy_free === '1' ||
            row.dairy_free === 'TRUE' ||
            row.dairy_free?.toLowerCase() === 'yes',
          glutenFree:
            row.gluten_free === '1' ||
            row.gluten_free === 'TRUE' ||
            row.gluten_free?.toLowerCase() === 'yes',
          mealType: row.meal_type || null,
          ingredients: row.ingredient_names
            ? JSON.parse(row.ingredient_names)
            : [],
          ingredientNames: row.ingredient_names
            ? JSON.parse(row.ingredient_names)
            : [],
          instructions: row.instructions || null,
          dietType: row.diet_type || null,
        });
      })
      .on('end', () => resolve(results))
      .on('error', reject);
  });

  console.log(`Inserting ${recipes.length} recipes...`);

  for (const recipe of recipes) {
    await prisma.recipe.create({ data: recipe });
  }

  console.log('Seeding complete! ✅');
}

seedRecipes()
  .catch((error) => {
    console.error('Error seeding data:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
