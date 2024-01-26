import { RecipeIngredient } from './data';
import { Database } from './database';

// Database types
export type Ingredient = Database['public']['Tables']['ingredient']['Row'];
export type Recipe = Database['public']['Tables']['recipe']['Row'];
export type RecipeIngredientJoined = Database['public']['Views']['recipe_ingredient_joined']['Row'];

// DTO (Data Transfer Object) types
export interface IngredientDto {
  id: string;
  name: string;
  category: string | null;
  costPer: number | null;
  numberOf: number | null;
  measurementUnit: string | null;
}
export interface RecipeIngredientDto extends IngredientDto {
  recipeNumberOf: number | null;
  recipeMeasurementUnit: string | null;
  recipeId: string | null;
  derivedCost: number | null;
}
export interface RecipeDto {
  id: string;
  name: string;
  method: string | null;
  servings: number | null;
  recipeIngredients: RecipeIngredientDto[] | null;
  costPerServe: number | null;
  costAccuracy: number | null;
}

// utility types
export interface CostPerServeAccumulator {
  total: number;
  costedIngredientsCount: number;
}
export interface RecipeCostPerServe {
  costPerServe: number | null;
  costAccuracy: number | null;
}