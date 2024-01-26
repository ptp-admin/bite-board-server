import { PostgrestError } from '@supabase/supabase-js';
import { DbRecipeIngredientDetailed } from '../types/data';
import { Recipe, RecipeDto, RecipeIngredientDto } from '../types/types';
import { costPerServe, deriveCost } from './cost';
import { supabase } from './database';
import { logAndReturn } from './error';
const db = require('../utils/database');

export const getRecipes = async (): Promise<
  RecipeDto[] | PostgrestError
> => {
  const { data: recipes, error } = await supabase.from('recipe').select('*');
  if (error) return logAndReturn(error);

  const recipesWithIngredients = await Promise.all(
    recipes.map(async (recipe: Recipe): Promise<RecipeDto> => {
      return getRecipeIngredients(recipe);
    })
  );

  return recipesWithIngredients;
};

export const getRecipeById = async (
  id: string
): Promise<RecipeDto> => {
  const { data: recipe, error } = await supabase
    .from('recipe')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return logAndReturn(error);

  const recipeWithIngredients = await getRecipeIngredients(recipe);
  console.log('recipeWithIngredients', recipeWithIngredients);

  return recipeWithIngredients;
};

export async function getRecipeIngredients(recipe: Recipe): Promise<RecipeDto> {
  const { id, ...rest } = recipe;
  const { data: recipeIngredientsJoined, error } = await supabase
    .from('recipe_ingredient_joined')
    .select('*')
    .eq('recipeId', id);
  if (error) return logAndReturn(error);

  const recipeIngredients = recipeIngredientsJoined.map(
    (ingredient): RecipeIngredientDto => {
      const { id, name, ...rest } = ingredient;
      return {
        id: id ?? '',
        name: name ?? '',
        ...rest,
        derivedCost: deriveCost(ingredient),
      };
    }
  );

  const recipeCostPerServe = costPerServe(
    recipe.servings || 1,
    recipeIngredients
  );

  return {
    ...recipe,
    recipeIngredients,
    ...recipeCostPerServe,
  };
}

export async function getRecipeIngredientsOld(
  recipeIds: Array<number>
): Promise<DbRecipeIngredientDetailed[]> {
  return await db('recipe_ingredient as ri')
    .select(
      'i.id as ingredient_id',
      'i.name',
      'i.category',
      'i.cost_per',
      'i.number_of',
      'i.measurement_unit',
      'i.category',
      'ri.recipe_id',
      'ri.number_of as recipe_number_of',
      'ri.measurement_unit as recipe_measurement_unit'
    )
    .leftJoin('ingredient as i', 'i.id', 'ri.ingredient_id')
    .whereIn('ri.recipe_id', recipeIds);
}
